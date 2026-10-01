"use client";

import { useState } from "react";
import Link from "next/link";

interface MapNode {
  id: string;
  label: string;
  href: string;
  note: string;
  x: number; // percent
  y: number; // percent
}

const NODES: MapNode[] = [
  { id: "research", label: "Research", href: "/research", note: "An index of questions — the intellectual center of the archive.", x: 50, y: 42 },
  { id: "projects", label: "Projects", href: "/projects", note: "Experiments made tangible — work built to test ideas.", x: 16, y: 16 },
  { id: "questions", label: "Questions", href: "/research", note: "The raw material of inquiry — what she is curious about.", x: 84, y: 14 },
  { id: "publications", label: "Publications", href: "/publications", note: "Written record — findings shared with the world.", x: 12, y: 74 },
  { id: "awards", label: "Awards", href: "/awards", note: "Recognition — moments the work was acknowledged.", x: 88, y: 72 },
  { id: "education", label: "Education", href: "/education", note: "Foundations — the training that shaped her methods.", x: 34, y: 90 },
  { id: "skills", label: "Skills", href: "/about", note: "Instruments — tools she brings to every question.", x: 68, y: 90 },
];

const CENTER = "research";

/**
 * THE LIVING ARCHIVE — the portfolio's signature visual system.
 * Interconnected nodes representing the archive's areas. Hovering a
 * node illuminates its connections; clicking navigates to the area.
 */
export default function ResearchMap() {
  const [active, setActive] = useState<string | null>(null);

  const isActive = (id: string) => active === null || active === id || id === CENTER;
  const isConnected = (id: string) =>
    active === null || id === active || id === CENTER || active === CENTER;

  return (
    <div>
      {/* Desktop map */}
      <div
        className="relative mx-auto hidden h-[560px] w-full max-w-4xl select-none md:block"
        onMouseLeave={() => setActive(null)}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {NODES.filter((n) => n.id !== CENTER).map((node) => {
            const center = NODES.find((n) => n.id === CENTER)!;
            const lit = active !== null && (node.id === active || active === CENTER);
            return (
              <line
                key={node.id}
                x1={center.x}
                y1={center.y}
                x2={node.x}
                y2={node.y}
                strokeWidth={lit ? 0.45 : 0.18}
                className={
                  lit
                    ? "stroke-accent dark:stroke-ember"
                    : isConnected(node.id)
                      ? "stroke-ink/40 dark:stroke-bone/40"
                      : "stroke-ink/10 dark:stroke-bone/10"
                }
                style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
              />
            );
          })}
        </svg>

        {NODES.map((node) => {
          const dim = active !== null && !isActive(node.id);
          return (
            <Link
              key={node.id}
              href={node.href}
              onMouseEnter={() => setActive(node.id)}
              onFocus={() => setActive(node.id)}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                opacity: dim ? 0.25 : 1,
                transition: "opacity 0.4s ease",
              }}
              aria-label={`${node.label} — ${node.note}`}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full border font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 md:h-16 md:w-16 ${
                  active === node.id
                    ? "border-accent bg-accent text-paper dark:border-ember dark:bg-ember dark:text-night"
                    : "border-ink/30 bg-paper text-ink group-hover:border-accent group-hover:text-accent dark:border-bone/30 dark:bg-coal dark:text-bone dark:group-hover:border-ember dark:group-hover:text-ember"
                }`}
              >
                {node.label.slice(0, 2)}
              </span>
              <span
                className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] whitespace-nowrap transition-colors ${
                  active === node.id
                    ? "text-accent dark:text-ember"
                    : "text-muted group-hover:text-ink dark:group-hover:text-bone"
                }`}
              >
                {node.label}
              </span>
            </Link>
          );
        })}

        {/* Active node note */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
          <p
            className="max-w-sm text-center font-display text-lg font-light italic text-soft transition-opacity duration-300 dark:text-ash"
            style={{ opacity: active ? 1 : 0 }}
          >
            {active ? NODES.find((n) => n.id === active)?.note : ""}
          </p>
        </div>
      </div>

      {/* Mobile list */}
      <ul className="divide-y divide-line border border-line md:hidden">
        {NODES.map((node) => (
          <li key={node.id}>
            <Link
              href={node.href}
              className="flex items-center gap-4 px-5 py-4 active:bg-paper dark:active:bg-coal"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/25 font-mono text-[10px] uppercase dark:border-bone/25">
                {node.label.slice(0, 2)}
              </span>
              <span>
                <span className="block font-display text-lg font-light">{node.label}</span>
                <span className="block text-sm text-muted">{node.note}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
