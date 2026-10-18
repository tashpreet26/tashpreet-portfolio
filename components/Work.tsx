"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/content";
import { openCase } from "@/lib/events";
import ProjectArt from "./ProjectArt";

/** two in the pinned rail, the rest as asymmetric features below */
const railProjects = projects.slice(0, Math.min(2, projects.length));
const featureProjects = projects.slice(railProjects.length);
const total = projects.length;
const pad = (n: number) => String(n).padStart(2, "0");

function Art({ project, seed, className = "" }: { project: Project; seed?: number; className?: string }) {
  return (
    <ProjectArt
      variant={project.art}
      bg={project.palette.bg}
      fg={project.palette.fg}
      accent={project.palette.accent}
      seed={seed ?? project.seed}
      glyph={project.title.charAt(0)}
      className={className}
    />
  );
}

function Card({ project, i, horizontal }: { project: Project; i: number; horizontal: boolean }) {
  return (
    <button
      type="button"
      onClick={() => openCase(project.slug)}
      data-cursor="OPEN"
      aria-label={`${project.title} — open case study`}
      className={`group block text-left ${horizontal ? "shrink-0" : "w-full"}`}
      style={
        horizontal
          ? { width: i % 2 ? "54vw" : "62vw", marginTop: i % 2 ? "7vh" : 0 }
          : { width: i % 2 ? "86%" : "100%", marginLeft: i % 2 ? "auto" : 0 }
      }
    >
      <div
        className="relative overflow-hidden"
        style={{
          background: project.palette.bg,
          aspectRatio: horizontal ? undefined : "4 / 5",
          height: horizontal ? "52vh" : undefined,
        }}
      >
        <Art
          project={project}
          className="transition-transform duration-[1400ms] ease-film group-hover:scale-[1.05]"
        />
        <div
          className="absolute inset-x-0 top-0 flex items-start justify-between p-4 micro"
          style={{ color: project.palette.fg }}
        >
          <span className="font-bold">{String(project.index).padStart(2, "0")}</span>
          <span>{project.year}</span>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 micro"
          style={{ color: project.palette.fg }}
        >
          <span className="opacity-75">{project.discipline}</span>
          <span className="font-bold" style={{ color: project.palette.accent }}>
            Open ↗
          </span>
        </div>
        <span
          className="absolute bottom-0 left-0 h-[6px] w-0 transition-[width] duration-700 ease-film group-hover:w-full"
          style={{ background: project.palette.accent }}
        />
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-5">
        <h3 className="font-display text-[clamp(1.7rem,3vw,3.4rem)] uppercase leading-none transition-transform duration-500 ease-film group-hover:translate-x-2">
          {project.title}
        </h3>
        <span className="micro hidden shrink-0 opacity-50 md:inline">{project.tags[0]}</span>
      </div>
      <p className="mt-2 max-w-[46ch] font-serif text-[1.05rem] italic leading-snug opacity-70">
        {project.line}
      </p>
    </button>
  );
}

