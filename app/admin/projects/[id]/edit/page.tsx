import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/project-form";
import { getMedia, getProjectById, getPublications } from "@/lib/db";

export const metadata: Metadata = { title: "Edit project — Admin", robots: { index: false } };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, publications, media] = await Promise.all([
    getProjectById(id),
    getPublications(),
    getMedia(),
  ]);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Projects — Edit entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        {project.title}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Last updated {new Date(project.updatedAt).toLocaleString()}
      </p>
      <div className="mt-8">
        <ProjectForm project={project} publications={publications} media={media} />
      </div>
    </div>
  );
}
