import Link from "next/link";
import { getAwards, getEducation, getMedia, getProjects, getPublications, getResearch } from "@/lib/db";
import { PlusIcon } from "@/components/icons";

export default async function AdminDashboard() {
  const [projects, research, publications, awards, education, media] = await Promise.all([
    getProjects(),
    getResearch(),
    getPublications(),
    getAwards(),
    getEducation(),
    getMedia(),
  ]);

  const stats = [
    { label: "Projects", count: projects.length, href: "/admin/projects" },
    { label: "Research", count: research.length, href: "/admin/research" },
    { label: "Publications", count: publications.length, href: "/admin/publications" },
    { label: "Awards", count: awards.length, href: "/admin/awards" },
    { label: "Education", count: education.length, href: "/admin/education" },
    { label: "Media", count: media.length, href: "/admin/media" },
  ];

  const drafts = [
    ...projects.filter((p) => p.status === "draft").map((p) => ({ type: "Project", title: p.title, href: `/admin/projects/${p.id}/edit` })),
    ...research.filter((r) => r.status === "draft").map((r) => ({ type: "Research", title: r.title, href: `/admin/research/${r.id}/edit` })),
    ...publications.filter((p) => p.status === "draft").map((p) => ({ type: "Publication", title: p.title, href: `/admin/publications/${p.id}/edit` })),
    ...awards.filter((a) => a.status === "draft").map((a) => ({ type: "Award", title: a.title, href: `/admin/awards/${a.id}/edit` })),
  ];

  const recent = [
    ...projects.map((p) => ({ type: "Project", title: p.title, updatedAt: p.updatedAt, href: `/admin/projects/${p.id}/edit` })),
    ...research.map((r) => ({ type: "Research", title: r.title, updatedAt: r.updatedAt, href: `/admin/research/${r.id}/edit` })),
    ...publications.map((p) => ({ type: "Publication", title: p.title, updatedAt: p.updatedAt, href: `/admin/publications/${p.id}/edit` })),
    ...awards.map((a) => ({ type: "Award", title: a.title, updatedAt: a.updatedAt, href: `/admin/awards/${a.id}/edit` })),
  ]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Overview
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        Good day, Archivist.
      </h1>
      <p className="mt-2 text-sm text-muted">
        Manage the content of the archive — everything you add here flows into the public site.
      </p>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-paper p-6 transition-colors hover:bg-ivory dark:bg-coal dark:hover:bg-night"
          >
            <p className="font-display text-4xl font-light text-ink dark:text-bone">
              {String(stat.count).padStart(2, "0")}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted group-hover:text-accent dark:group-hover:text-ember">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.35em] text-soft dark:text-ash">
          Quick actions
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { label: "New project", href: "/admin/projects/new" },
            { label: "New research", href: "/admin/research/new" },
            { label: "New publication", href: "/admin/publications/new" },
            { label: "New award", href: "/admin/awards/new" },
            { label: "Upload media", href: "/admin/media" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="inline-flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:border-accent hover:text-accent dark:text-ash dark:hover:border-ember dark:hover:text-ember"
            >
              <PlusIcon className="h-3.5 w-3.5" /> {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Drafts */}
      {drafts.length > 0 && (
        <div className="mt-10">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.35em] text-soft dark:text-ash">
            Drafts in progress — {drafts.length}
          </h2>
          <ul className="mt-4 divide-y divide-line border border-line bg-paper dark:bg-coal">
            {drafts.map((d) => (
              <li key={`${d.type}-${d.title}`}>
                <Link href={d.href} className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-ivory dark:hover:bg-night">
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ink dark:text-bone">{d.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{d.type}</span>
                  </span>
                  <span className="shrink-0 border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    Draft
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent activity */}
      <div className="mt-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.35em] text-soft dark:text-ash">
          Recently edited
        </h2>
        {recent.length === 0 ? (
          <p className="mt-4 border border-dashed border-line p-8 text-center text-sm text-muted">
            Nothing yet — the archive awaits its first entry.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line bg-paper dark:bg-coal">
            {recent.map((r) => (
              <li key={`${r.type}-${r.title}`}>
                <Link href={r.href} className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-ivory dark:hover:bg-night">
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ink dark:text-bone">{r.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{r.type}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-muted">
                    {new Date(r.updatedAt).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
