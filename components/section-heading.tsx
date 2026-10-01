import Reveal from "./reveal";

interface SectionHeadingProps {
  number: string;
  title: string;
  note?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  number,
  title,
  note,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center" : ""}>
      <Reveal>
        <div
          className={`flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember ${
            centered ? "justify-center" : ""
          }`}
        >
          <span>{number}</span>
          <span className="h-px flex-1 bg-line" />
          {note && <span className="text-muted">{note}</span>}
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight text-ink dark:text-bone sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
