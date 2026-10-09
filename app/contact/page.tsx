import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Screen from "@/components/Screen";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's make something worth remembering — briefs, half-formed ideas and chai recommendations all welcome. hello@tashpreetkaur.studio",
};

export default function ContactPage() {
  return (
    <Screen>
      <main id="main">
        <Contact />
      </main>
    </Screen>
  );
}
