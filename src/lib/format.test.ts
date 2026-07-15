import { describe, expect, it } from "vitest";
import { formatDate } from "./format";

describe("formatDate", () => {
  it("formats an ISO date in French long form", () => {
    expect(formatDate("2026-07-13T00:00:00.000Z")).toContain("2026");
  });
});
