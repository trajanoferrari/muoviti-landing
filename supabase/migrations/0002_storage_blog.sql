-- Bucket `blog`: capas e fotos extra dos posts.
-- Leitura pública dos arquivos, escrita só autenticada.

insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do update set public = true;

-- Nenhuma policy de SELECT para `anon`: o bucket é público, então as URLs
-- dos arquivos já abrem sem policy. Abrir o SELECT para anon só
-- acrescentaria a possibilidade de listar todos os arquivos do bucket.
-- O SELECT serve aos autenticados, para a lista no /admin.
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
