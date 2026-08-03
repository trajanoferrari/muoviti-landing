-- Diário: tabela dos posts + RLS (Row Level Security).
-- Schema conforme o briefing 5.3, com as correções explicadas no README.
-- Os nomes das colunas ficam em italiano, como definido no briefing.

create table if not exists posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  titolo       text not null,
  sottotitolo  text,
  testo        text not null,
  cover_url    text,
  foto_extra   text[] default '{}',
  pubblicato   boolean default false,
  created_at   timestamptz default now()
);

-- A home e /diario ordenam por data decrescente.
create index if not exists posts_created_at_idx on posts (created_at desc);

alter table posts enable row level security;

-- Leitura pública: só o que está publicado.
drop policy if exists "public read published" on posts;
create policy "public read published"
  on posts for select
  to anon, authenticated
  using (pubblicato = true);

-- Leitura e escrita completas: só autenticado.
--
-- Nota 1: precisa também do `with check`, senão INSERT e UPDATE são
-- recusados (no INSERT o Postgres avalia `with check`, não `using`).
--
-- Nota 2: esta policy vale para QUALQUER usuário autenticado. Só é segura
-- se o cadastro público estiver desativado e o único usuário for o criado
-- à mão para o /admin. Ver README, seção Supabase.
-- Reforço recomendado depois de criar o usuário: trocar `using (true)` e
-- `with check (true)` por `auth.uid() = '<uid-do-admin>'`.
drop policy if exists "auth full access" on posts;
create policy "auth full access"
  on posts for all
  to authenticated
  using (true)
  with check (true);
