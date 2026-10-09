"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: an instant dot + a lerped ring that grows a label
 * (VIEW / OPEN / SWITCH / DRAG) from the nearest [data-cursor] element.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    let shown = false;

    const render = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const target = e.target instanceof Element ? e.target : null;
      const holder = target?.closest<HTMLElement>("[data-cursor]");
      const label = holder?.dataset.cursor ?? "";
      if (ring.dataset.label !== label) {
        ring.dataset.label = label;
        ring.textContent = label;
      }
      const hot = !!target?.closest("a, button, [role='button'], input, textarea");
      ring.classList.toggle("is-hot", hot && label === "");
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      shown = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0, viewTransitionName: "cursor-dot" }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        data-label=""
        style={{ opacity: 0, viewTransitionName: "cursor-ring" }}
        aria-hidden
      />
    </>
  );
}
