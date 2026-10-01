import type { Metadata } from "next";
import MediaLibrary from "@/components/admin/media-library";
import { getMedia } from "@/lib/db";

export const metadata: Metadata = { title: "Media — Admin", robots: { index: false } };

export default async function MediaPage() {
  const media = await getMedia();
  return <MediaLibrary media={media} />;
}
