import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Screen wrapper: directional slide between routes.
 * Nav links tag themselves `nav-forward`, the monogram/home link uses
 * `nav-back` — browser back/forward (no type) swaps instantly.
 */
export default function Screen({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
