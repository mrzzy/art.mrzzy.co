/*
 * art.mrzzy.co
 * UI Components
 * Art Metadata
 */

import { Art } from "@/lib/models";

/**
 * Render the metadata for the given art piece
 * @param props.art Art piece to render metadata for.
 *
 */
export default function Metadata(props: { art: Art }) {
  // art title
  const { title, height, width, medium, madeOn } = props.art;
  return (
    <div>
      <h1 className="font-serif font-bold text-4xl ">{title}</h1>
      <div className="text-sm my-2 justify-self-start">
        <p>
          {height}mm x {width} mm
        </p>
        <p>{medium}</p>
        <p>{madeOn.getUTCFullYear()}</p>
      </div>
    </div>
  );
}
