/*
 * art.mrzzy.co
 * UI Components
 * Image
 */

"use client";

import ExportedImage from "next-image-export-optimizer";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import { StaticImageData } from "next/image";

/**
 * Renders an smooth image at the given path under images.
 * Wrapper around ExportedImage to provide smooth pop in image on load,
 * rendering a skeleton while the image is loading to reduce layout shift.
 * @param props Additional props are the same for ExportedImage.
 */
export default function SmoothImage(props: {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  skeletonClassName?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const {skeletonClassName, ...imgProps} = props;
  return (
    <>
      <ExportedImage
        {...imgProps}
        className={cn(
          props.className,
          "transition-opacity",
          isLoaded ? "" : "size-0",
          isLoaded ? "opacity-1" : "opacity-0",
        )}
        onLoad={() => setIsLoaded(true)}
      />
      <Skeleton
        className={cn(props.skeletonClassName, isLoaded ? "hidden" : "block")}
      />
    </>
  );
}
