"use client";

import { useEffect, useRef } from "react";
import ProjectArt from "./ProjectArt";

export default function Hero() {
  const plateRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    const loop = () => {
      tx += (mx - tx) * 0.06;
      ty += (my - ty) * 0.06;
      const s = window.scrollY;
      if (plateRef.current) {
        plateRef.current.style.transform = `translate3d(${(-tx * 26).toFixed(2)}px, ${(
          -ty * 18 +
          s * 0.12
        ).toFixed(2)}px, 0)`;
      }
      if (typeRef.current) {
        typeRef.current.style.transform = `translate3d(${(tx * 9).toFixed(2)}px, ${(
          s * -0.05
        ).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const plate = (
    <ProjectArt variant="bust" bg="#100e0c" fg="#b5412b" accent="#e9e3d6" seed={4} />
  );

  return (
    <section
      id="top"
      data-nav-theme="light"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-bone px-5 pt-24 pb-6 md:px-8 md:pt-28"
    >
      <div className="flex items-start justify-between micro">
        <span className="fade-in" style={{ "--d": "1.1s" } as React.CSSProperties}>
          Portfolio — vol. 01
        </span>
        <span
          className="fade-in text-right"
          style={{ "--d": "1.2s" } as React.CSSProperties}
        >
          Art direction · brand · motion
        </span>
      </div>

      <div ref={typeRef} className="relative flex flex-1 flex-col justify-center py-8">
        <h1 data-cursor="HELLO" className="relative z-10 mix-blend-normal">
          <span className="mask-line">
            <span
              className="rise block font-display text-[clamp(4rem,30vw,30rem)] leading-[0.85] tighter"
              style={{ "--d": "1.15s" } as React.CSSProperties}
            >
              TASHPREET
            </span>
          </span>
          <span className="mask-line mt-1 md:mt-2">
            <span
              className="rise flex flex-wrap items-baseline gap-x-6 gap-y-2 md:gap-x-10"
              style={{ "--d": "1.3s" } as React.CSSProperties}
            >
              <span className="outline-type font-display text-[clamp(2.4rem,13vw,13rem)] leading-[0.85] tighter">
                KAUR
              </span>
              <span className="hidden font-serif text-[clamp(1rem,2.2vw,2rem)] italic leading-[1.1] text-oxide md:block">
                designer
                <br />
                &amp; art director
              </span>
            </span>
          </span>
        </h1>

        {/* editorial portrait plate — crops the type, desktop */}
        <div
          ref={plateRef}
          aria-hidden
          className="pointer-events-none absolute right-0 top-[40%] z-20 hidden h-[46vh] w-[32vw] max-w-[520px] overflow-hidden md:block"
          style={{ boxShadow: "0 40px 90px -50px rgba(16,14,12,0.7)" }}
        >
          {plate}
          <span className="absolute bottom-3 left-4 micro text-bone/70">
            Plate 01 — self, 2025
          </span>
        </div>

        {/* mobile plate */}
        <div
          aria-hidden
          className="pointer-events-none relative z-20 mt-6 h-[38vh] w-full overflow-hidden md:hidden"
        >
          {plate}
        </div>
      </div>

      <div className="flex items-end justify-between gap-6 border-t border-ink/20 pt-4">
        <div className="rise-fade space-y-1" style={{ "--d": "1.45s" } as React.CSSProperties}>
          <p className="micro font-bold">Creative designer</p>
          <p className="micro opacity-60">Visual thinker / art director</p>
        </div>

        <div
          className="hidden rise-fade space-y-1 text-center md:block"
          style={{ "--d": "1.55s" } as React.CSSProperties}
        >
          <p className="micro font-bold">Bhopal — India</p>
          <p className="micro opacity-60">23.2599° N, 77.4126° E</p>
        </div>

        <div
          className="rise-fade flex items-center gap-3"
          style={{ "--d": "1.65s" } as React.CSSProperties}
        >
          <span className="micro opacity-60">Scroll</span>
          <span className="relative block h-10 w-px bg-ink/20">
            <span className="scroll-cue-line absolute inset-0 block bg-ink" />
          </span>
        </div>
      </div>
    </section>
  );
}
