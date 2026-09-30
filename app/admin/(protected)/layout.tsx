import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import { secondaryButton } from "@/components/admin/styles";
import { getAdminSession } from "@/lib/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const { user, isAdmin } = await getAdminSession();
  if (!user) redirect("/admin/login");

  const signOutButton = (
    <form action={signOut}>
      <button type="submit" className="min-h-11 px-2 text-sm font-semibold text-navy-800 hover:text-navy-600">
        Sign out
      </button>
    </form>
  );

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center sm:py-24">
        <h1 className="font-semibold tracking-tight text-2xl text-navy-900">No admin access</h1>
        <p className="mt-3 text-muted">
          You are signed in as {user.email}, but this account has not been made an administrator.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className={secondaryButton}>
            Back to the site
          </Link>
          {signOutButton}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2">
          <nav aria-label="Admin" className="flex flex-wrap items-center gap-x-5 text-sm font-semibold">
            <Link href="/admin" className="py-3 text-navy-900 hover:text-navy-600">
              Events
            </Link>
            <Link href="/admin/gallery" className="py-3 text-navy-900 hover:text-navy-600">
              General gallery
            </Link>
          </nav>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="hidden sm:inline">{user.email}</span>
            {signOutButton}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">{children}</div>
    </>
  );
}
