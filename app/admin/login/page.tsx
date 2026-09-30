import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Sign in" };

export default async function AdminLoginPage() {
  if (isSupabaseConfigured) {
    const { user } = await getAdminSession();
    if (user) redirect("/admin");
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16 sm:py-24">
      <h1 className="font-semibold tracking-tight text-3xl text-navy-900">Admin sign in</h1>
      <p className="mt-3 text-muted">Sign in to manage events and the gallery.</p>
      {isSupabaseConfigured ? (
        <LoginForm />
      ) : (
        <p className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          Supabase is not configured. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>, then restart the site.
        </p>
      )}
    </div>
  );
}
