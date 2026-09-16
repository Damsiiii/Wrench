import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABASE_URL;
const key =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = url && key ? createClient(url, key) : null;
export function requireBackend() {
  if (!supabase)
    throw new Error(
      "Wrench is not connected yet. Configure the Supabase project to continue.",
    );
  return supabase;
}
