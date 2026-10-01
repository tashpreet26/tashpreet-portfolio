import type { Metadata } from "next";
import ResearchForm from "@/components/admin/research-form";
import { getProjects, getPublications } from "@/lib/db";

export const metadata: Metadata = { title: "New research — Admin", robots: { index: false } };

export default async function NewResearchPage() {
  const [projects, publications] = await Promise.all([getProjects(), getPublications()]);

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Research — New entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        New research area
      </h1>
      <p className="mt-2 text-sm text-muted">
        Document an open question honestly — from curiosity to method.
      </p>
      <div className="mt-8">
        <ResearchForm research={null} projects={projects} publications={publications} />
      </div>
    </div>
  );
}
