-- Bucket `blog`: cover e foto extra dei post.
-- Lettura pubblica degli oggetti, scrittura solo autenticata.

insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do update set public = true;

-- Nessuna policy di SELECT per `anon`: il bucket è public, quindi gli URL
-- degli oggetti si aprono già senza policy. Aprire il SELECT ad anon
-- aggiungerebbe solo la possibilità di elencare tutti i file del bucket.
-- Il SELECT serve agli autenticati, per la lista in /admin.
drop policy if exists "blog public read" on storage.objects;

drop policy if exists "blog auth list" on storage.objects;
create policy "blog auth list"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'blog');

drop policy if exists "blog auth write" on storage.objects;
create policy "blog auth write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog');

drop policy if exists "blog auth update" on storage.objects;
create policy "blog auth update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog')
  with check (bucket_id = 'blog');

drop policy if exists "blog auth delete" on storage.objects;
create policy "blog auth delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog');
