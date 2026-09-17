import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
test("image storage policies isolate owner folders", async () => {
  const db = new PGlite();
  try {
    await db.exec(`create role authenticated;create schema auth;create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
 create table storage.objects(id uuid default gen_random_uuid(),bucket_id text,name text);
 create function storage.foldername(name text) returns text[] language sql immutable as $$select string_to_array(name,'/')$$;
 alter table storage.objects enable row level security;grant usage on schema storage,auth to authenticated;grant all on storage.objects to authenticated;`);
    await db.exec(
      await readFile("supabase/migrations/202609160002_storage.sql", "utf8"),
    );
    const bucket = (await db.query("select * from storage.buckets")).rows[0];
    assert.equal(Number(bucket.file_size_limit), 2097152);
    assert.deepEqual(bucket.allowed_mime_types, [
      "image/jpeg",
      "image/png",
      "image/webp",
    ]);
    const owner = "00000000-0000-4000-8000-000000000001",
      other = "00000000-0000-4000-8000-000000000002";
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [
      owner,
    ]);
    await db.exec("set role authenticated");
    await db.query(
      "insert into storage.objects(bucket_id,name) values('marketplace-images',$1)",
      [`${owner}/test.jpg`],
    );
    await assert.rejects(
      () =>
        db.query(
          "insert into storage.objects(bucket_id,name) values('marketplace-images',$1)",
          [`${other}/test.jpg`],
        ),
      /row-level security/,
    );
    await assert.rejects(
      () =>
        db.query(
          "insert into storage.objects(bucket_id,name) values('other-bucket',$1)",
          [`${owner}/test.jpg`],
        ),
      /row-level security/,
    );
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [
      other,
    ]);
    assert.equal(
      (await db.query("select * from storage.objects")).rows.length,
      0,
    );
    await db.exec("delete from storage.objects");
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [
      owner,
    ]);
    assert.equal(
      (await db.query("select * from storage.objects")).rows.length,
      1,
    );
    await db.exec("delete from storage.objects");
    assert.equal(
      (await db.query("select * from storage.objects")).rows.length,
      0,
    );
  } finally {
    await db.close();
  }
});
