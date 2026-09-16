-- Public content is separated from private contact and address data.
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 name text not null check (length(trim(name)) between 1 and 100),
 town text not null default '', avatar text not null default '',
 created_at timestamptz not null default now()
);
create table public.account_settings (
 id uuid primary key references public.profiles(id) on delete cascade,
 phone text not null default '', language text not null default 'English'
);
create table public.workers (
 id uuid primary key references public.profiles(id) on delete cascade,
 trade text not null check(length(trim(trade)) between 1 and 100), about text not null default '' check(length(about)<=3000),
 experience text not null default '', service_areas text[] not null default '{}',
 languages text[] not null default '{}', photos text[] not null default '{}'
 check(cardinality(photos)<=3)
);
create table public.jobs (
 id uuid primary key default gen_random_uuid(),
 customer_id uuid not null references public.profiles(id),
 title text not null check(length(trim(title)) between 3 and 150),
 description text not null check(length(trim(description)) between 10 and 5000),
 category text not null check(length(trim(category)) between 1 and 100), town text not null check(length(trim(town)) between 1 and 100),
 budget numeric(12,2) check(budget>0), timing text not null default 'Flexible',
 photos text[] not null default '{}' check(cardinality(photos)<=3),
 status text not null default 'open' check(status in ('open','in_progress','completed','cancelled')),
 created_at timestamptz not null default now(), completed_at timestamptz
);
create table public.quotes (
 id uuid primary key default gen_random_uuid(), job_id uuid not null references public.jobs(id),
 worker_id uuid not null references public.workers(id),
 amount numeric(12,2) not null check(amount>0),
 includes text not null check(length(trim(includes)) between 3 and 3000),
 message text not null default '' check(length(message)<=3000),
 appointment_date date not null, appointment_time text not null check(length(trim(appointment_time)) between 1 and 100),
 status text not null default 'pending' check(status in ('pending','accepted','not_selected','withdrawn')),
 created_at timestamptz not null default now(), unique(job_id,worker_id)
);
create unique index one_accepted_quote_per_job on public.quotes(job_id) where status='accepted';
create table public.job_addresses (
 job_id uuid primary key references public.jobs(id), address text not null check(length(address)<=500)
);
create table public.reviews (
 id uuid primary key default gen_random_uuid(), job_id uuid not null unique references public.jobs(id),
 customer_id uuid not null references public.profiles(id), worker_id uuid not null references public.workers(id),
 rating integer not null check(rating between 1 and 5), text text not null default '' check(length(text)<=3000),
 created_at timestamptz not null default now()
);
create table public.questions (
 id uuid primary key default gen_random_uuid(), job_id uuid not null references public.jobs(id),
 author_id uuid not null references public.profiles(id), text text not null check(length(trim(text)) between 1 and 1000),
 created_at timestamptz not null default now()
);
create table public.saved_jobs (
 user_id uuid references public.profiles(id) on delete cascade, job_id uuid references public.jobs(id),
 primary key(user_id,job_id)
);
create table public.conversations (
 id uuid primary key default gen_random_uuid(), job_id uuid not null references public.jobs(id),
 customer_id uuid not null references public.profiles(id), worker_id uuid not null references public.workers(id),
 created_at timestamptz not null default now(), unique(job_id,worker_id), check(customer_id<>worker_id)
);
create table public.messages (
 id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.conversations(id),
 sender_id uuid not null references public.profiles(id), text text not null check(length(trim(text)) between 1 and 3000),
 created_at timestamptz not null default now()
);
create index jobs_customer on public.jobs(customer_id);
create index jobs_feed on public.jobs(status,created_at desc);
create index quotes_worker on public.quotes(worker_id);
create index messages_conversation on public.messages(conversation_id,created_at);
create index conversations_customer on public.conversations(customer_id);
create index conversations_worker on public.conversations(worker_id);
create index questions_job on public.questions(job_id);
create index reviews_worker on public.reviews(worker_id);

-- No client has direct write privileges. Mutations below whitelist every field.
do $$ declare t text; begin
 foreach t in array array['profiles','account_settings','workers','jobs','quotes','job_addresses','reviews','questions','saved_jobs','conversations','messages'] loop
 execute format('alter table public.%I enable row level security', t);
 execute format('revoke all on public.%I from public, anon, authenticated', t);
 execute format('grant select on public.%I to authenticated', t);
 end loop;
