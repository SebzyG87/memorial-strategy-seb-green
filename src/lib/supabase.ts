import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hhqsbizftwtgfuivuyxm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhocXNiaXpmdHd0Z2Z1aXZ1eXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2OTM5NjgsImV4cCI6MjA4NzI2OTk2OH0.GvftmIcdIpBEZqJvxsl8aG0N3rMrckgmS76qZHgbZII";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
