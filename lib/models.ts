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
  framingCost: string | null;
  sale: Sale | null;
  exhibited: string | null;
};
