"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

interface HeroProps {
  counts: {
    research: number;
    projects: number;
    publications: number;
    awards: number;
  };
}

export default function Hero({ counts }: HeroProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const layer = (depth: number) => ({
    transform: `translate3d(${mouse.x * -depth}px, ${mouse.y * -depth * 0.7}px, 0)`,
  });

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-8 pt-24 md:px-10">
      {/* Background grid */}
      <div className="archive-grid absolute inset-0" aria-hidden />

      {/* Rotating archival ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={layer(18)}
        aria-hidden
      >
        <div className="animate-spin-slow h-[130vmin] w-[130vmin] rounded-full border border-line">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent dark:bg-ember" />
          <span className="absolute bottom-[12%] right-[8%] font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Fig. 001
          </span>
        </div>
      </div>

      {/* Crosshair following the mouse */}
      <div
        className="pointer-events-none absolute left-0 top-0 hidden md:block"
        style={{
          transform: `translate3d(${mouse.x * 40 + 50}vw, ${mouse.y * 40 + 50}vh, 0)`,
        }}
        aria-hidden
      >
        <div className="h-px w-8 -translate-x-1/2 bg-accent/40 dark:bg-ember/40" />
      </div>

      {/* Top metadata */}
      <div className="relative flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-muted md:text-[11px]">
        <span className="text-accent dark:text-ember">Archive 001</span>
        <span className="hidden sm:block">{SITE.coordinates}</span>
        <span>{SITE.location}</span>
      </div>

      {/* Title */}
      <div className="relative py-10 text-center">
        <p
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.45em] text-soft dark:text-ash"
          style={layer(8)}
        >
          A beginning shaped by curiosity
        </p>
        <h1 className="font-display font-light uppercase leading-[0.88] tracking-[-0.02em] text-ink dark:text-bone">
          <span
            className="block text-[clamp(3.2rem,12.5vw,11rem)]"
            style={layer(14)}
          >
            Tashpreet
          </span>
          <span
            className="block pl-[0.35em] text-[clamp(3.2rem,12.5vw,11rem)] italic"
            style={layer(26)}
          >
            Kaur<span className="text-accent not-italic dark:text-ember">.</span>
          </span>
        </h1>
      </div>

      {/* Bottom metadata + entry */}
      <div className="relative">
        <div
          className="flex items-center justify-between gap-4 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted md:text-[11px]"
          style={layer(6)}
        >
          <span>
            Research{" "}
            <span className="text-ink dark:text-bone">
              {String(counts.research).padStart(2, "0")}
            </span>
          </span>
          <span>
            Projects{" "}
            <span className="text-ink dark:text-bone">
              {String(counts.projects).padStart(2, "0")}
            </span>
          </span>
          <span className="hidden md:block">
            Publications{" "}
            <span className="text-ink dark:text-bone">
              {String(counts.publications).padStart(2, "0")}
            </span>
          </span>
          <span className="hidden md:block">
            Awards{" "}
            <span className="text-ink dark:text-bone">
              {String(counts.awards).padStart(2, "0")}
            </span>
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="#archive"
            className="group flex flex-col items-center gap-3"
            aria-label="Enter the archive — scroll to the living archive"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-soft transition-colors group-hover:text-accent dark:text-ash dark:group-hover:text-ember">
              Enter Archive
            </span>
            <span className="animate-scroll-line block h-12 w-px bg-accent dark:bg-ember" />
          </a>
        </div>
      </div>
    </section>
  );
}
