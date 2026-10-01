import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import EmptyState from "@/components/empty-state";
import PublicationBrowser from "@/components/publication-browser";
import { getPublications } from "@/lib/db";

export const metadata: Metadata = {
  title: "Publications — A literary archive",
  description:
    "Publications by Tashpreet Kaur — a literary archive of written work, searchable and filterable.",
};

export default async function PublicationsPage() {
  const publications = await getPublications(true);

  return (
    <>
      <PageHero number="004" title="Publications" note="A literary archive">
        The written record. Papers, articles, and essays — each one a finding shared with
        the world, catalogued and cross-referenced.
      </PageHero>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        {publications.length === 0 ? (
          <EmptyState
            number="00"
            title="The first page is blank"
            note="No publications yet. The first entry will appear here when the work is ready to share."
          />
        ) : (
          <PublicationBrowser publications={publications} />
        )}
      </section>
    </>
  );
}
