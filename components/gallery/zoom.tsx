/*
 * art.mrzzy.co
 * UI components
 * Gallery Zoom View
 */

"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Art, Status } from "@/lib/models";
import ExportedImage from "next-image-export-optimizer";
import zzyLogo from "@/public/images/icons/art_mrzzy_co_logo-white.svg";
import { useWindowSize } from "@uidotdev/usehooks";
import Metadata from "@/components/ui/art-metadata";
import SmoothImage from "@/components/ui/smooth-image";
import { buttonVariants } from "../ui/button";
import Contact from "../ui/contact";

/**
 * Renders a zoom view popup of the given Art piece
 * @param props.art Art piece to render in the zoom view
 * @param props.onClose Callback called when the dialog box closes
 */
export default function ZoomView(props: { art: Art; onClose: () => void }) {
  const { image, title, listPrice, status } = props.art;
  const isAvailable = status === Status.Available;
  const { width, height } = useWindowSize();

  let statusText = "Unavailable";
  switch (status) {
    case Status.Sold:
      statusText = "Sold";
      break;
    case Status.Private:
      statusText = "Private Collection";
      break;
    case Status.Available:
      statusText = "Available";
      break;
    case Status.Exhibiting:
      statusText = "Exhibiting";
  }

  // render sales info for when painting is available
  const salesInfo = (
    <>
      <span className="justify-self-end text-lg">S$${listPrice}</span>
      <Contact
        trigger="Inquire"
        dark={true}
        triggerClassName={`${buttonVariants()} justify-self-end round bg-green hover:!bg-darkGreen`}
      ></Contact>
    </>
  );
  // render painting status if otherwise not available
  const statusInfo = (
    <span className="justify-self-end font-bold text-slate-400">
      {statusText}
    </span>
  );

  return (
    <Dialog defaultOpen={true}>
      <DialogContent
        className="bg-black text-white flex flex-col"
        onCloseAutoFocus={props.onClose}
      >
        <ExportedImage src={zzyLogo} alt="Home" />
        <SmoothImage
          src={`/images${image}`}
          className="object-contain flex-1 max-h-[74vh]"
          alt={title}
          width={width || 1280}
          height={height || 1080}
        />
        <div className="flex flex-row items-center mt-4 gap-x-4">
          <Metadata art={props.art} />
          <div className="grow"></div>
          {isAvailable ? salesInfo : statusInfo}
        </div>
      </DialogContent>
    </Dialog>
  );
}
