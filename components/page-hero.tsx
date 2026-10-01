import type { ReactNode } from "react";
import Reveal from "./reveal";

interface PageHeroProps {
  number: string;
  title: string;
  note?: string;
  children?: ReactNode;
}

export default function PageHero({ number, title, note, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
      <div className="archive-grid absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
            <span>{number}</span>
            <span className="h-px w-16 bg-line" />
            {note && <span className="text-muted">{note}</span>}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 font-display text-5xl font-light leading-[1.02] tracking-tight text-ink dark:text-bone sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </Reveal>
        {children && (
          <Reveal delay={220}>
            <div className="mt-8 max-w-2xl text-lg leading-relaxed text-soft dark:text-ash">
              {children}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
