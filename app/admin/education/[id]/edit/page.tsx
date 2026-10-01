import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EducationForm from "@/components/admin/education-form";
import { getEducationById } from "@/lib/db";

export const metadata: Metadata = { title: "Edit education — Admin", robots: { index: false } };

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const education = await getEducationById(id);
  if (!education) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Education — Edit entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        {education.title}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Last updated {new Date(education.updatedAt).toLocaleString()}
      </p>
      <div className="mt-8">
        <EducationForm education={education} />
      </div>
    </div>
  );
}
