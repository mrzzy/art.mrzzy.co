/*
 * art.mrzzy.co
 * Pages
 * Gallery
 */

import Gallery from "@/components/gallery/gallery";
import { parseArt } from "@/lib/parsing";

/**
 * Renders the Gallery Page.
 */
export default async function GalleryPage() {
  const pieces = (await parseArt())
    // sort art in descending order of the date it was made
    .sort((a, b) => b.madeOn.getTime() - a.madeOn.getTime());

  return (
    <main className="md:my-12">
      <Gallery pieces={pieces} />
    </main>
  );
}