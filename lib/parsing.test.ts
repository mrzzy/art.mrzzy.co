/*
 * art.mrzzy.co
 * Data Model
 * Unit Tests
 */

import { describe, expect, test } from "@jest/globals";
import { parseArt } from "./parsing";

describe("parseArt()", () => {
  test("Parses art.csv", async () => {
    const records = await parseArt();
    expect(records.length).toBeGreaterThan(0);
  });
});
