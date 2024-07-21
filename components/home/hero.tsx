/*
 * art.mrzzy.co
 * UI Components
 * Homepage
 */

"use client";

import { Art, Orientation } from "@/lib/models";
import { useOrientation, useWindowSize } from "@uidotdev/usehooks";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { NavItem } from "../navigation/navitem";

/**
 * Hero features a random featured art piece given user device orientation.
 * @param props.featured List of featured art pieces
 */
export default function Hero(props: { featured: Art[] }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [random, _] = useState(Math.random());

  const { type } = useOrientation();
  const window = useWindowSize();
  const winWidth = window.width || 1280;
  const winHeight = window.height || 1080;

  // compute dimensions of hero image
  const orientation =
    type.split("-")[0] === "portrait"
      ? Orientation.Vertical
      : Orientation.Horizontal;

  const imgWidth =
    orientation == Orientation.Horizontal ? winWidth * 0.72 : winWidth;
  const imgHeight =
    orientation == Orientation.Vertical ? winHeight * 0.72 : winHeight;

  // filter pieces based on current screen orientation
  const aligned = props.featured.filter(
    (art) => art.orientation === orientation,
  );

  // check we have matching ,pieces to show
  if (aligned.length <= 0) {
    throw new Error(
      "No featured painting matching orientation to show on the homepage",
    );
  }

  // pick random featured painting to show
  const index = Math.floor(random * aligned.length);
  const { image, height, width, madeOn, title, medium } = aligned[index];
  const heightLimit =
    orientation == Orientation.Horizontal ? "max-h-[72vh]" : "";
  const hero = isClient ? (
    <ExportedImage
      className={`object-scale-down ${heightLimit}`}
      src={`/images${image}`}
      alt={title}
      width={imgWidth}
      height={imgHeight}
    />
  ) : (
    <Skeleton className={`w-[80vmin] h-[80vmin] ${heightLimit}`} />
  );
  const header = isClient ? (
    <h1 className="font-serif font-bold text-4xl ">{title}</h1>
  ) : (
    <Skeleton className="h-12 w-80 rounded-full" />
  );
  const metadata = (
    <div
      className={`text-sm my-2 justify-self-start ${isClient ? "" : "space-y-2"}`}
    >
      {isClient ? (
        <p>
          {height}mm x {width} mm
        </p>
      ) : (
        <Skeleton className="h-6 w-40 rounded-full" />
      )}
      {isClient ? (
        <p>{medium}</p>
      ) : (
        <Skeleton className="h-6 w-64 rounded-full" />
      )}
      {isClient ? (
        <p>{madeOn.getUTCFullYear()}</p>
      ) : (
        <Skeleton className="h-6 w-10 rounded-full" />
      )}
    </div>
  );

  return (
    <section className="flex flex-col md:flex-row md:items-center">
      {hero}
      <div className="m-6 space-y-6">
        {header}
        {metadata}
        <Link className={`${buttonVariants()} rounded-none !font-bold`} href={NavItem.Work}>View Work &gt; </Link>
      </div>
    </section>
  );
}
