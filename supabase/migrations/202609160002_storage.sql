-- These images are public marketing/listing content, never private documents.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('marketplace-images','marketplace-images',true,2097152,array['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
create policy upload_own_images on storage.objects for insert to authenticated
with check(bucket_id='marketplace-images' and (storage.foldername(name))[1]=auth.uid()::text);
create policy delete_own_images on storage.objects for delete to authenticated
using(bucket_id='marketplace-images' and (storage.foldername(name))[1]=auth.uid()::text);
create policy read_own_image_metadata on storage.objects for select to authenticated
using(bucket_id='marketplace-images' and (storage.foldername(name))[1]=auth.uid()::text);
