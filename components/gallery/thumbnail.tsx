/*
 * art.mrzzy.co
 * UI components
 * Gallery Thumbnail
 */

"use client";

import { Art, Orientation } from "@/lib/models";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { aspect } from "@/lib/utils";
import { ZoomIn } from "lucide-react";
import SmoothImage from "@/components/ui/smooth-image"

/**
 * Render a gallery thumbnail for the given art piece.
 * @param props.art Art piece to render in the gallery thumbnail
 *
 */
export default function Thumbnail(props: { art: Art, onClick: () => void}) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { orientation, image, title, width, height } = props.art;

  const colWidth = 640;
  const colSpan = orientation === Orientation.Horizontal ? 2 : 1;
  const imgWidth =
    (orientation === Orientation.Horizontal ? colSpan : 1) * colWidth;
  const imgHeight = imgWidth / aspect(width, height);
  return (
    <div className={`group col-span-${colSpan} relative`} onClick={props.onClick}>
      {isClient ? (
        <SmoothImage
          className={`object-cover group-hover:brightness-75 group-active:brightness-50 h-full`}
          src={`/images${image}`}
          alt={title}
          height={imgWidth}
          width={imgHeight}
        />
      ) : (
        <Skeleton className="h-[50vh]" />
      )}
      <ZoomIn
        size={40}
        className="invisible group-hover:visible group-active:brightness-50 text-white absolute bottom-[48%] left-[48%]"
      />
    </div>
  );
}
