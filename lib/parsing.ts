/*
 * art.mrzzy.co
 *
 */

import { readFile } from "fs/promises";
import { parse as parseCSV } from "csv-parse/sync";
import { join } from "path";
import { Art } from "./models";

/** List of expected columns in art CSV */
const ART_CSV_COLS = {
  "ID": { required: true },
  "Image": { required: true },
  "Orientation": { required: true },
  "Height (mm)": { required: true },
  "Width (mm)": { required: true },
  "Made On": { required: true },
  "Title": { required: true },
  "Medium": { required: true },
  "Location": { required: false },
  "Painting Cost": { required: false },
  "List Price": { required: true },
  "Featured": { required: true },
  "Status": { required: true },
  "Framing Cost": { required: false },
  "Sold On": { required: false },
  "Sales Channel": { required: false },
  "Sold Price": { required: false },
  "Bought By": { required: false },
  "Exhibited": { required: false }
};

/**
 * Read Art metadata from CSV.
 * @param [csvPath=join(process.cwd(), "public", "art.csv")] Path to the CSV to
 * read Art metadata from.
 * @throws Error if the CSV is invalid or required fields are missing.
 * @returns Parsed art data CSV.
 */
export async function parseArt(
  csvPath: string = join(process.cwd(), "public", "art.csv"),
): Promise<Art[]> {
  return parseCSV(await readFile(csvPath), { columns: true }).map((raw: any) => {
    // check all column names are present
    const colNames = Object.keys(ART_CSV_COLS);
    if(colNames.filter(c => c in raw).length !== colNames.length) {
      throw new Error("Invalid art CSV: Missing columns");
    }

    // check required column contents are nonempty
    for (const [colName, { required }] of Object.entries(ART_CSV_COLS)) {
      const value = raw[colName];
      if (required && (value == null || value === "")) {
        throw new Error(`Invalid art CSV: Required field '${colName}' is missing or empty`);
      }
    }

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
