import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions";
import { getSettings } from "@/lib/db";
import { CloseIcon, LogoutIcon } from "@/components/icons";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/research", label: "Research" },
  { href: "/admin/publications", label: "Publications" },
  { href: "/admin/awards", label: "Awards" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await getSession();
  if (!authed) redirect("/admin/login");
  const settings = await getSettings();

  return (
    <div className="flex min-h-screen bg-ivory dark:bg-night">
      {/* Sidebar */}
      <aside className="no-print fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-line bg-paper max-lg:hidden dark:bg-coal">
        <div className="border-b border-line p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent dark:text-ember">
            Archive — Admin
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-ink dark:text-bone">
            {settings.siteTitle}
          </p>
        </div>
        <nav className="flex-1 overflow-y-auto p-3" aria-label="Admin">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:bg-ivory hover:text-accent dark:text-ash dark:hover:bg-night dark:hover:text-ember"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-line p-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:text-accent dark:text-ash dark:hover:text-ember"
          >
            <CloseIcon className="h-3.5 w-3.5" /> View site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:text-accent dark:text-ash dark:hover:text-ember"
            >
              <LogoutIcon className="h-3.5 w-3.5" /> Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="no-print fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-paper px-4 lg:hidden dark:bg-coal">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent dark:text-ember">
          Archive — Admin
        </span>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft dark:text-ash"
          >
            View site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-soft dark:text-ash"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        className="no-print fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-line bg-paper py-2 lg:hidden dark:bg-coal"
        aria-label="Admin mobile"
      >
        {ADMIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-1 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-soft dark:text-ash"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Content */}
      <main className="min-w-0 flex-1 px-5 pb-24 pt-20 sm:px-8 lg:ml-60 lg:pb-12 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
