import Link from "next/link";
import { getSettings } from "@/lib/db";
import { SITE } from "@/lib/site";
import { ArrowUpRight, MailIcon, MapPinIcon } from "./icons";
import Reveal from "./reveal";

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="no-print relative mt-32 border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
            010 — Correspondence
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-light leading-tight tracking-tight text-ink dark:text-bone sm:text-5xl md:text-6xl">
            Have a question worth pursuing?{" "}
            <span className="italic text-soft dark:text-ash">The archive is listening.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            {settings.email ? (
              <a
                href={`mailto:${settings.email}`}
                className="group inline-flex items-center gap-3 border border-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-ivory dark:border-bone dark:text-bone dark:hover:bg-bone dark:hover:text-night"
              >
                <MailIcon className="h-4 w-4" />
                {settings.email}
              </a>
            ) : (
              <span className="inline-flex items-center gap-3 border border-dashed border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
                <MailIcon className="h-4 w-4" />
                Correspondence opening soon
              </span>
            )}
            <Link
              href="/contact"
              className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-soft hover:text-ink dark:text-ash dark:hover:text-bone"
            >
              Contact <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-ink dark:text-bone">
              {settings.siteTitle}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {settings.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:text-right">
            <span className="inline-flex items-center gap-2 md:justify-end">
              <MapPinIcon className="h-3.5 w-3.5" />
              {settings.location || SITE.location}
            </span>
            {settings.socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent md:justify-end dark:hover:text-ember"
              >
                {s.label} <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted md:flex-row md:items-center md:justify-between">
          <span>© MMXXVI {settings.siteTitle}</span>
          <span>Curiosity over credentials</span>
          <Link href="/" className="transition-colors hover:text-accent dark:hover:text-ember">
            Back to the beginning ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
