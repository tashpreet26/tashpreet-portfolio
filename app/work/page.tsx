import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Screen from "@/components/Screen";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Tashpreet Kaur — identity, editorial, motion and exhibition projects. Six projects, six art directions, every one opens full-screen.",
};

export default function WorkPage() {
  return (
    <Screen>
      <main id="main">
        <PageHead
          crumb="Work"
          note="Index — 06 projects"
          title="Work"
          sub="Nothing here is a thumbnail. Click anything — every project opens full-screen."
        />
        <WorkIndex />
      </main>
    </Screen>
  );
}
