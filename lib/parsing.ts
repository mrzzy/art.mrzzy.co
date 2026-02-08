/*
 * art.mrzzy.co
 *
 */

import { readFile } from "fs/promises";
import { parse as parseCSV } from "csv-parse/sync";
import { join } from "path";
import { Art } from "./models";

/** List of expected columns in art CSV */
const ART_CSV_COLS = [
  "ID",
  "Image",
  "Orientation",
  "Height (mm)",
  "Width (mm)",
  "Made On",
  "Title",
  "Medium",
  "Location",
  "Painting Cost",
  "List Price",
  "Featured",
  "Status",
  "Framing Cost",
  "Sold On",
  "Sales Channel",
  "Sold Price",
  "Bought By",
  "Exhibited",
];
/* List of columns that require nonempty values in parsed Art object */
const ART_REQUIRED_COLS = [
  "id",
  "image",
  "orientation",
  "height",
  "width",
  "madeOn",
  "title",
  "medium",
  "listPrice",
  "featured",
  "status",
];

/**
 * Read Art metadata from CSV.
 * @param [csvPath=join(process.cwd(), "public", "art.csv")] Path to the CSV to
 * read Art metadata from.
 * @returns Parsed art data CSV.
 */
export async function parseArt(
  csvPath: string = join(process.cwd(), "public", "art.csv"),
): Promise<Art[]> {
  return parseCSV(await readFile(csvPath), { columns: true }).map(
    (raw: any) => {
      /// check require columns
      if (ART_CSV_COLS.filter((c) => c in raw).length !== ART_CSV_COLS.length) {
        throw new Error("Invalid art CSV: Missing columns");
      }
      // parse art object
      const art = {
        id: raw["ID"],
        image: raw["Image"],
        orientation: raw["Orientation"],
        height: parseInt(raw["Height (mm)"]),
        width: parseInt(raw["Width (mm)"]),
        madeOn: new Date(raw["Made On"]),
        title: raw["Title"],
        medium: raw["Medium"],
        location: raw["Location"],
        cost: raw["Painting Cost"],
        listPrice: raw["List Price"],
        featured: raw["Featured"].toLowerCase() === "true" ? true : false,
        status: raw["Status"],
        framingCost:
          raw["Framing Cost"].length > 0 ? raw["Framing Cost"] : null,
        sale:
          raw["Sold On"].length > 0
            ? {
              channel: raw["Sales Channel"],
              soldOn: Date.parse(raw["Sold On"]),
              price: raw["Sold Price"],
              boughtBy: raw["Bought By"],
            }
            : null,
        exhibited: raw["Exhibited"].length > 0 ? raw["Exhibited"] : null,
      };

      // check required fields
      for (const col of ART_REQUIRED_COLS) {
        const key = col as keyof Art;
        if (
          art[key] == null ||
          (typeof art[key] === "string" && art[key].trim() === "")
        ) {
          throw new Error(
            `Invalid art CSV: Required field missing or empty: ${col}`,
          );
        }
      }

      return art;
    },
  );
}
