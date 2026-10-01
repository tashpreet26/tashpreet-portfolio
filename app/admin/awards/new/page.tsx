import type { Metadata } from "next";
import AwardForm from "@/components/admin/award-form";

export const metadata: Metadata = { title: "New award — Admin", robots: { index: false } };

export default function NewAwardPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Awards — New entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        New award
      </h1>
      <p className="mt-2 text-sm text-muted">
        Only add awards that were actually received — never fabricate entries.
      </p>
      <div className="mt-8">
        <AwardForm award={null} />
      </div>
    </div>
  );
}
