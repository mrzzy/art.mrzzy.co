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
    expect(records).toHaveLength(10);
    expect(records[0]).toStrictEqual({
      cost: "5",
      exhibited: null,
      featured: false,
      framingCost: null,
      height: 410,
      id: "1",
      image: "/art/1.jpg",
      listPrice: "150",
      location: "Luggage",
      madeOn: new Date("2024-07-16T00:00:00.000Z"),
      medium: "Watercolor on paper",
      orientation: "Vertical",
      sale: null,
      title: "KL Dusk",
      width: 310,
    });
  });
});
