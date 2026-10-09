export const OPEN_CASE = "tk:open-case";

/** Open a full-screen case study without lifting state into the (server) page. */
export function openCase(slug: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CASE, { detail: slug }));
}
