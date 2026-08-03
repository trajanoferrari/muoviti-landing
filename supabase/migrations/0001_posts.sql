-- Diario: tabella dei post + RLS.
-- Schema come da briefing 5.3, con due correzioni segnalate nel README.

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

-- La home e /diario ordinano per data discendente.
create index if not exists posts_created_at_idx on posts (created_at desc);

alter table posts enable row level security;

-- Lettura pubblica: solo quello che è pubblicato.
drop policy if exists "public read published" on posts;
create policy "public read published"
  on posts for select
  to anon, authenticated
  using (pubblicato = true);

-- Scrittura e lettura completa: solo autenticato.
--
-- Nota 1: serve anche `with check`, altrimenti INSERT e UPDATE vengono
-- rifiutati (su INSERT Postgres valuta `with check`, non `using`).
--
-- Nota 2: questa policy vale per QUALSIASI utente autenticato. È sicura
-- solo se la registrazione pubblica è disattivata e l'unico utente è
-- quello creato a mano per /admin. Vedi README, sezione Supabase.
-- Irrobustimento consigliato una volta creato l'utente: sostituire
-- `using (true)` / `with check (true)` con `auth.uid() = '<uid-admin>'`.
drop policy if exists "auth full access" on posts;
create policy "auth full access"
  on posts for all
  to authenticated
  using (true)
  with check (true);
