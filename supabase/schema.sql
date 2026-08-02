-- ============================================================
-- Career Legend — schéma Supabase (sauvegarde cloud des carrières)
-- À exécuter dans Supabase : SQL Editor > New query > coller > Run
-- Idempotent : peut être relancé sans erreur si déjà exécuté.
-- ============================================================

create table if not exists carrieres (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  nom_joueur text not null,
  state jsonb not null,
  saison integer not null default 1,
  en_carriere boolean not null default true,
  score integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_carrieres_device on carrieres (device_id);

create unique index if not exists idx_carrieres_device_active
  on carrieres (device_id)
  where en_carriere = true;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_carrieres_updated_at on carrieres;
create trigger trg_carrieres_updated_at
  before update on carrieres
  for each row execute function set_updated_at();

alter table carrieres enable row level security;

drop policy if exists "Lecture ouverte" on carrieres;
drop policy if exists "Insertion ouverte" on carrieres;
drop policy if exists "Mise à jour ouverte" on carrieres;
drop policy if exists "Suppression ouverte" on carrieres;

create policy "Lecture ouverte" on carrieres for select using (true);
create policy "Insertion ouverte" on carrieres for insert with check (true);
create policy "Mise à jour ouverte" on carrieres for update using (true);
create policy "Suppression ouverte" on carrieres for delete using (true);
