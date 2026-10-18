/**
 * CONTENT — everything here is placeholder copy.
 * Swap names, clients, links, years and outcomes for real ones before launch.
 * Counts elsewhere (home rail, /work index, case study) derive from `projects.length`.
 */

export type ArtVariant =
  | "rings"
  | "specimen"
  | "grid"
  | "halftone"
  | "waveform"
  | "contour";

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
    slug: "service-design",
    index: 1,
    title: "Service Design",
    discipline: "Service Design / Systems",
    year: "2025",
    client: "Practice-led — multiple engagements",
    role: "Service design, research, facilitation",
    line: "Services designed end to end — front stage, back stage and the seams in between.",
    statement:
      "A practice-led body of service work: blueprinting how people, systems and paperwork actually move through an organisation, from first enquiry to final receipt.",
    body: "Every engagement starts on the floor, not in a canvas — service safaris, interviews, and shadowing the people doing the unglamorous work. Then a blueprint that puts front stage and back stage on the same sheet: what a person sees, what a team does, and what the system quietly refuses to do. Journeys get quantified, failure points get named, and the fix usually lands on operations long before it lands on the interface.",
    quote: "Most service problems are not design problems. They are seams nobody was paid to own.",
    outcome:
      "Three service blueprints in production, twelve co-creation workshops, and an operations team that now keeps the map alive without me.",
    meta: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Service design, research, facilitation" },
      { label: "Discipline", value: "Service design, systems" },
      { label: "Output", value: "Blueprints, journeys, workshops" },
    ],
    palette: { bg: "#4d5730", fg: "#e9e3d6", accent: "#4c1220" },
    art: "contour",
    seed: 11,
    plates: [
      { variant: "contour", caption: "Service blueprint — front stage and back stage, one sheet", seed: 4 },
      { variant: "grid", caption: "Front stage / back stage, mapped cell by cell", seed: 12 },
      { variant: "rings", caption: "Touchpoint map — every handshake on one page", seed: 6 },
    ],
    tags: ["Service design", "Blueprints", "Research", "Facilitation"],
  },
  {
    slug: "ums-erp",
    index: 2,
    title: "UMS",
    discipline: "Service Design / ERP",
    year: "2025",
    client: "UMS — enterprise resource planning suite",
    role: "Service design, research, product design",
    line: "An ERP designed end to end — service design, research and design thinking.",
    statement:
      "End-to-end redesign of UMS, an ERP where every module had been built by a different team and no one had ever drawn the whole journey on one sheet.",
    body: "Worked the full design-thinking loop: field interviews with admins, finance and faculty, an affinity map of 140 pain points, then a service blueprint that finally showed where the seams were. From there — personas, journey maps, an information architecture that collapsed nine dashboards into one task-based home, and a component system shipped alongside the engineers. The design work is the diagrams as much as the screens: the blueprint was the artefact that changed the roadmap.",
    quote: "Nobody hates a database. They hate the four screens you have to visit before it.",
    outcome:
      "One blueprint replacing nine module silos, a 40-component library in production, and a onboarding flow cut from 22 steps to 6.",
    meta: [
      { label: "Year", value: "2025" },
      { label: "Role", value: "Service design, product design" },
      { label: "Discipline", value: "Service design, ERP" },
      { label: "Output", value: "Blueprint, IA, design system" },
    ],
    palette: { bg: "#e9e3d6", fg: "#100e0c", accent: "#4d5730" },
    art: "grid",
    seed: 9,
    plates: [
      { variant: "grid", caption: "Task-based home — nine dashboards, one front door", seed: 5 },
      { variant: "contour", caption: "Service blueprint, admin to finance", seed: 11 },
      { variant: "specimen", caption: "Component library, 40 pieces", seed: 2 },
    ],
    tags: ["Service design", "Design thinking", "ERP", "Design system"],
  },
  {
    slug: "design-thinking",
    index: 3,
    title: "Design Thinking",
    discipline: "Design Thinking / Facilitation",
    year: "2024",
    client: "Workshops and internal programmes",
    role: "Facilitation, research, prototyping",
    line: "The messy middle, documented — from empathy to prototype to shipped.",
    statement:
      "A workshop-to-ship programme that took design thinking out of sticky-note theatre and into the roadmap.",
    body: "Runs the whole loop in the open: empathy interviews, how-might-we reframes, a wall of bad ideas kept on purpose, low-fidelity prototypes tested with five people, then a decision — build, kill, or learn again. Everything is documented as it happens, so a team watches its own thinking instead of being told about it afterwards. The output is rarely a deck. It is a decision someone can defend.",
    quote: "Design thinking is not a diagram. It is the habit of arguing with your own first idea.",
    outcome:
      "Eighteen workshops across four teams, six prototypes shipped, and a playbook those teams now run themselves.",
    meta: [
      { label: "Year", value: "2024" },
      { label: "Role", value: "Facilitation, research, prototyping" },
      { label: "Discipline", value: "Design thinking, process" },
      { label: "Output", value: "Workshops, prototypes, playbook" },
    ],
    palette: { bg: "#4c1220", fg: "#e9e3d6", accent: "#4d5730" },
    art: "specimen",
    seed: 5,
    plates: [
      { variant: "specimen", caption: "Double diamond, drawn on the wall", seed: 14 },
      { variant: "waveform", caption: "Sprint timeline — five days, one decision", seed: 8 },
      { variant: "halftone", caption: "Wall of sticky notes, kept deliberately", seed: 3 },
    ],
    tags: ["Design thinking", "Facilitation", "Prototyping", "Research"],
  },
];

export const currentlyObsessed = [
  { label: "Service blueprints", detail: "front stage, back stage, and the seams between" },
  { label: "Design thinking", detail: "the messy middle, kept messy on purpose" },
  { label: "Systems that hold", detail: "components, rules, naming that survives handover" },
  { label: "Typography", detail: "tight kerning, loose brushwork, closed counters" },
  { label: "Field research", detail: "interviews, shadowing, the unglamorous work" },
  { label: "Weird internet corners", detail: "archived GeoCities, dead link energy" },
  { label: "Second-hand books", detail: "marginalia left by strangers, all of it" },
  { label: "Leaving things alone", detail: "the hardest discipline there is" },
];

export const obsessionChatter = [
  "rerendering the flow for the 400th time",
  "naming the seam nobody owns",
  "collecting receipts as typography",
  "one more pass on the blueprint",
  "photographing shutters again",
  "pretending this is research",
  "arguing with a colour swatch",
  "leaving the good idea for tomorrow",
];

export const paletteSwatches = [
  { name: "Studio ink", hex: "#100e0c" },
  { name: "Shutter burgundy", hex: "#4c1220" },
  { name: "Monsoon moss", hex: "#4d5730" },
  { name: "Warm ivory", hex: "#e9e3d6" },
];

export const contactLinks = [
  { label: "Email", value: "hello@tashpreetkaur.studio", href: "mailto:hello@tashpreetkaur.studio" },
  { label: "Instagram", value: "@tashpreet.kaur", href: "https://instagram.com" },
  { label: "LinkedIn", value: "in/tashpreetkaur", href: "https://linkedin.com" },
  { label: "Behance", value: "behance.net/tashpreetkaur", href: "https://behance.net" },
];
