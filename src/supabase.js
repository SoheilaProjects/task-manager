import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rzzhucpgtiuaxziionso.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6emh1Y3BndGl1YXh6aWlvbnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NTUzOTksImV4cCI6MjA5NjMzMTM5OX0.iASVNL5L0tK50fLvF7r-NFzVjb0g3qd4ImNakF9OzG8";

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      storage: sessionStorage
    }
  }
);