end $$;
grant select on public.profiles,public.workers,public.jobs,public.reviews,public.questions to anon;
create policy public_profiles on public.profiles for select using(true);
create policy public_workers on public.workers for select using(true);
create policy public_jobs on public.jobs for select using(true);
create policy public_reviews on public.reviews for select using(true);
create policy public_questions on public.questions for select using(true);
create policy own_account on public.account_settings for select to authenticated using(id=auth.uid());
create policy own_saved on public.saved_jobs for select to authenticated using(user_id=auth.uid());
create policy relevant_quotes on public.quotes for select to authenticated using(
 worker_id=auth.uid() or exists(select 1 from public.jobs j where j.id=job_id and j.customer_id=auth.uid())
);
create policy private_address on public.job_addresses for select to authenticated using(
 exists(select 1 from public.jobs j where j.id=job_id and j.customer_id=auth.uid()) or
 exists(select 1 from public.quotes q where q.job_id=job_addresses.job_id and q.worker_id=auth.uid() and q.status='accepted')
);
create policy participants on public.conversations for select to authenticated using(auth.uid() in (customer_id,worker_id));
create policy participant_messages on public.messages for select to authenticated using(
 exists(select 1 from public.conversations c where c.id=conversation_id and auth.uid() in(c.customer_id,c.worker_id))
);

create function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,name) values(new.id,left(coalesce(nullif(trim(new.raw_user_meta_data->>'name'),''),'New member'),100));
 insert into public.account_settings(id) values(new.id);
 return new;
end $$;
revoke all on function public.handle_new_user() from public,anon,authenticated;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
-- Existing users in a project also get a profile.
insert into public.profiles(id,name) select id,left(coalesce(nullif(trim(raw_user_meta_data->>'name'),''),'New member'),100) from auth.users on conflict do nothing;
insert into public.account_settings(id) select id from public.profiles on conflict do nothing;

create function public.marketplace(command text, payload jsonb default '{}') returns jsonb
language plpgsql security definer set search_path='' as $$
declare
 uid uuid := auth.uid(); jid uuid; qid uuid; wid uuid; cid uuid; result_id uuid;
 j public.jobs%rowtype; q public.quotes%rowtype;
begin
 if uid is null then raise exception 'Sign in to continue.'; end if;
 if command='save_profile' then
 update public.profiles set name=trim(payload->>'name'),town=coalesce(payload->>'town',''),avatar=coalesce(payload->>'avatar',avatar) where id=uid;
 update public.account_settings set phone=coalesce(payload->>'phone',phone),language=coalesce(payload->>'language',language) where id=uid;
 return jsonb_build_object('id',uid);
 elsif command='save_worker' then
 update public.profiles set name=trim(payload->>'displayName'),town=payload->>'town',avatar=coalesce(payload->>'avatar',avatar) where id=uid;
 update public.account_settings set phone=coalesce(payload->>'phone','') where id=uid;
 insert into public.workers(id,trade,about,experience,service_areas,languages,photos)
 values(uid,payload->>'trade',coalesce(payload->>'about',''),coalesce(payload->>'experience',''),
 array(select jsonb_array_elements_text(coalesce(payload->'serviceAreas','[]'))),
 array(select jsonb_array_elements_text(coalesce(payload->'languages','[]'))),
 array(select jsonb_array_elements_text(coalesce(payload->'workPhotos','[]'))))
 on conflict(id) do update set trade=excluded.trade,about=excluded.about,experience=excluded.experience,
 service_areas=excluded.service_areas,languages=excluded.languages,photos=excluded.photos;
 return jsonb_build_object('id',uid);
 elsif command='create_job' then
 insert into public.jobs(customer_id,title,description,category,town,budget,timing,photos)
 values(uid,trim(payload->>'title'),trim(payload->>'description'),payload->>'category',payload->>'town',
 nullif(nullif(payload->>'budget','')::numeric,0),coalesce(payload->>'timing','Flexible'),
 array(select jsonb_array_elements_text(coalesce(payload->'photos','[]')))) returning id into jid;
 return jsonb_build_object('id',jid);
 elsif command='send_message' then
 cid:=(payload->>'conversationId')::uuid;
 if not exists(select 1 from public.conversations where id=cid and uid in(customer_id,worker_id)) then raise exception 'Conversation not available.'; end if;
 insert into public.messages(conversation_id,sender_id,text) values(cid,uid,trim(payload->>'text')) returning id into result_id;
 return jsonb_build_object('id',result_id);
 end if;
 jid:=(payload->>'jobId')::uuid;
 -- Serialize all lifecycle transitions, quote submissions and withdrawals per job.
 select * into j from public.jobs where id=jid for update;
 if not found then raise exception 'Job not found.'; end if;
