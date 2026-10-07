/*
 * art.mrzzy.co
 * Utilities
 * Unit Tests
 */

import { describe, expect, test } from "@jest/globals";
import { paginate } from "./utils";

describe("paginate()", () => {
  test("Paginates into pages of given size", () => {
    const pieces = [1, 2, 3, 4, 5];
    expect(paginate(pieces, 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("Paginates exact multiple of size", () => {
    const pieces = [1, 2, 3, 4];
    expect(paginate(pieces, 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test("Paginates empty list", () => {
    expect(paginate([], 3)).toEqual([]);
  });

  test("Paginates size larger than list", () => {
    expect(paginate([1, 2], 5)).toEqual([[1, 2]]);
  });
});
