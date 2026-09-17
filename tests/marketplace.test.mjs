import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
const db = new PGlite();
const customer = "00000000-0000-4000-8000-000000000001",
  worker = "00000000-0000-4000-8000-000000000002",
  other = "00000000-0000-4000-8000-000000000003";
async function as(id) {
  await db.exec("reset role");
  await db.query("select set_config('request.jwt.claim.sub',$1,false)", [
    id || "",
  ]);
  await db.exec(`set role ${id ? "authenticated" : "anon"}`);
}
async function rpc(command, payload = {}) {
  return (
    await db.query("select public.marketplace($1,$2::jsonb) as result", [
      command,
      JSON.stringify(payload),
    ])
  ).rows[0].result;
}
async function select(table) {
  return (await db.query(`select * from public.${table}`)).rows;
}
before(async () => {
  await db.exec(
    `create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key,raw_user_meta_data jsonb default '{}'); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema public,auth to anon,authenticated; grant execute on function auth.uid() to anon,authenticated;`,
  );
  await db.exec(
    await readFile("supabase/migrations/202609160001_marketplace.sql", "utf8"),
  );
  for (const id of [customer, worker, other])
    await db.query(
      "insert into auth.users(id,raw_user_meta_data) values($1,$2)",
      [id, JSON.stringify({ name: "Test member" })],
    );
});
after(() => db.close());
test("marketplace lifecycle and adversarial authorization", async () => {
  await as(customer);
  assert.equal((await select("account_settings")).length, 1);
  await rpc("save_profile", {
    name: "Customer",
    town: "Kandy",
    phone: "private-phone",
  });
  const job = (
    await rpc("create_job", {
      title: "Fix the kitchen tap",
      description: "Replace the leaking kitchen tap.",
      category: "Plumbing",
      town: "Kandy",
      budget: 5000,
      customer_id: other,
      status: "completed",
    })
  ).id;
  assert.equal((await select("jobs"))[0].customer_id, customer);
  assert.equal((await select("jobs"))[0].status, "open");
  await rpc("save_address", { jobId: job, address: "Private house address" });
  await assert.rejects(
    () => rpc("submit_quote", { jobId: job }),
    /cannot quote/,
  );
  for (const uid of [worker, other]) {
    await as(uid);
    await rpc("save_worker", {
      displayName: "Worker",
      town: "Kandy",
      trade: "Plumbing",
    });
  }
  await as(worker);
  assert.equal((await select("job_addresses")).length, 0);
  assert.equal((await select("account_settings"))[0].phone, "");
  const quote = {
    jobId: job,
    amount: 4500,
    includes: "Labour and parts",
    appointmentDate: "2099-01-01",
    appointmentTime: "Morning",
  };
  const q1 = (await rpc("submit_quote", quote)).id;
  await assert.rejects(
    () => rpc("accept_quote", { jobId: job, quoteId: q1 }),
    /Only the owner/,
  );
  await assert.rejects(
    () => rpc("cancel_job", { jobId: job }),
    /cannot be cancelled/,
  );
  await assert.rejects(
    () => rpc("save_address", { jobId: job, address: "Changed" }),
    /Only the customer/,
  );
  await assert.rejects(
    () =>
      db.query("update public.jobs set status='completed' where id=$1", [job]),
    /permission denied/,
  );
  await as(other);
  assert.equal((await select("quotes")).length, 0);
  const q2 = (await rpc("submit_quote", { ...quote, amount: 4000 })).id;
  await assert.rejects(
    () => rpc("withdraw_quote", { jobId: job, quoteId: q1 }),
    /cannot be withdrawn/,
  );
  await as(customer);
  assert.equal((await select("quotes")).length, 2);
  await assert.rejects(
    () => rpc("review", { jobId: job, rating: 5 }),
    /Complete your job/,
  );
  // Deliberately accept the second quote: do not use the first quote in a list.
  await rpc("accept_quote", { jobId: job, quoteId: q2 });
  assert.equal(
    (await select("quotes")).find((q) => q.id === q2).status,
    "accepted",
  );
  assert.equal(
    (await select("quotes")).find((q) => q.id === q1).status,
    "not_selected",
  );
  await assert.rejects(
    () => rpc("accept_quote", { jobId: job, quoteId: q1 }),
    /open job/,
  );
  const conversation = (await select("conversations"))[0].id;
  await rpc("send_message", {
    conversationId: conversation,
    text: "Hello",
    sender_id: worker,
  });
  assert.equal((await select("messages"))[0].sender_id, customer);
  await as(worker);
  assert.equal((await select("job_addresses")).length, 0);
  assert.equal((await select("conversations")).length, 0);
  assert.equal((await select("messages")).length, 0);
  await assert.rejects(
    () =>
      rpc("send_message", { conversationId: conversation, text: "intrusion" }),
    /not available/,
  );
  await assert.rejects(
    () => rpc("open_conversation", { jobId: job, workerId: other }),
    /not available/,
  );
  await as(other);
  assert.equal(
    (await select("job_addresses"))[0].address,
    "Private house address",
  );
  assert.equal((await select("messages")).length, 1);
  await assert.rejects(
    () => rpc("complete_job", { jobId: job }),
    /Only the customer/,
  );
  await as(customer);
  await rpc("complete_job", { jobId: job });
  await rpc("review", {
    jobId: job,
    rating: 5,
    text: "Good work",
    workerId: worker,
  });
  assert.equal((await select("reviews"))[0].worker_id, other);
  await assert.rejects(
    () => rpc("review", { jobId: job, rating: 4 }),
    /unique constraint/,
  );
  await as(null);
  assert.equal((await select("jobs")).length, 1);
  assert.equal((await select("reviews")).length, 1);
  await assert.rejects(() => select("job_addresses"), /permission denied/);
  await assert.rejects(() => select("quotes"), /permission denied/);
  await assert.rejects(() => rpc("create_job", {}), /permission denied/);
});
test("validation, withdrawal, bookmarks and cancellation", async () => {
  await as(customer);
  await assert.rejects(() =>
    rpc("create_job", {
      title: "No",
      description: "Short",
      town: "",
      category: "Plumbing",
    }),
  );
  const job = (
    await rpc("create_job", {
      title: "Paint a bedroom",
      description: "Paint a small bedroom white.",
      category: "Painting",
      town: "Colombo",
      budget: "",
    })
  ).id;
  await as(worker);
  const q = {
    jobId: job,
    amount: 1000,
    includes: "Labour",
    appointmentDate: "2099-01-01",
    appointmentTime: "Morning",
  };
  await assert.rejects(() => rpc("submit_quote", { ...q, amount: -1 }));
  await assert.rejects(
    () => rpc("submit_quote", { ...q, appointmentDate: "2000-01-01" }),
    /date today/,
  );
  const quote = await rpc("submit_quote", q);
  await rpc("withdraw_quote", { jobId: job, quoteId: quote.id });
  assert.equal(
    (await select("quotes")).find((q) => q.id === quote.id).status,
    "withdrawn",
  );
  await rpc("submit_quote", q);
  assert.equal(
    (await select("quotes")).filter((q) => q.job_id === job).length,
    1,
  );
  await rpc("save_job", { jobId: job, saved: true });
  assert.equal((await select("saved_jobs")).length, 1);
  await rpc("question", { jobId: job, text: "Can I visit?" });
  await as(other);
  assert.equal((await select("saved_jobs")).length, 0);
  await as(customer);
  await rpc("accept_quote", { jobId: job, quoteId: quote.id });
  await rpc("cancel_job", { jobId: job });
  assert.equal(
    (await select("jobs")).find((j) => j.id === job).status,
    "cancelled",
  );
  await as(worker);
  await assert.rejects(() => rpc("submit_quote", q), /cannot quote/);
  assert.equal((await select("job_addresses")).length, 0);
});

