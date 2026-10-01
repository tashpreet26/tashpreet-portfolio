import type { Metadata } from "next";
import EducationForm from "@/components/admin/education-form";

export const metadata: Metadata = { title: "New education — Admin", robots: { index: false } };

export default function NewEducationPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Education — New entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        New education entry
      </h1>
      <p className="mt-2 text-sm text-muted">
        Document degrees and institutions as they are earned.
      </p>
      <div className="mt-8">
        <EducationForm education={null} />
      </div>
    </div>
  );
}
