import type LocomotiveScroll from "locomotive-scroll";

/**
 * The site's smooth-scroll instance lives here so nobody has to lift it into
 * React context: SmoothScroll registers it, the preloader locks it, the
 * case-study overlay stops it while it is open, the footer scrolls it home.
 */
let instance: LocomotiveScroll | null = null;
let locks = 0;

/** Native fallback for everyone with reduced motion (no instance at all). */
function sync() {
  const locked = locks > 0;

  if (!instance) {
    document.body.style.overflow = locked ? "hidden" : "";
    return;
  }

  document.body.style.overflow = "";
  if (locked) instance.stop();
  else instance.start();
}

export function registerSmoothScroll(next: LocomotiveScroll | null) {
  instance = next;
  sync();
}

export function getSmoothScroll() {
  return instance;
}

/** Reference-counted so the preloader and the overlay can lock together. */
export function lockScroll() {
  locks += 1;
  sync();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  sync();
}

/** Back to the top — smoothed when Locomotive is driving, native otherwise. */
export function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (instance) {
    instance.scrollTo(0, reduce ? { immediate: true } : { duration: 1.1 });
    return;
  }

  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
