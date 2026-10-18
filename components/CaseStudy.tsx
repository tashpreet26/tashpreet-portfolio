"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/content";
import { OPEN_CASE } from "@/lib/events";
import { lockScroll, unlockScroll } from "@/lib/smooth";
import ProjectArt from "./ProjectArt";

export default function CaseStudy() {
  const [slug, setSlug] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const closingRef = useRef(false);

  const project = projects.find((p) => p.slug === slug) ?? null;

  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    unlockScroll();
    setEntered(false);
    window.setTimeout(() => {
      setSlug(null);
      closingRef.current = false;
      restoreTo.current?.focus?.();
    }, 700);
  };

  /* open */
  useEffect(() => {
    const onOpen = (e: Event) => {
      const next = (e as CustomEvent<string>).detail;
      const from = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      restoreTo.current = from;
      setSlug(next);
      setEntered(false);
      lockScroll();
      window.setTimeout(() => setEntered(true), 40);
      window.setTimeout(() => closeRef.current?.focus(), 400);
    };
    window.addEventListener(OPEN_CASE, onOpen);
    return () => window.removeEventListener(OPEN_CASE, onOpen);
  }, []);

  /* escape */
  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slug]);

  /* keep the overlay at the top when switching projects */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) return null;

  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — case study`}
      ref={scrollRef}
      data-lenis-prevent
      className="fixed inset-0 z-[160] overflow-y-auto overscroll-contain bg-ink text-bone"
      style={{
        clipPath: entered ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
        transition: "clip-path 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-bone/15 bg-ink/90 px-5 py-4 backdrop-blur md:px-8">
        <span className="micro truncate">
          {String(project.index).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} —{" "}
          {project.discipline}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          data-cursor="CLOSE"
          className="micro link-flip shrink-0 font-bold"
        >
          <span>Close (esc)</span>
          <span aria-hidden>Close (esc)</span>
        </button>
      </div>

      <article className="px-5 pb-24 md:px-8">
        <header className="pt-[7vh]">
          <h2
            data-reveal
            className="font-display text-[clamp(3rem,13vw,12rem)] uppercase leading-[0.84] tighter"
          >
            {project.title}
          </h2>
          <p
            data-reveal
            style={{ "--d": "0.1s" } as React.CSSProperties}
            className="mt-6 max-w-[56ch] font-serif text-[clamp(1.25rem,2.3vw,2.1rem)] italic leading-snug text-bone/90"
          >
            {project.statement}
          </p>
        </header>

        <dl className="mt-10 grid grid-cols-2 gap-px border border-bone/20 bg-bone/20 md:grid-cols-4">
          {project.meta.map((m) => (
            <div key={m.label} className="bg-ink px-4 py-4">
              <dt className="micro opacity-50">{m.label}</dt>
              <dd className="mt-2 text-[0.95rem] leading-snug">{m.value}</dd>
            </div>
          ))}
        </dl>

        <figure
          data-reveal="clip"
          className="relative mt-10 aspect-[16/10] overflow-hidden"
          style={{ background: project.palette.bg }}
        >
          <ProjectArt
            variant={project.art}
            bg={project.palette.bg}
            fg={project.palette.fg}
            accent={project.palette.accent}
            seed={project.seed}
            glyph={project.title.charAt(0)}
          />
          <figcaption
            className="absolute bottom-4 left-5 micro"
            style={{ color: project.palette.fg }}
          >
            {project.line}
          </figcaption>
        </figure>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <span className="micro opacity-50">Approach</span>
            <p className="mt-4 text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-bone/85">
              {project.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="micro border border-bone/25 px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:col-span-6 md:col-start-7 md:grid-cols-2">
            {project.plates.slice(0, 2).map((plate, i) => (
              <figure key={plate.caption}>
                <div
                  data-reveal="scale"
                  style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}
                  className="aspect-[4/5] overflow-hidden"
                >
                  <ProjectArt
                    variant={plate.variant}
                    bg={project.palette.bg}
                    fg={project.palette.fg}
                    accent={project.palette.accent}
                    seed={plate.seed}
                    glyph={project.title.charAt((i + 1) % project.title.length)}
                  />
                </div>
                <figcaption className="mt-2 micro opacity-55">{plate.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <blockquote className="my-20 border-y border-bone/15 py-12">
          <p
            data-reveal
            className="max-w-[22ch] font-serif text-[clamp(1.8rem,5vw,4.2rem)] italic leading-[1.05]"
          >
            “{project.quote}”
          </p>
          <footer className="mt-6 micro opacity-55">— {project.client}</footer>
        </blockquote>

        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <span className="micro opacity-50">Outcome</span>
            <p className="mt-4 max-w-[46ch] text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-bone/85">
              {project.outcome}
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <span className="micro opacity-50">Credits</span>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-bone/85">
              Design &amp; art direction — Tashpreet Kaur
              <br />
              {project.meta[2]?.label} — {project.meta[2]?.value}
              <br />
              Bhopal, India
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setEntered(false);
            window.setTimeout(() => {
              setSlug(next.slug);
              setEntered(false);
              window.setTimeout(() => setEntered(true), 40);
            }, 700);
          }}
          data-cursor="NEXT"
          className="group mt-16 flex w-full items-end justify-between gap-6 border-t border-bone/20 pt-8 text-left"
        >
          <span>
            <span className="micro opacity-50">Next project</span>
            <span className="mt-2 block font-display text-[clamp(2.2rem,9vw,7.5rem)] uppercase leading-[0.86] transition-transform duration-700 ease-film group-hover:translate-x-3">
              {next.title}
            </span>
          </span>
          <span className="font-display text-[clamp(2rem,6vw,5rem)] leading-none" style={{ color: "var(--accent-soft)" }}>
            ↗
          </span>
        </button>
      </article>
    </div>
  );
}
