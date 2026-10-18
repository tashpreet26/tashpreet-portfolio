import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Screen from "@/components/Screen";
import WorkIndex from "@/components/WorkIndex";
import { projects } from "@/lib/content";

const count = String(projects.length).padStart(2, "0");

export const metadata: Metadata = {
  title: "Work",
  description: `Selected work by Tashpreet Kaur — service design, ERP systems and design-thinking programmes. ${projects.length} projects, ${projects.length} art directions, every one opens full-screen.`,
};

export default function WorkPage() {
  return (
    <Screen>
      <main id="main">
        <PageHead
          crumb="Work"
          note={`Index — ${count} projects`}
          title="Work"
          sub="Nothing here is a thumbnail. Click anything — every project opens full-screen."
        />
        <WorkIndex />
      </main>
    </Screen>
  );
}
