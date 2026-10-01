import type { Metadata } from "next";
import ProjectForm from "@/components/admin/project-form";
import { getMedia, getPublications } from "@/lib/db";

export const metadata: Metadata = { title: "New project — Admin", robots: { index: false } };

export default async function NewProjectPage() {
  const [publications, media] = await Promise.all([getPublications(), getMedia()]);

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Projects — New entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        New project
      </h1>
      <p className="mt-2 text-sm text-muted">
        Drafts are never visible on the public site until you publish them.
      </p>
      <div className="mt-8">
        <ProjectForm project={null} publications={publications} media={media} />
      </div>
    </div>
  );
}
