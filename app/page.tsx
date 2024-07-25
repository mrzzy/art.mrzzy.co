/*
 * art.mrzzy.co
 * Pages
 * Homepage
 */

import Hero from "@/components/home/hero";
import { METADATA } from "@/lib/meta";
import { parseArt } from "@/lib/parsing";


import type { Metadata } from 'next'

export const metadata: Metadata = {
  ...METADATA,
  title: "zzy Art",
  description: "Watercolor paintings by Singaporean Artist Zhu Zhanyan. Available for purchase.",
}

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