test('job edits preserve ownership and invitations stay private', async () => {
  const payload={title:'Paint outside wall',description:'Paint the outside wall white.',category:'Painting',town:'Kandy',budget:8000};
  await as(customer);
  const {id:jobId}=await rpc('create_job',payload);
  await rpc('edit_job',{...payload,jobId,title:'Paint the garden wall',customer_id:other,status:'completed'});
  let saved=(await select('jobs')).find(j=>j.id===jobId);
  assert.equal(saved.title,'Paint the garden wall');assert.equal(saved.customer_id,customer);assert.equal(saved.status,'open');
  const {id:conversationId}=await rpc('invite_worker',{jobId,workerId:worker});
  assert.match((await select('messages')).find(m=>m.conversation_id===conversationId).text,/invite you/);
  await as(other);
  assert.equal((await select('messages')).filter(m=>m.conversation_id===conversationId).length,0);
  await assert.rejects(()=>rpc('edit_job',{...payload,jobId}),/Only the owner/);
  await assert.rejects(()=>rpc('invite_worker',{jobId,workerId:worker}),/Only the owner/);
  await as(worker);
  assert.equal((await select('messages')).filter(m=>m.conversation_id===conversationId).length,1);
  await rpc('submit_quote',{jobId,amount:7500,includes:'Paint and labour',appointmentDate:'2099-01-01',appointmentTime:'Morning'});
  await as(customer);
  await assert.rejects(()=>rpc('edit_job',{...payload,jobId}),/already has quotes/);
});
