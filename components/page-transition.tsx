"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_SECTIONS } from "@/lib/site";

/**
 * Cinematic but fast page transition.
 * On navigation: a thin accent line sweeps across, the outgoing
 * section label flashes, then the new page settles in. ~550ms total.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (pathname === current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(pathname);
      return;
    }
    setPhase("out");
    timers.current.push(setTimeout(() => setCurrent(pathname), 220));
    timers.current.push(setTimeout(() => setPhase("in"), 240));
    timers.current.push(setTimeout(() => setPhase("idle"), 620));
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [pathname, current]);

  const section = NAV_SECTIONS.find(
    (s) => (s.href === "/" ? current === "/" : current.startsWith(s.href))
  );
  const label = section ? `${section.number} — ${section.label}` : "Archive";

  return (
    <div
      aria-hidden
      className={`no-print pointer-events-none fixed inset-0 z-[170] flex items-center justify-center transition-opacity duration-300 ${
        phase === "idle" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`absolute inset-0 bg-ivory transition-transform duration-500 dark:bg-night ${
          phase === "out"
            ? "translate-y-0"
            : phase === "in"
              ? "-translate-y-full"
              : "translate-y-full"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      />
      <div
        className={`relative font-mono text-[11px] uppercase tracking-[0.4em] text-accent transition-opacity duration-200 dark:text-ember ${
          phase === "out" ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </div>
      <div
        className={`absolute left-0 top-0 h-[2px] w-full bg-accent transition-transform duration-500 dark:bg-ember ${
          phase === "out" ? "scale-x-100" : "scale-x-0"
        }`}
        style={{
          transformOrigin: "left",
          transitionTimingFunction: "var(--ease-out-expo)",
        }}
      />
    </div>
  );
}
