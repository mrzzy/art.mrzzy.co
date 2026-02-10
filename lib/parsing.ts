/*
 * art.mrzzy.co
 *
 */

import { readFile } from "fs/promises";
import { parse as parseCSV } from "csv-parse/sync";
import { join } from "path";
import { Art, ART_REQUIRED_COLS } from "./models";

/** List of expected columns in art CSV */
/**
 * Read Art metadata from CSV.
 * @param [csvPath=join(process.cwd(), "public", "art.csv")] Path to the CSV to
 * read Art metadata from.
 * @returns Parsed art data CSV.
 */
export async function parseArt(
  csvPath: string = join(process.cwd(), "public", "art.csv"),
): Promise<Art[]> {
  return parseCSV(await readFile(csvPath), { columns: true })
    .map((raw: any) => {
      // parse art object
      const parseBool = (v: string): boolean =>
        v.toLowerCase() === "true" ? true : false;
      const art = {
        id: raw["ID"],
        image: raw["Image"],
        hidden: parseBool(raw["Hidden"]),
        orientation: raw["Orientation"],
        height: parseInt(raw["Height (mm)"]),
        width: parseInt(raw["Width (mm)"]),
        madeOn: new Date(raw["Made On"]),
        title: raw["Title"],
        medium: raw["Medium"],
        location: raw["Location"],
        cost: raw["Painting Cost"],
        listPrice: raw["List Price"],
        featured: parseBool(raw["Featured"]),
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

      // check required parsed columns
      for (const col of ART_REQUIRED_COLS) {
        const key = col as keyof Art;
        if (
          art[key] == null ||
          (typeof art[key] === "string" && art[key].trim() === "")
        ) {
          console.log(art);
          throw new Error(
            `Invalid art CSV: Required field missing or empty '${col}': ${art}`,
          );
        }
      }

      return art;
    })
    .filter((art: Art) => !art.hidden);
}
