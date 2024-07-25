/*
 * art.mrzzy.co
 * UI components
 * Gallery
 */

"use client";

import { Art } from "@/lib/models";
import Thumbnail from "./thumbnail";
import ZoomView from "./zoom";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Param } from "../navigation/navitem";

/**
 * Renders a scrollable gallery of thumbnail images of art pieces.
 * Displays a modal zoom view of an art piece if url parameter 'view=<ID>'
 * is set to id of the piece to show.
 * @param props.pieces List of Art pieces to render in the Art gallery.
 */
export default function Gallery(props: { pieces: Art[] }) {
  // show piece if set in 'view' url parameter
  const params = useSearchParams()
  const selected = props.pieces.find(({ id }) => id === params.get(Param.View));

  // gallery of thumbnail art pieces
  const [router, pathname] = [useRouter(), usePathname()];
  const images = props.pieces.map((art) => (
    <Thumbnail art={art} key={art.id} onClick={() => {
      // show piece on thumbnail click
      router.push(`${pathname}?${Param.View}=${art.id}`);
    }} />
  ));

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 m-8 items-stretch">
        {images}
      </section>

      {selected != null ? (
        <ZoomView art={selected} onClose={() => {
          router.back();
        }} />
      ) : (
        <></>
      )}
    </div>
  );
}
