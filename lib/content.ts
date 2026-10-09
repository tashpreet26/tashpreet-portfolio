export type ArtVariant =
  | "rings"
  | "specimen"
  | "grid"
  | "halftone"
  | "waveform"
  | "contour"
  | "bust";

export type Plate = { variant: ArtVariant; caption: string; seed?: number };

export type Project = {
  slug: string;
  index: number;
  title: string;
  discipline: string;
  year: string;
  client: string;
  role: string;
  statement: string;
  body: string;
  quote: string;
  outcome: string;
  meta: { label: string; value: string }[];
  palette: { bg: string; fg: string; accent: string };
  art: ArtVariant;
  seed?: number;
  plates: Plate[];
  tags: string[];
  /** small line that appears under the title in the gallery */
  line: string;
};

export const projects: Project[] = [
  {
    slug: "monsoon-radio",
    index: 1,
    title: "Monsoon Radio",
    discipline: "Interactive / Editorial",
    year: "2025",
    client: "Independent release",
    role: "Art direction, design, build",
    line: "A season of field recordings, archived like weather.",
    statement:
      "An online archive for a season of field recordings made across one city — rain on tin, traffic at 2 a.m., a lake that never quite sleeps.",
    body: "The brief was a page. The problem was atmosphere: how do you make a list of audio files feel like standing under a covered stop while the road turns to river. The system borrows from radio sheets and tide charts — rigid grids, dense metadata, one colour used like a signal flare. Everything else gets out of the way of the sound.",
    quote: "If the interface is louder than the recording, the interface is wrong.",
    outcome:
      "Launched as a self-initiated release; 40 recordings, one continuous scroll, zero stock imagery.",
    meta: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Art direction, design, front-end" },
      { label: "Discipline", value: "Interactive, editorial" },
      { label: "Output", value: "Web archive, print index" },
    ],
    palette: { bg: "#1f31d8", fg: "#e9e3d6", accent: "#c9f23a" },
    art: "rings",
    plates: [
      { variant: "rings", caption: "Index sheet — recordings 01–14", seed: 3 },
      { variant: "halftone", caption: "Waveform plates, printed at A2", seed: 7 },
      { variant: "grid", caption: "Grid study: metadata as texture", seed: 2 },
    ],
    tags: ["Web", "Type system", "Sound", "Archive"],
  },
  {
    slug: "chowk",
    index: 2,
    title: "Chowk",
    discipline: "Type & Wayfinding",
    year: "2025",
    client: "Self-initiated",
    role: "Research, drawing, art direction",
    line: "A typeface drawn from shutters, signs and things about to be painted over.",
    statement:
      "A type study drawn from hand-painted shutters and fading signage in the old city — recorded before the painters come back with something newer.",
    body: "Two winters of walking the same six streets with a camera and a notebook, photographing signboards at eye level. The alphabet that came out of it keeps the tremor of the brush: uneven joins, heavy downstrokes, counters that close up when the sign is small. It is a display face, not a polite one.",
    quote: "A city writes itself on its shutters. Somebody should keep a copy.",
    outcome:
      "A 62-glyph display alphabet, a specimen booklet of 48 pages, and a wall of rubbings that the studio still uses as a moodboard.",
    meta: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Research, type design, editorial" },
      { label: "Discipline", value: "Type, print" },
      { label: "Output", value: "Display alphabet, specimen" },
    ],
    palette: { bg: "#4c1220", fg: "#e9e3d6", accent: "#b4afa5" },
    art: "specimen",
    seed: 5,
    plates: [
      { variant: "specimen", caption: "Specimen — caps and closed counters", seed: 11 },
      { variant: "contour", caption: "Field rubbings, old city", seed: 4 },
      { variant: "halftone", caption: "Photographic reference, 35mm", seed: 9 },
    ],
    tags: ["Type design", "Research", "Print", "Bhopal"],
  },
  {
    slug: "neem",
    index: 3,
    title: "Neem",
    discipline: "Brand Identity",
    year: "2024",
    client: "Neem — small-batch skincare",
    role: "Identity, packaging, art direction",
    line: "A skincare identity that refuses to whisper.",
    statement:
      "Identity for a small-batch skincare label that wanted to look like a pharmacy from the future, not a wedding invitation.",
    body: "The category defaults to soft focus. We went the other way: a strict modular grid, a wordmark set tight and unsentimental, and colour pulled from the ingredients list rather than the moodboard. Packaging carries the information hierarchy on the front — percentages, batch, date — because the customer actually reads them.",
    quote: "Feminine does not mean quiet. It means it was decided on purpose.",
    outcome:
      "Full identity system, 11 SKUs of packaging, launch art direction and a photography manual the founders can use without me.",
    meta: [
      { label: "Year", value: "2024" },
      { label: "Role", value: "Design lead" },
      { label: "Discipline", value: "Identity, packaging" },
      { label: "Output", value: "Brand system, 11 SKUs" },
    ],
    palette: { bg: "#4d5730", fg: "#e9e3d6", accent: "#c9f23a" },
    art: "grid",
    seed: 6,
    plates: [
      { variant: "grid", caption: "Modular grid — label system", seed: 12 },
      { variant: "specimen", caption: "Wordmark, tight and unsentimental", seed: 8 },
      { variant: "rings", caption: "Ingredient studies", seed: 1 },
    ],
    tags: ["Identity", "Packaging", "Photography"],
  },
  {
    slug: "salt-index",
    index: 4,
    title: "Salt Index",
    discipline: "Publication Design",
    year: "2024",
    client: "Salt Press",
    role: "Editorial design, image editing",
    line: "An annual that behaves like a database and reads like a magazine.",
    statement:
      "An annual that had to hold 200 pages of essays, data and photography without turning into either a spreadsheet or a coffee-table apology.",
    body: "The solution was rhythm: alternating dense index pages, set in mono at a punishing size, against full-bleed photographic plates that get no caption until the turn. Colour is used as an indexing device — one oxidised red means 'you are in the data section', nothing else.",
    quote: "Editing is art direction with the serial numbers filed off.",
    outcome:
      "216 pages, two print runs, and a layout grammar the client has now reused for three subsequent titles.",
    meta: [
      { label: "Year", value: "2024" },
      { label: "Role", value: "Editorial design, image editing" },
      { label: "Discipline", value: "Print, editorial" },
      { label: "Output", value: "216-page annual" },
    ],
    palette: { bg: "#e2d9c7", fg: "#100e0c", accent: "#b5412b" },
    art: "halftone",
    seed: 4,
    plates: [
      { variant: "halftone", caption: "Index spread, mono at 7.5pt", seed: 14 },
      { variant: "waveform", caption: "Data plates — section opener", seed: 5 },
      { variant: "bust", caption: "Portrait plate, contributor page", seed: 3 },
    ],
    tags: ["Editorial", "Print", "Image editing"],
  },
  {
    slug: "taar",
    index: 5,
    title: "Taar",
    discipline: "Motion & Sound Identity",
    year: "2023",
    client: "Taar Records",
    role: "Identity, motion direction",
    line: "An identity that behaves like a struck string.",
    statement:
      "A moving identity for an independent label — one string, struck and left to decay, generating every frame the brand has ever shown.",
    body: "Instead of a logo file, the label got a rule: everything is drawn from the envelope of a plucked string. Titles, stingers, transitions and posters all read the same envelope at different speeds. It means a 16-year-old with a phone can make a Taar story and it will look correct.",
    quote: "Give people a rule, not a file. They will make better work than you.",
    outcome:
      "Motion system, sonic logo, and a 20-page rulebook. Two years on, the label still hasn't needed a redesign.",
    meta: [
      { label: "Year", value: "2023" },
      { label: "Role", value: "Identity, motion direction" },
      { label: "Discipline", value: "Motion, sound" },
      { label: "Output", value: "Motion system, sonic logo" },
    ],
    palette: { bg: "#100e0c", fg: "#c9f23a", accent: "#1f31d8" },
    art: "waveform",
    seed: 8,
    plates: [
      { variant: "waveform", caption: "Envelope — every title is one pluck", seed: 15 },
      { variant: "rings", caption: "Decay field, still frame", seed: 6 },
      { variant: "specimen", caption: "Poster series, screenprint", seed: 10 },
    ],
    tags: ["Motion", "Sound", "Identity"],
  },
  {
    slug: "apni-jagah",
    index: 6,
    title: "Apni Jagah",
    discipline: "Exhibition & Photography",
    year: "2023",
    client: "Bhopal Art Room",
    role: "Curation, art direction, print",
    line: "Photographs about belonging to a place you keep leaving.",
    statement:
      "A small exhibition about a city people leave and return to — curated from 900 negatives, hung without a single wall label on the front wall.",
    body: "The hang is the design: prints grouped by light rather than subject, so the room moves from morning to sodium evening as you walk it. The catalogue repeats the logic as a gradient of paper stocks. Type only appears once you are already inside.",
    quote: "Belonging is a lighting condition, not an address.",
    outcome:
      "34 prints, a 72-page catalogue on three papers, and a wall of visitor notes that the gallery kept after the show came down.",
    meta: [
      { label: "Year", value: "2023" },
      { label: "Role", value: "Curation, art direction" },
      { label: "Discipline", value: "Exhibition, print" },
      { label: "Output", value: "34 prints, 72-page catalogue" },
    ],
    palette: { bg: "#b5412b", fg: "#100e0c", accent: "#e9e3d6" },
    art: "contour",
    seed: 2,
    plates: [
      { variant: "contour", caption: "Hang study — grouped by light", seed: 13 },
      { variant: "bust", caption: "Plate 19, silver gelatin", seed: 5 },
      { variant: "halftone", caption: "Catalogue — three paper stocks", seed: 16 },
    ],
    tags: ["Exhibition", "Photography", "Print"],
  },
];

