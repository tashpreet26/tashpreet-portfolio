import type { ReactNode } from "react";
import Reveal from "./reveal";

interface EmptyStateProps {
  number: string;
  title: string;
  note: string;
  children?: ReactNode;
}

export default function EmptyState({ number, title, note, children }: EmptyStateProps) {
  return (
    <Reveal>
      <div className="relative border border-dashed border-line px-8 py-20 text-center md:py-28">
        <span
          className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-display text-[7rem] font-light leading-none text-line select-none md:text-[10rem]"
          aria-hidden
        >
          {number}
        </span>
        <p className="relative font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
          {title}
        </p>
        <p className="relative mx-auto mt-5 max-w-md font-display text-2xl font-light leading-snug text-soft dark:text-ash md:text-3xl">
          {note}
        </p>
        {children && <div className="relative mt-8">{children}</div>}
      </div>
    </Reveal>
  );
}
