"use client";

import { useState } from "react";
import LoadingScreen from "./loading-screen";

/**
 * Gates the entire page behind the opening ceremony.
 * Server components pass their rendered tree through as children;
 * the gate simply withholds it until the unsealing completes.
 */
export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  if (!done) {
    return <LoadingScreen onDone={() => setDone(true)} />;
  }
  return <>{children}</>;
}
