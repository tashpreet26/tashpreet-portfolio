"use client";

import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { projects } from "@/lib/content";
import { openCase } from "@/lib/events";
import ProjectArt from "./ProjectArt";

/**
 * /work — the index screen: an editorial table instead of a card grid.
 * Hovering a row summons the project's art plate, which follows the pointer.
 */
export default function WorkIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const track = (e: ReactPointerEvent) => {
    const el = previewRef.current;
    if (!el) return;
    const x = Math.min(e.clientX + 32, window.innerWidth - 360);
    const y = Math.min(
      Math.max(e.clientY - 170, 96),
      window.innerHeight - 330,
    );
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const active = hover === null ? null : projects[hover];

  return (
    <section
      id="work"
      data-nav-theme="light"
      className="relative bg-bone px-5 pt-[8vh] pb-[14vh] md:px-8"
      onPointerMove={track}
    >
      <div className="flex items-center gap-5 micro opacity-50">
        <span className="rule h-px flex-1" />
        <span>Hover a row — the plate follows</span>
      </div>

      <ul className="mt-[6vh] border-t border-ink/25">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            data-reveal
            style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={() => openCase(p.slug)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover((h) => (h === i ? null : h))}
              onFocus={() => setHover(i)}
              onBlur={() => setHover((h) => (h === i ? null : h))}
              data-cursor="OPEN"
              aria-label={`${p.title} — open case study`}
              className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-ink/25 py-6 text-left md:grid-cols-[4rem_1fr_15rem_5rem] md:gap-x-8"
            >
              <span className="micro opacity-45">
                {String(p.index).padStart(2, "0")}
              </span>
              <span className="font-display text-[clamp(2.1rem,7vw,5.6rem)] uppercase leading-[0.88] transition-transform duration-500 ease-film group-hover:translate-x-3">
                {p.title}
              </span>
              <span className="micro col-start-2 mt-1 opacity-55 md:col-start-3 md:mt-0 md:self-center">
                {p.discipline}
              </span>
              <span className="micro col-start-3 row-start-1 justify-self-end opacity-55 md:col-start-4">
                {p.year} ↗
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-[8vh] flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 py-6 micro">
        <span>Index — 06 / 06</span>
        <span className="opacity-55">
          Different art direction for every project, on purpose
        </span>
      </div>

      {/* floating art preview */}
      <div
        ref={previewRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[150] hidden w-[24vw] max-w-[380px] transition-opacity duration-300 md:block ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate3d(-999px,0,0)" }}
      >
        {active ? (
          <div
            className="aspect-[4/5] overflow-hidden shadow-[0_40px_90px_-50px_rgba(16,14,12,0.7)]"
            style={{ background: active.palette.bg }}
          >
            <ProjectArt
              variant={active.art}
              bg={active.palette.bg}
              fg={active.palette.fg}
              accent={active.palette.accent}
              seed={active.seed}
              glyph={active.title.charAt(0)}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
