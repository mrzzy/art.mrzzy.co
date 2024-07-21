/*
 * art.mrzzy.co
 * UI components
 * Gallery
 */

"use client";

import { Art } from "@/lib/models";
import { useState } from "react";
import Thumbnail from "./thumbnail";
import ZoomView from "./zoom";

/**
 * Renders a scrollable gallery of thumbnail images of art pieces.
 * Displays a modal zoom view of the piece if the user selects a thumbnail.
 * @param props.pieces List of Art pieces to render in the Art gallery.
 */
export default function Gallery(props: { pieces: Art[] }) {
  const [selected, setSelected] = useState<Art | null>(null);
  const images = props.pieces.map((art) => (
    <Thumbnail art={art} key={art.id} onClick={() => setSelected(art)} />
  ));
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 m-8 items-stretch">
        {images}
      </section>

      {selected != null ? (
        <ZoomView art={selected} onClose={() => setSelected(null)} />
      ) : (
        <></>
      )}
    </div>
  );
}
