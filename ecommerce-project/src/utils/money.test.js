import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("format money 1999 cents as $19.99", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  });

  it("display 2 decimals", () => {
    expect(formatMoney(100)).toBe("$1.00");
  });

  it("format money 0 cents as $0.00", () => {
    expect(formatMoney(0)).toBe("$0.00");
  });

  it("checks working with negative numbers", () => {
    expect(formatMoney(-100)).toBe("-$1.00");
    expect(formatMoney(-999)).toBe("-$9.99");
  });
});
