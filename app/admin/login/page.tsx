"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { loginAction, type AuthState } from "@/lib/actions";
import { ArrowLeft } from "@/components/icons";

const initialState: AuthState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5">
      <div className="archive-grid absolute inset-0" aria-hidden />
      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent dark:hover:text-ember"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to the archive
        </Link>

        <div className="border border-line bg-paper p-8 md:p-10 dark:bg-coal">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
            Restricted — Admin only
          </p>
          <h1 className="mt-4 font-display text-3xl font-light tracking-tight text-ink dark:text-bone">
            The archive is sealed.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Enter the archivist&apos;s password to manage the content of this site.
          </p>

          <form action={formAction} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="password"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-soft dark:text-ash"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                autoFocus={mounted}
                className="mt-2 w-full border border-line bg-ivory px-4 py-3 text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none dark:bg-night dark:text-bone dark:focus:border-ember"
                placeholder="••••••••••"
              />
            </div>

            {state.error && (
              <p role="alert" className="border border-accent/40 bg-accent/5 px-4 py-3 text-sm text-accent dark:border-ember/40 dark:bg-ember/5 dark:text-ember">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full border border-ink bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ivory transition-opacity hover:opacity-85 disabled:opacity-50 dark:border-bone dark:bg-bone dark:text-night"
            >
              {isPending ? "Unlocking…" : "Unlock the archive"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          The Archive of Inquiry — Private CMS
        </p>
      </div>
    </section>
  );
}
