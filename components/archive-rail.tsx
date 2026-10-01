"use client";

import { usePathname } from "next/navigation";
import { NAV_SECTIONS } from "@/lib/site";

/**
 * Fixed left rail showing the current archive section.
 * Hidden below the lg breakpoint.
 */
export default function ArchiveRail() {
  const pathname = usePathname();
  const section = NAV_SECTIONS.find(
    (s) => (s.href === "/" ? pathname === "/" : pathname.startsWith(s.href))
  );
  const label = section ? `${section.number} / ${section.label}` : "001 / Archive";

  return (
    <div
      className="no-print fixed left-5 top-1/2 z-[110] hidden -translate-y-1/2 select-none lg:block"
      aria-hidden
    >
      <div className="flex items-center gap-4" style={{ writingMode: "vertical-rl" }}>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
          {label}
        </span>
        <span className="h-16 w-px bg-line" />
      </div>
    </div>
  );
}
