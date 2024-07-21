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
    <main className="my-12">
      <Hero featured={featured} />
    </main>
  );
}
