"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — desktop (fine pointer) only.
 * A precise dot + a trailing ring. The ring takes on a contextual
 * label (VIEW / READ / EXPLORE) when hovering [data-cursor] elements.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("[data-cursor]");
      if (el) {
        setLabel(el.getAttribute("data-cursor"));
        setHovering(true);
      } else {
        setLabel(null);
        setHovering(false);
      }
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[210] h-1.5 w-1.5 rounded-full bg-accent dark:bg-ember"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[209] flex items-center justify-center rounded-full border border-current transition-[width,height,background-color] duration-300"
        style={{
          width: hovering ? 72 : 36,
          height: hovering ? 72 : 36,
          color: "var(--color-ink)",
          mixBlendMode: "difference",
          borderColor: "#fff",
        }}
        aria-hidden
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white mix-blend-difference">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
