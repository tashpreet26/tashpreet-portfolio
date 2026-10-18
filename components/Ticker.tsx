"use client";

import { useEffect, useRef } from "react";

/** Velocity-aware marquee: scroll fast and it answers back. */
export default function Ticker({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let half = 0;
    let velocity = 0;
    let prevY = window.scrollY;
    let last = performance.now();
    let raf = 0;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);

    const loop = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const y = window.scrollY;
      const dy = y - prevY;
      prevY = y;
      const target = Math.min(52, Math.abs(dy) * 0.55);
      velocity += (target - velocity) * 0.12;

      x -= (0.6 + velocity) * (dt / 16);
      if (half > 0 && -x >= half) x += half;
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const row = [...items, ...items];

  return (
    <div
      data-nav-theme="dark"
      className="relative overflow-hidden border-y border-bone/10 bg-ink py-3.5 text-bone md:py-4"
    >
      <div ref={trackRef} className="marquee-track flex w-max whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center font-display text-[6.5vw] leading-none md:text-[3.4vw]">
            <span className="px-[0.3em] uppercase">{item}</span>
            <span
              className="mx-[0.25em] inline-block h-[0.15em] w-[0.15em] rotate-45"
              style={{ background: "var(--accent-soft)" }}
              aria-hidden
            />
          </span>
        ))}
      </div>
    </div>
  );
}
