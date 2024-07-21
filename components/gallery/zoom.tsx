/*
 * art.mrzzy.co
 * UI components
 * Gallery Zoom View
 */

"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { Art } from "@/lib/models";
import ExportedImage from "next-image-export-optimizer";
import zzyLogo from "@/public/images/icons/art_mrzzy_co_logo-white.svg";
import { useWindowSize } from "@uidotdev/usehooks";
import Metadata from "@/components/ui/art-metadata";
import SmoothImage from "@/components/ui/smooth-image";

/**
 * Renders a zoom view popup of the given Art piece
 * @param props.art Art piece to render in the zoom view
 * @param props.onClose Callback called when the dialog box closes
 */
export default function ZoomView(props: { art: Art, onClose: () => void }) {
  const { image, title } = props.art;
  const { width, height } = useWindowSize();

  return (
    <Dialog modal={false} defaultOpen={true}>
      <DialogContent className="bg-black text-white" onCloseAutoFocus={props.onClose}>
        <ExportedImage src={zzyLogo} alt="Home" />
        <SmoothImage
          src={`/images${image}`}
          className={`object-contain max-h-[80vh]`}
          alt={title}
          width={width || 1280}
          height={height || 1080}
        />
        <Metadata art={props.art} />
      </DialogContent>
    </Dialog>
  );
}
