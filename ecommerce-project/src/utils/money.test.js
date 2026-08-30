import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("format money 1999 cents as $19.99", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  });

  it("display 2 decimals", () => {
    expect(formatMoney(100)).toBe("$1.00");
  });
});
