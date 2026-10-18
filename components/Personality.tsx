"use client";

import { useEffect, useState } from "react";
import { currentlyObsessed, obsessionChatter } from "@/lib/content";

export default function Personality() {
  const [active, setActive] = useState(0);
  const [chatter, setChatter] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setChatter((c) => (c + 1) % obsessionChatter.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  const item = currentlyObsessed[active];

  return (
    <section
      data-nav-theme="light"
      className="bg-bone px-5 pt-[13vh] pb-[12vh] md:px-8"
    >
      <div className="flex items-start justify-between micro">
        <span>02 — Currently</span>
        <span className="text-right opacity-55">A person lives here</span>
      </div>

      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="cond font-sans text-[clamp(2.4rem,8vw,7.5rem)] font-black uppercase leading-[0.86] tracking-[-0.04em]">
          <span data-reveal>Obsessed with</span>
        </h2>
        <p className="micro max-w-[28ch] leading-relaxed opacity-55">
          <span style={{ color: "var(--accent)" }}>Now:</span>{" "}
          <span key={chatter} className="rise-fade inline-block">
            {obsessionChatter[chatter]}
          </span>
        </p>
      </div>

      <div className="mt-[7vh] grid gap-10 md:grid-cols-12 md:gap-6">
        <ul className="md:col-span-7">
          {currentlyObsessed.map((o, i) => (
            <li key={o.label}>
              <button
                type="button"
                data-cursor="Hmm"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className="group flex w-full items-baseline gap-4 border-b border-ink/20 py-4 text-left md:gap-6"
              >
                <span className="micro w-8 shrink-0 opacity-45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-serif text-[clamp(1.5rem,3.4vw,3rem)] leading-none transition-all duration-500 ease-film ${
                    active === i ? "translate-x-2 md:translate-x-4" : "translate-x-0"
                  }`}
                  style={active === i ? { color: "var(--accent)", fontStyle: "italic" } : undefined}
                >
                  {o.label}
                </span>
                <span
                  className="ml-auto hidden text-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-60 md:block"
                  aria-hidden
                >
                  ↗
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="md:col-span-4 md:col-start-9">
          <div className="sticky top-28 border border-ink/25 bg-ink p-6 text-bone">
            <span className="micro opacity-50">File — 0{active + 1}</span>
            <p
              key={item.label}
              className="rise-fade mt-4 font-serif text-[clamp(1.3rem,2vw,1.9rem)] italic leading-snug"
            >
              {item.label}
            </p>
            <p key={`${item.label}-d`} className="rise-fade mt-3 text-[0.98rem] leading-relaxed text-bone/75">
              {item.detail}.
            </p>
            <div className="mt-6 flex items-center gap-2 micro opacity-55">
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-soft)" }} />
              hover the list — the file updates
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
