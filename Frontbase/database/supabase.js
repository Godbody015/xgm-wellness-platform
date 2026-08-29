/*==================================================
XGM WELLNESS
SUPABASE CLIENT

IMPORTANT: replace SUPABASE_ANON_KEY below with your real
public anon key (Supabase dashboard → Settings → API).
The anon key is safe to expose in frontend code — it only
has the permissions your Row Level Security policies grant
it. Never put your service_role key in frontend code.
==================================================*/

const SUPABASE_URL = "https://xlztjyhzfepqdlsitckq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsenRqeWh6ZmVwcWRsc2l0Y2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMDIwNDAsImV4cCI6MjA5ODc3ODA0MH0._Mt62LAefQEBeH8gxhEfmFhJfOSAawhlfx-HqAU8Ed0";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
