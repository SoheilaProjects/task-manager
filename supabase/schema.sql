create table public.tasks (
  id uuid not null default gen_random_uuid (),
  title text not null,
  description text null,
  completed boolean not null default false,
  created_at timestamp with time zone not null default now(),
  user_id uuid not null,
  due_date date null,
  scheduled_date date not null default CURRENT_DATE,
  constraint tasks_pkey primary key (id),
  constraint tasks_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;