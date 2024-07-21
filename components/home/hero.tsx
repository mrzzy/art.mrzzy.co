/*
 * art.mrzzy.co
 * UI Components
 * Homepage
 */

"use client";

import { Art, Orientation } from "@/lib/models";
import { useOrientation, useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { NavItem } from "../navigation/navitem";
import SmoothImage from "@/components/ui/smooth-image";
import Metadata from "@/components/ui/art-metadata";

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

  // pick random featured art piece to show
  const art = aligned[Math.floor(random * aligned.length)];
  const { image, title } = art;
  const heightLimit =
    orientation == Orientation.Horizontal ? "max-h-[72vh]" : "";

  // art image
  const hero = isClient ? (
    <SmoothImage
      src={`/images${image}`}
      className={`object-contain ${heightLimit}`}
      alt={title}
      width={winWidth}
      height={winHeight}
    />
  ) : (
    <Skeleton className={`md:m-12 w-[80vmin] h-[80vmin] ${heightLimit}`} />
  );

  // art metadata skeleton
  const metaSkeleton = (
    <div>
      <Skeleton className="h-12 w-80 rounded-full" />
      <div
        className={`text-sm my-2 justify-self-start ${isClient ? "" : "space-y-2"}`}
      >
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="h-6 w-64 rounded-full" />
        <Skeleton className="h-6 w-10 rounded-full" />
      </div>
    </div>
  );

  return (
    <section className="flex flex-col md:flex-row md:items-center">
      {hero}
      <div className="m-6 space-y-6 min-w-[30vw]">
        {isClient ? <Metadata art={art} />: metaSkeleton}
        <Link
          className={`${buttonVariants()} rounded-none !font-bold`}
          href={NavItem.Gallery}
        >
          View Work &gt;{" "}
        </Link>
      </div>
    </section>
  );
}
