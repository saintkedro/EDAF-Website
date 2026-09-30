import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getAdminSession = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, isAdmin: false };
  const { data } = await supabase.rpc("is_admin");
  return { supabase, user, isAdmin: data === true };
});

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.user || !session.isAdmin) throw new Error("You must be signed in as an administrator.");
  return session.supabase;
}
