import "server-only";
import { createClient } from "@supabase/supabase-js";

export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;

  // Prefer server-only secret keys when available (bypasses RLS).
  // Supabase may label these as "secret key" or "service_role key" in the dashboard.
  const serverSecretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Public key (formerly "anon key", now often shown as "publishable key")
  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const keyToUse = serverSecretKey ?? publicKey;

  if (!url || !keyToUse) return null;

  // If someone set placeholder env vars (e.g. "YOUR_URL") we should fail gracefully
  // so the app can still build using fallback data.
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
  } catch {
    return null;
  }

  return createClient(url, keyToUse, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

