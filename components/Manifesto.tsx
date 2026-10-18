const DETAILS = [
  { label: "Based", value: "Bhopal, Madhya Pradesh" },
  { label: "Working across", value: "Service design, product systems, design thinking" },
  { label: "Listening", value: "Hindustani classical → broken electronic" },
  { label: "Reading", value: "Second-hand paperbacks, half-finished" },
  { label: "Fuel", value: "Adrak chai, three cups minimum" },
];

function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-reveal
          className={`inline-block ${className}`}
          style={{ marginRight: "0.22em", "--d": `${i * 0.055}s` } as React.CSSProperties}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export default function Manifesto() {
  return (
    <section
      id="about"
      data-nav-theme="dark"
      className="relative bg-ink px-5 pt-[14vh] pb-[12vh] text-bone md:px-8"
    >
      <div className="flex items-start justify-between micro">
        <span>01 — Profile</span>
        <span className="text-right opacity-60">The person behind the work</span>
      </div>

      <p className="mt-12 font-serif text-[clamp(2.4rem,7vw,7rem)] leading-[0.98] tight md:mt-16">
        <Words text="I make things that are" />
        <span
          tabIndex={0}
          data-reveal
          className="swap inline-block align-baseline"
          style={{ "--d": "0.4s" } as React.CSSProperties}
          aria-label="difficult"
        >
          <span className="swap-main inline-block" style={{ color: "var(--accent-soft)" }}>
            difficult
          </span>
          <span className="swap-alt inline-block italic" style={{ color: "var(--accent-soft)" }}>
            impossible
          </span>
        </span>
        <Words text="to ignore." />
      </p>

      <div className="mt-[10vh] grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 lg:col-span-7 lg:col-start-1">
          <div data-reveal className="max-w-[54ch] space-y-6 text-[clamp(1.05rem,1.35vw,1.3rem)] leading-relaxed text-bone/85">
            <p>
              I&apos;m Tashpreet — a designer working across service design, product
              systems and visual craft, from Bhopal. I care about the space between
              rigour and instinct: systems that hold, type that speaks, and journeys
              that stop failing at the fourth step.
            </p>
            <p>
              The last few years have been spent blueprinting how services and
              software actually behave for the people inside them — ERP platforms,
              internal tools, operations teams with too many tabs open. I like briefs
              that arrive as a question rather than an answer, and I will happily
              argue about a single millimetre of kerning.
            </p>
          </div>

          <dl className="mt-10 border-t border-bone/15">
            {DETAILS.map((d, i) => (
              <div
                key={d.label}
                data-reveal
                style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
                className="flex flex-col gap-1 border-b border-bone/15 py-3.5 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <dt className="micro opacity-55">{d.label}</dt>
                <dd className="font-serif text-[1.05rem] md:text-right">{d.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 micro opacity-45">
            psst — the T/K up top switches the palette. there are two.
          </p>
        </div>
      </div>
    </section>
  );
}
