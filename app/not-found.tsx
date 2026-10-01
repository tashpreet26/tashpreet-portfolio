import Link from "next/link";
import Reveal from "@/components/reveal";
import { ArrowLeft } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="archive-grid absolute inset-0" aria-hidden />
      <div className="relative">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent dark:text-ember">
            Error 404 — Entry not found
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p
            className="text-outline mt-8 font-display text-[22vw] font-light leading-none select-none md:text-[16rem]"
            aria-hidden
          >
            404
          </p>
        </Reveal>
        <Reveal delay={220}>
          <h1 className="mt-4 font-display text-3xl font-light tracking-tight text-ink dark:text-bone md:text-4xl">
            This page is not in the archive.
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-soft dark:text-ash">
            The entry you are looking for does not exist — or has not been catalogued yet.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-3 border border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink transition-colors hover:bg-ink hover:text-ivory dark:border-bone dark:text-bone dark:hover:bg-bone dark:hover:text-night"
          >
            <ArrowLeft className="h-4 w-4" /> Return to the archive
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
