/*
 * art.mrzzy.co
 * UI Components
 * Image
 */

"use client";

import ExportedImage from "next-image-export-optimizer";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders an smoothly image at the given path under images.
 * Wrapper around ExportedImage to provide smooth pop in image on load.
 * @param props Additional props are the same for ExportedImage.
 */
export default function SmoothImage(props: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <ExportedImage
      {...props}
      className={cn(
        props.className,
        "transition-opacity",
        isLoaded ? "opacity-1" : "opacity-0",
      )}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
