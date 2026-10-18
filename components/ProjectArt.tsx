import { useId } from "react";
import type { ArtVariant } from "@/lib/content";

/**
 * Deterministic, generated artwork plates — every project gets its own
 * art direction instead of stock photography.
 */

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Props = {
  variant: ArtVariant;
  bg: string;
  fg: string;
  accent: string;
  seed?: number;
  glyph?: string;
  className?: string;
};

export default function ProjectArt({
  variant,
  bg,
  fg,
  accent,
  seed = 1,
  glyph = "A",
  className = "",
}: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const rnd = mulberry32(seed * 7919 + 13);
  const vid = `v-${variant}-${seed}-${uid}`;
  let body: React.ReactNode = null;

  if (variant === "rings") {
    const ox = 560 + rnd() * 220;
    const oy = 840 + rnd() * 260;
    const rings = Array.from({ length: 17 }, (_, i) => {
      const r = 70 + i * 74 + rnd() * 26;
      const major = i % 5 === 0;
      return {
        r,
        w: major ? 4 : 1.3,
        dash: i % 3 === 0 ? `${18 + rnd() * 40} ${22 + rnd() * 46}` : undefined,
        op: major ? 0.85 : 0.35,
      };
    });
    const rain = Array.from({ length: 46 }, () => {
      const x = rnd() * 960 - 60;
      const y = rnd() * 1200;
      const len = 50 + rnd() * 150;
      return { x, y, len, op: 0.25 + rnd() * 0.5 };
    });
    body = (
      <>
        {rain.map((d, i) => (
          <line
            key={`r${i}`}
            x1={d.x}
            y1={d.y}
            x2={d.x + d.len * 0.22}
            y2={d.y + d.len}
            stroke={accent}
            strokeWidth={1.5}
            opacity={d.op}
          />
        ))}
        {rings.map((c, i) => (
          <circle
            key={i}
            cx={ox}
            cy={oy}
            r={c.r}
            fill="none"
            stroke={fg}
            strokeWidth={c.w}
            strokeDasharray={c.dash}
            opacity={c.op}
          />
        ))}
        <circle cx={ox} cy={oy} r={16} fill={accent} />
      </>
    );
  }

  if (variant === "specimen") {
    const rules = [212, 236, 906, 930];
    body = (
      <>
        <text
          x={450}
          y={960}
          textAnchor="middle"
          fill={fg}
          style={{ fontFamily: "var(--f-display)", fontSize: "1080px" }}
        >
          {glyph}
        </text>
        <text
          x={510}
          y={960}
          textAnchor="middle"
          fill="none"
          stroke={accent}
          strokeWidth={3}
          opacity={0.7}
          style={{ fontFamily: "var(--f-display)", fontSize: "1080px" }}
        >
          {glyph}
        </text>
        {rules.map((y, i) => (
          <line
            key={i}
            x1={40}
            x2={860}
            y1={y}
            y2={y}
            stroke={i % 2 ? accent : fg}
            strokeWidth={i % 2 ? 2 : 1}
            opacity={i % 2 ? 0.8 : 0.45}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <text
            key={i}
            x={44}
            y={286 + i * 34}
            fill={fg}
            opacity={0.75}
            style={{ fontFamily: "var(--f-mono)", fontSize: "21px", letterSpacing: "5px" }}
          >
            {["SPECIMEN / 62 GLYPHS", "DRAWN FROM MEMORY", "BHOPAL — 2025"][i]}
          </text>
        ))}
      </>
    );
  }

  if (variant === "grid") {
    const cols = 6;
    const rows = 8;
    const cell = 130;
    const gap = 14;
    const x0 = (900 - (cols * cell + (cols - 1) * gap)) / 2;
    const y0 = (1200 - (rows * cell + (rows - 1) * gap)) / 2;
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const n = rnd();
        const x = x0 + c * (cell + gap);
        const y = y0 + r * (cell + gap);
        if (n > 0.86) {
          cells.push({ x, y, fill: accent, op: 1, stroke: false });
        } else if (n > 0.66) {
          cells.push({ x, y, fill: fg, op: 0.14, stroke: false });
        } else if (n > 0.5) {
          cells.push({ x, y, fill: fg, op: 0.5, stroke: false });
        } else {
          cells.push({ x, y, fill: "none", op: 0.4, stroke: true });
        }
      }
    }
    body = (
      <>
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width={cell}
            height={cell}
            fill={c.fill}
            opacity={c.op}
            stroke={c.stroke ? fg : undefined}
            strokeWidth={c.stroke ? 1.2 : undefined}
          />
        ))}
        <rect
          x={x0 + (cell + gap) * 2}
          y={y0 + (cell + gap) * 3}
          width={cell * 2 + gap}
          height={cell * 2 + gap}
          fill="none"
          stroke={accent}
          strokeWidth={4}
        />
        <line
          x1={x0}
          x2={900 - x0}
          y1={y0 + (cell + gap) * 5 + cell / 2}
          y2={y0 + (cell + gap) * 5 + cell / 2}
          stroke={accent}
          strokeWidth={4}
        />
      </>
    );
  }

  if (variant === "halftone") {
    const step = 50;
    const dots = [];
    for (let y = step / 2; y < 1200; y += step) {
      for (let x = step / 2; x < 900; x += step) {
        const wave = 0.5 + 0.5 * Math.sin((x / 900) * Math.PI * 3.2 + (y / 1200) * Math.PI * 2.1 + seed);
        const corner = 1 - Math.hypot(x - 760, y - 320) / 1200;
        const r = Math.max(1.5, 3 + 17 * wave * Math.max(0.25, corner));
        dots.push({ x, y, r });
      }
    }
    body = (
      <>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={fg} />
        ))}
        <rect x={0} y={566} width={900} height={7} fill={accent} />
        <rect x={0} y={594} width={900} height={2} fill={accent} opacity={0.6} />
        <rect x={0} y={1030} width={330} height={70} fill={accent} />
      </>
    );
  }

  if (variant === "waveform") {
    const count = 60;
    const w = 9;
    const gap = 5.8;
    const x0 = (900 - (count * w + (count - 1) * gap)) / 2;
    const bars = Array.from({ length: count }, (_, i) => {
      const env = Math.sin((i / (count - 1)) * Math.PI);
      const h = (110 + 760 * env * (0.3 + 0.7 * rnd())) * (rnd() > 0.93 ? 1.25 : 1);
      return { h, accent: rnd() > 0.78 };
    });
    body = (
      <>
        <line x1={40} x2={860} y1={600} y2={600} stroke={fg} strokeWidth={1} opacity={0.35} />
        {bars.map((b, i) => (
          <rect
            key={i}
            x={x0 + i * (w + gap)}
            y={600 - b.h / 2}
            width={w}
            height={b.h}
            fill={b.accent ? fg : accent}
            opacity={b.accent ? 0.5 : 1}
          />
        ))}
        <circle cx={450} cy={600} r={132} fill="none" stroke={fg} strokeWidth={2} opacity={0.5} />
        <circle cx={450} cy={600} r={144} fill="none" stroke={fg} strokeWidth={1} opacity={0.3} />
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1={60 + i * 72}
            x2={60 + i * 72}
            y1={1090}
            y2={i % 3 === 0 ? 1150 : 1120}
            stroke={fg}
            strokeWidth={2}
            opacity={0.55}
          />
        ))}
      </>
    );
  }

  if (variant === "contour") {
    const cx = 450;
    const cy = 540;
    const rings = Array.from({ length: 11 }, (_, k) => {
      const base = 52 + k * 54;
      const pts: string[] = [];
      const steps = 96;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const wobble =
          Math.sin(a * 3 + k * 1.9 + seed) * 30 +
          Math.cos(a * 5 - k * 1.3 + seed * 2) * 16 +
          Math.sin(a * 2 + k) * 22;
        const r = base + wobble * (0.35 + k * 0.06);
        pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r * 0.92).toFixed(1)}`);
      }
      return { pts: pts.join(" "), major: k === 4 || k === 9 };
    });
    body = (
      <>
        {rings.map((r, i) => (
          <polygon
            key={i}
            points={r.pts}
            fill="none"
            stroke={r.major ? accent : fg}
            strokeWidth={r.major ? 4 : 1.4}
            opacity={r.major ? 1 : 0.55}
          />
        ))}
        <line x1={40} x2={860} y1={1060} y2={1060} stroke={fg} strokeWidth={1} opacity={0.5} />
        <text
          x={44}
          y={1106}
          fill={fg}
          opacity={0.8}
          style={{ fontFamily: "var(--f-mono)", fontSize: "22px", letterSpacing: "6px" }}
        >
          23.2599 N / 77.4126 E
        </text>
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 900 1200"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${className}`}
      aria-hidden
      focusable="false"
    >
      <defs>
        <radialGradient id={vid} cx="50%" cy="45%" r="75%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
      </defs>
      <rect width="900" height="1200" fill={bg} />
      {body}
      <rect width="900" height="1200" fill={`url(#${vid})`} />
    </svg>
  );
}
