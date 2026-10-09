import type { Metadata } from "next";
import Bhopal from "@/components/Bhopal";
import Manifesto from "@/components/Manifesto";
import PageHead from "@/components/PageHead";
import Personality from "@/components/Personality";
import Screen from "@/components/Screen";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tashpreet Kaur — designer and art director in Bhopal, India. The person behind the work, the obsessions, and the city that shaped the eye.",
};

export default function AboutPage() {
  return (
    <Screen>
      <main id="main">
        <PageHead
          crumb="About"
          note="Bhopal, India — IST (UTC+5:30)"
          title="About"
          sub="Designer, art director, chronic over-editor. The portrait, the words, the receipts — in that order."
        />
        <Manifesto />
        <Personality />
        <Bhopal />
      </main>
    </Screen>
  );
}
