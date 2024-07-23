/*
 * art.mrzzy.co
 *
 */

import { readFile } from "fs/promises";
import { parse as parseCSV } from "csv-parse/sync";
import { join } from "path";
import { Art } from "./models";
/**
 * Read Art metadata from CSV.
 * @param [csvPath=join(process.cwd(), "public", "art.csv")] Path to the CSV to
 * read Art metadata from.
 * @returns Parsed art data CSV.
 */
export async function parseArt(
  csvPath: string = join(process.cwd(), "public", "art.csv"),
): Promise<Art[]> {
  return parseCSV(await readFile(csvPath), { columns: true }).map((raw: any) => {
    return {
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
      framingCost: raw["Framing Cost"].length > 0 ? raw["Framing Cost"] : null,
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
  });
}
