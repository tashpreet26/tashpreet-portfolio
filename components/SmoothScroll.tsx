"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { getSmoothScroll, registerSmoothScroll } from "@/lib/smooth";

/**
 * Locomotive Scroll 5 (built on Lenis) — it rides the *native* scrollbar, so
 * sticky sections, fixed overlays and every `window.scrollY` listener on the
 * site keep behaving exactly as they did. Only the wheel gets the glide.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // the site already opts out of every bit of motion here — respect it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.09,
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.15,
        wheelMultiplier: 1,
        anchors: true,
        // Locomotive drives Lenis from its own RAF loop
        autoRaf: false,
      },
    });

    registerSmoothScroll(scroll);

    // the pinned Work rail rewrites the document height after fonts settle
    const remeasure = () => scroll.resize();
    const settle = window.setTimeout(remeasure, 400);
    window.addEventListener("resize", remeasure);
    document.fonts?.ready.then(remeasure).catch(() => {});

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("resize", remeasure);
      registerSmoothScroll(null);
      scroll.destroy();
    };
  }, []);

  /* a client-side navigation swaps the document — resync, don't animate */
  useEffect(() => {
    const scroll = getSmoothScroll();
    if (!scroll || window.location.hash) return;

    scroll.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => scroll.resize(), 160);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
