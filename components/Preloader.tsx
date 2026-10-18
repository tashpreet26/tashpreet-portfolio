"use client";

import { useEffect, useRef, useState } from "react";
import { lockScroll, unlockScroll } from "@/lib/smooth";

/** Short editorial intro: counter, curtain, then it never comes back. */
export default function Preloader() {
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"run" | "out" | "done">("run");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(skip);
    }

    // hold the document still — smooth scroll included — while the curtain is up
    lockScroll();
    const start = performance.now();
    const duration = 850;
    let raf = 0;
    let t1 = 0;
    let t2 = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        t1 = window.setTimeout(() => setPhase("out"), 120);
        t2 = window.setTimeout(() => {
          setPhase("done");
          unlockScroll();
        }, 900);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      unlockScroll();
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink px-5 py-6 text-bone md:px-8 md:py-8"
      style={{
        transform: phase === "out" ? "translateY(-101%)" : "translateY(0)",
        transition: "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div className="flex items-start justify-between micro">
        <span>Tashpreet Kaur</span>
        <span>Bhopal, IN</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <span className="micro max-w-[16ch] leading-relaxed opacity-60">
          Portfolio — vol. 01, loading the good parts
        </span>
        <span
          className="font-display text-[18vw] leading-[0.8] tracking-tight md:text-[12vw]"
          style={{ transform: phase === "out" ? "translateY(-12%)" : undefined }}
        >
          <span ref={countRef}>000</span>
        </span>
      </div>

      <div className="rule pt-4">
        <span className="block h-px w-full bg-bone/15">
          <span
            ref={barRef}
            className="block h-px w-full origin-left scale-x-0 bg-sage"
            style={{ transition: "background-color .3s" }}
          />
        </span>
      </div>
    </div>
  );
}
