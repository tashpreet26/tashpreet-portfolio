import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicationForm from "@/components/admin/publication-form";
import { getProjects, getPublicationById, getResearch } from "@/lib/db";

export const metadata: Metadata = { title: "Edit publication — Admin", robots: { index: false } };

export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [publication, research, projects] = await Promise.all([
    getPublicationById(id),
    getResearch(),
    getProjects(),
  ]);
  if (!publication) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Publications — Edit entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        {publication.title}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Last updated {new Date(publication.updatedAt).toLocaleString()}
      </p>
      <div className="mt-8">
        <PublicationForm publication={publication} research={research} projects={projects} />
      </div>
    </div>
  );
}
