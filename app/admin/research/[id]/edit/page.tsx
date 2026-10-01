import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResearchForm from "@/components/admin/research-form";
import { getProjects, getPublications, getResearchById } from "@/lib/db";

export const metadata: Metadata = { title: "Edit research — Admin", robots: { index: false } };

export default async function EditResearchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [research, projects, publications] = await Promise.all([
    getResearchById(id),
    getProjects(),
    getPublications(),
  ]);
  if (!research) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Research — Edit entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        {research.title}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Last updated {new Date(research.updatedAt).toLocaleString()}
      </p>
      <div className="mt-8">
        <ResearchForm research={research} projects={projects} publications={publications} />
      </div>
    </div>
  );
}
