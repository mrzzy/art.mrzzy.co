/*
 * art.mrzzy.co
 * Data Model
 * Unit Tests
 */

import { describe, expect, test } from "@jest/globals";
import { parseArt } from "./parsing";
import { Orientation, Status } from "./models";

describe("parseArt()", () => {
  test("Parses art.csv", async () => {
    const records = await parseArt();
    expect(records.length).toBeGreaterThan(0);
    expect(records[0]).toStrictEqual({
      cost: "5",
      exhibited: null,
      featured: false,
      status: Status.Available,
      framingCost: null,
      height: 410,
      id: "1",
      image: "/art/1.jpg",
      listPrice: "75",
      location: "Luggage",
      madeOn: new Date("2024-07-16T00:00:00.000Z"),
      medium: "Watercolor on paper",
      orientation: Orientation.Vertical,
      sale: null,
      title: "KL Dusk",
      width: 310,
    });
  });
});