if command='edit_job' then
 if j.customer_id<>uid or j.status<>'open' then raise exception 'Only the owner can edit an open job.'; end if;
 if exists(select 1 from public.quotes where job_id=jid and status='pending') then raise exception 'This job already has quotes. Cancel it and post a corrected job instead.'; end if;
 update public.jobs set title=trim(payload->>'title'),description=trim(payload->>'description'),category=payload->>'category',town=payload->>'town',
 budget=nullif(nullif(payload->>'budget','')::numeric,0),timing=coalesce(payload->>'timing','Flexible'),
 photos=array(select jsonb_array_elements_text(coalesce(payload->'photos','[]'))) where id=jid;
 elsif command='submit_quote' then
 if j.status<>'open' or j.customer_id=uid then raise exception 'You cannot quote on this job.'; end if;
 if not exists(select 1 from public.workers where id=uid) then raise exception 'Create your worker profile first.'; end if;
 if (payload->>'appointmentDate')::date < current_date then raise exception 'Choose a date today or later.'; end if;
 insert into public.quotes(job_id,worker_id,amount,includes,message,appointment_date,appointment_time)
 values(jid,uid,(payload->>'amount')::numeric,payload->>'includes',coalesce(payload->>'message',''),(payload->>'appointmentDate')::date,payload->>'appointmentTime')
 on conflict(job_id,worker_id) do update set amount=excluded.amount,includes=excluded.includes,message=excluded.message,
 appointment_date=excluded.appointment_date,appointment_time=excluded.appointment_time,status='pending' returning id into qid;
 return jsonb_build_object('id',qid);
 elsif command='accept_quote' then
 if j.customer_id<>uid or j.status<>'open' then raise exception 'Only the owner can hire for an open job.'; end if;
 qid:=(payload->>'quoteId')::uuid;
 select * into q from public.quotes where id=qid and job_id=jid and status='pending';
 if not found then raise exception 'Quote is no longer available.'; end if;
 update public.quotes set status=case when id=qid then 'accepted' else 'not_selected' end where job_id=jid and status='pending';
 update public.jobs set status='in_progress' where id=jid;
 insert into public.conversations(job_id,customer_id,worker_id) values(jid,uid,q.worker_id) on conflict do nothing;
 elsif command='withdraw_quote' then
 if j.status<>'open' then raise exception 'This job is no longer open.'; end if;
 update public.quotes set status='withdrawn' where id=(payload->>'quoteId')::uuid and job_id=jid and worker_id=uid and status='pending';
 if not found then raise exception 'Quote cannot be withdrawn.'; end if;
 elsif command='complete_job' then
 if j.customer_id<>uid or j.status<>'in_progress' then raise exception 'Only the customer can complete an in-progress job.'; end if;
 update public.jobs set status='completed',completed_at=now() where id=jid;
 elsif command='cancel_job' then
 if j.customer_id<>uid or j.status not in('open','in_progress') then raise exception 'Job cannot be cancelled.'; end if;
 update public.jobs set status='cancelled' where id=jid;
 update public.quotes set status='not_selected' where job_id=jid and status in('pending','accepted');
 elsif command='review' then
 if j.customer_id<>uid or j.status<>'completed' then raise exception 'Complete your job before reviewing.'; end if;
 select worker_id into wid from public.quotes where job_id=jid and status='accepted';
 insert into public.reviews(job_id,customer_id,worker_id,rating,text) values(jid,uid,wid,(payload->>'rating')::integer,coalesce(payload->>'text',''));
 elsif command='question' then
 if j.status<>'open' then raise exception 'Questions are closed for this job.'; end if;
 insert into public.questions(job_id,author_id,text) values(jid,uid,trim(payload->>'text'));
 elsif command='save_job' then
 if coalesce((payload->>'saved')::boolean,false) then insert into public.saved_jobs values(uid,jid) on conflict do nothing;
 else delete from public.saved_jobs where user_id=uid and job_id=jid; end if;
 elsif command='save_address' then
 if j.customer_id<>uid then raise exception 'Only the customer can set the address.'; end if;
 insert into public.job_addresses values(jid,payload->>'address') on conflict(job_id) do update set address=excluded.address;
 elsif command in ('open_conversation','invite_worker') then
 wid:=(payload->>'workerId')::uuid;
 if command='invite_worker' and (uid<>j.customer_id or j.status<>'open') then raise exception 'Only the owner can invite workers to an open job.'; end if;
 if wid=j.customer_id or not exists(select 1 from public.workers where id=wid) then raise exception 'Choose a worker.'; end if;
 if uid<>j.customer_id and uid<>wid then raise exception 'Conversation not available.'; end if;
 if uid=wid and not exists(select 1 from public.quotes where job_id=jid and worker_id=uid) then raise exception 'Send a quote before messaging.'; end if;
 insert into public.conversations(job_id,customer_id,worker_id) values(jid,j.customer_id,wid)
 on conflict(job_id,worker_id) do update set job_id=excluded.job_id returning id into cid;
 if command='invite_worker' then insert into public.messages(conversation_id,sender_id,text) values(cid,uid,'I would like to invite you to send a quote for: '||j.title); end if;
 return jsonb_build_object('id',cid);
 else raise exception 'Unknown action.';
 end if;
 return jsonb_build_object('id',jid);
end $$;
revoke all on function public.marketplace(text,jsonb) from public,anon;
grant execute on function public.marketplace(text,jsonb) to authenticated;
