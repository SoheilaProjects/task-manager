-- POLICY 1
alter policy "Users can delete their tasks"
on "public"."tasks"
to authenticated
using (
  (auth.uid() = user_id)
);

-- POLICY 2
alter policy "Users can insert their tasks"
on "public"."tasks"
to authenticated
with check (
  (auth.uid() = user_id)
);

-- POLICY 3
alter policy "Users can update their tasks"
on "public"."tasks"
to authenticated
using (
  (auth.uid() = user_id)
);

-- POLICY 4
alter policy "Users can view their tasks"
on "public"."tasks"
to authenticated
using (
  (auth.uid() = user_id)
);