export const currentlyObsessed = [
  { label: "Visual culture", detail: "shop signage, packaging, the backs of buses" },
  { label: "Typography", detail: "tight kerning, loose brushwork, closed counters" },
  { label: "Film photography", detail: "expired rolls, one body, no light meter" },
  { label: "Cinema", detail: "long takes, working-class interiors, late Subbarai" },
  { label: "Weird internet corners", detail: "archived GeoCities, dead link energy" },
  { label: "Music at 2 a.m.", detail: "hindustani classical into broken electronic" },
  { label: "Second-hand books", detail: "marginalia left by strangers, all of it" },
  { label: "Leaving things alone", detail: "the hardest discipline there is" },
];

export const obsessionChatter = [
  "rerendering the logo for the 400th time",
  "kerning by eye, apologising to no one",
  "collecting receipts as typography",
  "one more pass on the 7.5pt",
  "photographing shutters again",
  "pretending this is research",
  "arguing with a colour swatch",
  "leaving the good idea for tomorrow",
];

export const paletteSwatches = [
  { name: "Lake haze", hex: "#b4afa5" },
  { name: "Shutter oxide", hex: "#b5412b" },
  { name: "Monsoon moss", hex: "#4d5730" },
  { name: "Concrete dust", hex: "#e2d9c7" },
  { name: "Signal acid", hex: "#c9f23a" },
];

export const contactLinks = [
  { label: "Email", value: "hello@tashpreetkaur.studio", href: "mailto:hello@tashpreetkaur.studio" },
  { label: "Instagram", value: "@tashpreet.kaur", href: "https://instagram.com" },
  { label: "LinkedIn", value: "in/tashpreetkaur", href: "https://linkedin.com" },
  { label: "Behance", value: "behance.net/tashpreetkaur", href: "https://behance.net" },
];
