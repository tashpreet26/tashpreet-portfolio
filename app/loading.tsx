export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <span className="animate-pulse-soft font-mono text-[11px] uppercase tracking-[0.4em] text-accent dark:text-ember">
        Opening the archive
      </span>
      <span className="block h-10 w-px animate-scroll-line bg-accent dark:bg-ember" />
    </div>
  );
}
