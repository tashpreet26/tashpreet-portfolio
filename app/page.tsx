import CtaBand from "@/components/CtaBand";
import Hero from "@/components/Hero";
import Screen from "@/components/Screen";
import Statement from "@/components/Statement";
import Ticker from "@/components/Ticker";
import Work from "@/components/Work";

const TICKER = [
  "Bhopal / India",
  "Made somewhere between chaos & calm",
  "Identity",
  "Editorial",
  "Motion",
  "Art direction",
  "Available for 2026",
];

export default function Home() {
  return (
    <Screen>
      <main id="main">
        <Hero />
        <Ticker items={TICKER} />
        <Statement />
        <Work />
        <CtaBand />
      </main>
    </Screen>
  );
}