function Feature({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-5">
      <button
        type="button"
        onClick={() => openCase(project.slug)}
        data-cursor="OPEN"
        aria-label={`${project.title} — open case study`}
        className={`group relative block text-left md:col-span-8 ${
          flip ? "md:col-start-5" : "md:col-start-1"
        }`}
        style={{ transform: flip ? undefined : "rotate(-0.7deg)" }}
      >
        <div
          className="relative aspect-[16/11] overflow-hidden"
          style={{ background: project.palette.bg }}
        >
          <Art
            project={project}
            className="transition-transform duration-[1400ms] ease-film group-hover:scale-[1.05]"
          />
          <span
            className="absolute bottom-3 left-5 font-display text-[clamp(3rem,9vw,9rem)] leading-none opacity-30"
            style={{ color: project.palette.fg }}
          >
            {String(project.index).padStart(2, "0")}
          </span>
        </div>
      </button>

      <div
        className={`flex flex-col justify-end md:col-span-3 ${
          flip ? "md:col-start-1 md:row-start-1" : "md:col-start-10"
        }`}
      >
        <span className="micro opacity-50">
          {project.year} — {project.discipline}
        </span>
        <h3 className="mt-3 font-display text-[clamp(2.2rem,5vw,4.6rem)] uppercase leading-[0.9]">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[34ch] font-serif text-[1.1rem] italic leading-snug opacity-75">
          {project.line}
        </p>
        <button
          type="button"
          onClick={() => openCase(project.slug)}
          data-cursor="OPEN"
          className="micro mt-6 inline-flex w-fit items-center gap-2 border-b border-ink/40 pb-1 font-bold transition-colors hover:border-ink"
        >
          Open case study
          <span aria-hidden>↗</span>
        </button>
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  /* pin only on large screens, never under reduced motion */
  useEffect(() => {
    const evaluate = () => {
      const should =
        window.innerWidth >= 1024 &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPinned((prev) => (prev === should ? prev : should));
    };
    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  /* horizontal scroll driven by vertical scroll */
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (!pinned) {
      section.style.height = "";
      track.style.transform = "";
      return;
    }

    let raf = 0;
    const measure = () => {
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + distance}px`;
    };
    const update = () => {
      raf = 0;
      const distance = Math.max(0, track.scrollWidth - window.innerWidth);
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0 || distance <= 0) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      track.style.transform = `translate3d(${(-progress * distance).toFixed(2)}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    document.fonts?.ready.then(onResize).catch(() => {});
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      section.style.height = "";
      track.style.transform = "";
    };
  }, [pinned]);

  return (
    <section id="work" data-nav-theme="light" className="relative bg-bone pt-[12vh]">
      <div className="flex items-end justify-between gap-8 px-5 md:px-8">
        <div>
          <span className="micro">02 — Selected work</span>
          <h2 className="mt-4 font-display text-[clamp(3.2rem,13vw,12rem)] uppercase leading-[0.82] tighter">
            <span className="block" data-reveal>
              Selected
            </span>
            <span className="flex items-baseline gap-5">
              <span className="outline-type" data-reveal style={{ "--d": "0.08s" } as React.CSSProperties}>
                Work
              </span>
              <span className="font-serif text-[clamp(1.1rem,2.2vw,2rem)] italic normal-case opacity-60">
                ({pad(total)})
              </span>
            </span>
          </h2>
        </div>
        <p className="hidden max-w-[30ch] micro leading-relaxed opacity-55 md:block">
          Nothing here is a thumbnail. Click anything — every project opens full-screen.
        </p>
      </div>

      {/* pinned horizontal rail */}
      <div ref={sectionRef} className="relative mt-[8vh]">
        <div
          className={
            pinned
              ? "sticky top-0 flex h-svh items-center overflow-hidden"
              : "static flex h-auto flex-col gap-16 overflow-visible px-5 md:gap-24 md:px-8"
          }
        >
          <div
            ref={trackRef}
            className={
              pinned
                ? "flex w-max items-start gap-[5vw] px-[7vw]"
                : "flex w-full flex-col items-stretch gap-16 md:gap-24"
            }
          >
            {railProjects.map((project, i) => (
              <Card key={project.slug} project={project} i={i} horizontal={pinned} />
            ))}
          </div>
        </div>
      </div>

      {/* asymmetric features */}
      {featureProjects.length > 0 && (
        <div className="mt-[14vh] space-y-[12vh] px-5 md:px-8">
          <div className="flex items-center gap-5 micro opacity-50">
            <span className="rule h-px flex-1" />
            <span>
              Continue — {pad(railProjects.length + 1)} / {pad(total)}
            </span>
          </div>
          {featureProjects.map((project, i) => (
            <div key={project.slug} data-reveal>
              <Feature project={project} flip={i % 2 === 1} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-[12vh] flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 px-5 py-6 micro md:px-8">
        <span>Drag your eyes across — or just click</span>
        <span className="opacity-55">
          {total} projects, {total} different art directions
        </span>
      </div>
    </section>
  );
}
