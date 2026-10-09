import localFont from "next/font/local";

/**
 * All fonts are self-hosted from ./fonts (downloaded once, no build-time network).
 *  - Archivo  : variable grotesk (weight 100-900, width 62-125) — condensed display + UI text
 *  - Anton    : single-weight condensed poster face — oversized hero type
 *  - Instrument Serif : expressive editorial serif (roman + italic) — statements, pull quotes
 *  - Space Mono : microcopy, metadata, coordinates, labels
 */
export const grotesk = localFont({
  src: [{ path: "./fonts/archivo-normal-100-900.woff2", weight: "100 900", style: "normal" }],
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  display: "swap",
  variable: "--f-grotesk",
});

export const serif = localFont({
  src: [
    { path: "./fonts/instrument-serif-normal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-italic-400.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
  variable: "--f-serif",
});

export const display = localFont({
  src: [{ path: "./fonts/anton-normal-400.woff2", weight: "400", style: "normal" }],
  display: "swap",
  variable: "--f-display",
});

export const mono = localFont({
  src: [
    { path: "./fonts/space-mono-normal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-normal-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--f-mono",
});

export const fontVariables = [grotesk.variable, serif.variable, display.variable, mono.variable].join(" ");
