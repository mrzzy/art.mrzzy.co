/*
 * art.mrzzy.co
 * Data Model
 * Unit Tests
 */

import { describe, expect, test } from "@jest/globals";
import { parseArt } from "./parsing";
import fs from "fs";
import path from "path";
import os from "os";

describe("parseArt()", () => {
  const testPath = path.join(os.tmpdir(), "test_art.csv");

  test("Parses test_art.csv", async () => {
    fs.writeFileSync(
      testPath,
      `ID,Image,Orientation,Height (mm),Width (mm),Made On,Title,Medium,Location,Painting Cost,Framing Cost,List Price,Featured,Status,Exhibited,Sales Channel,Sold On,Sold Price,Bought By
1,/art/1.jpg,Vertical,410,310,2024-07-16,KL Dusk,Watercolor on paper,Home,5,,45,FALSE,Available,,,,,
`,
      { flag: "w" },
    );
    const records = await parseArt(testPath);
    expect(records.length).toBeGreaterThan(0);
    fs.unlinkSync(testPath);
  });

  test("Parses full art.CSV", async () => {
    const artCSV = path.relative(process.cwd(), "public/art.csv");
    const records = await parseArt(artCSV);
    expect(records.length).toBeGreaterThan(0);
  });

  test("Throws missing column test_art.csv", async () => {
    fs.writeFileSync(
      testPath,
      `,Image,Orientation,Height (mm),Width (mm),Made On,Title,Medium,Location,Painting Cost,Framing Cost,List Price,Featured,Status,Exhibited,Sales Channel,Sold On,Sold Price,Bought By
    const
1,/art/1.jpg,Vertical,410,310,2024-07-16,KL Dusk,Watercolor on paper,Home,5,,45,FALSE,Available,,,,,
`,
      { flag: "w" },
    );
    expect(parseArt(testPath)).rejects.toThrow();
    fs.unlinkSync(testPath);
  });
});
