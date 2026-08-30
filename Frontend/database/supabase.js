/*==================================================
XGM WELLNESS
SUPABASE CLIENT

Uses environment variables for API credentials.
Never commit credentials to version control.
==================================================*/

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
