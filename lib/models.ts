/*
 * art.mrzzy.co
 * Models
 */

/** Orientation of the Art piece upright. */
export enum Orientation {
  Vertical = "Vertical",
  Horizontal = "Horizontal",
}

/** Sales channel where the sale was made */
export enum Channel {
  Direct = "Direct",
  Instagram = "Instagram",
  Website = "Website",
}

/** Defines status states of the Art piece */
export enum Status {
  Available = "Available",
  Exhibiting = "Exhbiting",
  Sold = "Sold",
  Private = "Private", // private collection
  Missing = "Missing",
}

/** Art Sales information. */
export type Sale = {
  channel: Channel;
  soldOn: Date;
  price: string;
  boughtBy: string;
};

/** Art piece metadata. */
export type Art = {
  id: string;
  image: string;
  hidden: boolean;
  orientation: Orientation;
  height: number;
  width: number;
  madeOn: Date;
  title: string;
  medium: string;
  location: string;
  cost: string;
  listPrice: string;
  featured: boolean;
  status: Status;
  framingCost: string | null;
  sale: Sale | null;
  exhibited: string | null;
};

/* List of columns that require nonempty values in Art object */
export const ART_REQUIRED_COLS = [
  "id",
  "image",
  "hidden",
  "orientation",
  "height",
  "width",
  "madeOn",
  "title",
  "medium",
  "listPrice",
  "featured",
  "status",
  // typescript compiler will ensure these are keys of Art
] as const satisfies readonly (keyof Art)[];
