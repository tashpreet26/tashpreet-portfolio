"use client";

import Link from "next/link";
import { ArrowLeft } from "@/components/icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent dark:text-ember">
        An error occurred
      </p>
      <h1 className="mt-8 font-display text-4xl font-light tracking-tight text-ink dark:text-bone md:text-5xl">
        The archive hit a snag.
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-soft dark:text-ash">
        Something went wrong while rendering this page. You can try again or return to the
        beginning of the archive.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="border border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink transition-colors hover:bg-ink hover:text-ivory dark:border-bone dark:text-bone dark:hover:bg-bone dark:hover:text-night"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-soft hover:text-ink dark:text-ash dark:hover:text-bone"
        >
          <ArrowLeft className="h-4 w-4" /> Return
        </Link>
      </div>
      {error.digest && (
        <p className="mt-10 font-mono text-[10px] tracking-[0.2em] text-muted">
          Reference: {error.digest}
        </p>
      )}
    </section>
  );
}
