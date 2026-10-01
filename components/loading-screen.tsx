"use client";

import { useEffect, useState } from "react";

/**
 * "FIRST LIGHT" — the portfolio's opening ceremony.
 *
 * A dark room. A single warm spark of light at the center pulses —
 * then light floods in from every side, the darkness recedes, and
 * the gallery is revealed. The name emerges letterpress-style
 * within the light. Positive, quiet, and full of beginning.
 *
 * Total runtime ~2.9s. Skipped for reduced-motion users.
 */
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(0); // 0 = dark covers, 1 = fully open
  const [exiting, setExiting] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Respect reduced motion — brief static title, then move on.
  useEffect(() => {
    if (!mounted) return;
    if (reduced) {
      setOpen(1);
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
  }, [mounted, onDone, reduced]);

  // Archival counter — 000 → 100, like a catalogue being stamped.
  useEffect(() => {
    if (!mounted) return;
    if (reduced) {
      setCount(100);
      return;
    }
    const duration = 2300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2.2);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, reduced]);

  // Choreography
  useEffect(() => {
    if (!mounted || reduced) return;
    const timers = [
      setTimeout(() => setOpen(1), 650), // light floods in
      setTimeout(() => setExiting(true), 2450), // UI fades
      setTimeout(onDone, 2950),
    ];
    return () => timers.forEach(clearTimeout);
  }, [mounted, onDone, reduced]);

  if (!mounted) return null;

  // The dark room recedes toward the center as `open` goes 0 → 1.
  const darkSize = `${(1 - open) * 150}%`;

  const title = "TASHPREET";

  return (
    <div className="fixed inset-0 z-[300]" aria-hidden={exiting}>
      {/* The dark room — a circle of darkness that recedes to a point,
          revealing the gallery beneath as light floods in. */}
      <div
        className="animate-film-flicker absolute inset-0 bg-night"
        style={{
          clipPath: `circle(${darkSize} at 50% 46%)`,
          transition: "clip-path 1.9s var(--ease-out-expo)",
        }}
      >
        {/* Warm spark at the center — the first light */}
        <div
          className="animate-light-pulse absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 46%, rgba(212,85,42,0.4) 0%, rgba(212,85,42,0.12) 30%, transparent 55%)",
          }}
        />
        {/* Film grain + vignette */}
        <div className="grain-overlay" style={{ opacity: 0.09 }} />
        <div
          className="animate-vignette-pulse absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 46%, transparent 25%, rgba(0,0,0,0.78) 100%)",
          }}
        />
        {/* Dust motes drifting in the light */}
        {[
          { left: "14%", top: "66%", delay: "0s", size: 3 },
          { left: "24%", top: "32%", delay: "0.9s", size: 2 },
          { left: "76%", top: "26%", delay: "1.7s", size: 3 },
          { left: "84%", top: "60%", delay: "0.5s", size: 2 },
          { left: "62%", top: "76%", delay: "2.3s", size: 2 },
          { left: "36%", top: "20%", delay: "1.2s", size: 2 },
          { left: "50%", top: "82%", delay: "2.9s", size: 3 },
          { left: "10%", top: "46%", delay: "2s", size: 2 },
        ].map((d, i) => (
          <span
            key={i}
            className="animate-dust absolute rounded-full bg-bone/60"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              animationDelay: d.delay,
            }}
          />
        ))}
      </div>

      {/* Always-visible UI — kept readable over both dark and light */}
      <div
        className="absolute inset-0"
        style={{ opacity: exiting ? 0 : 1, transition: "opacity 0.5s ease" }}
      >
        {/* Top meta */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,14,11,0.85) 0%, transparent 100%)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-6 font-mono text-[10px] uppercase tracking-[0.35em] text-ash md:px-10">
            <span className="text-ember">Archive — 001</span>
            <span className="hidden sm:block">23.2599° N — 77.4126° E</span>
          </div>
        </div>

        {/* Center — the name emerges within the light */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          {/* Dark halo keeps the name readable as the light rises */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 46%, rgba(15,14,11,0.88) 0%, rgba(15,14,11,0.35) 42%, transparent 68%)",
            }}
          />
          <p
            className="animate-fade-up relative font-mono text-[10px] uppercase tracking-[0.5em] text-ash"
            style={{ animationDelay: "750ms" }}
          >
            The Archive of Inquiry
          </p>
          <h1 className="relative mt-6 font-display font-light uppercase leading-[0.95] tracking-[-0.02em] text-bone">
            <span className="block text-[clamp(2.6rem,9vw,6.5rem)]">
              {title.split("").map((letter, i) => (
                <span
                  key={i}
                  className="animate-stamp-in inline-block"
                  style={{ animationDelay: `${850 + i * 55}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>
            <span
              className="animate-stamp-in block pl-[0.4em] text-[clamp(2.6rem,9vw,6.5rem)] italic text-ember"
              style={{ animationDelay: `${850 + title.length * 55 + 100}ms` }}
            >
              Kaur
            </span>
          </h1>
          <div
            className="animate-fade-up relative mx-auto mt-8 h-px w-40 bg-ember/70"
            style={{ animationDelay: "1900ms" }}
          />
          <p
            className="animate-fade-up relative mt-5 font-mono text-[10px] uppercase tracking-[0.4em] text-ash"
            style={{ animationDelay: "2000ms" }}
          >
            A beginning shaped by curiosity
          </p>
        </div>

        {/* Bottom — catalogue counter */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            background:
              "linear-gradient(to top, rgba(15,14,11,0.85) 0%, transparent 100%)",
          }}
        >
          <div className="flex items-end justify-between px-6 py-6 font-mono text-[10px] uppercase tracking-[0.35em] text-ash md:px-10">
            <span>Bhopal — Present</span>
            <span className="text-bone">
              {String(count).padStart(3, "0")}
              <span className="text-ember"> / 100</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
