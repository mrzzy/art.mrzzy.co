/*
 * art.mrzzy.co
 * Pages
 * Homepage
 */

import Hero from "@/components/home/hero";
import { parseArt } from "@/lib/parsing";

/**
 * Renders the Home Page.
 */
export default async function Home() {
  const featured = (await parseArt()).filter((art) => art.featured);

  return (
    <main className="md:my-8 pb-2">
      <Hero featured={featured} />
    </main>
  );
}
