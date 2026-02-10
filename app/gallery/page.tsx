/*
 * art.mrzzy.co
 * Pages
 * Gallery
 */

import Gallery from "@/components/gallery/gallery";
import { METADATA } from "@/lib/meta";
import { parseArt } from "@/lib/parsing";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  ...METADATA,
  title: "zzy Art: Gallery",
  description:
    "Gallery of Watercolor paintings by Singaporean Artist Zhu Zhanyan. Available for purchase.",
};

/**
 * Renders the Gallery Page.
 */
export default async function GalleryPage() {
  const pieces = await parseArt();
  // sort art in descending order of the date it was made in place
  pieces.sort((a, b) => b.madeOn.getTime() - a.madeOn.getTime());

  return (
    <main className="md:my-12">
      <Suspense>
        <Gallery pieces={pieces} />
      </Suspense>
    </main>
  );
}
