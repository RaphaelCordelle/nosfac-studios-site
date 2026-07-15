import { describe, expect, it } from "vitest";
import { ProjectSchema } from "./project";

const validProject = {
  id: "test",
  slug: "test",
  name: "Test Project",
  type: "game" as const,
  status: "development" as const,
  summary: "A short summary.",
  updatedAt: "2026-07-13T00:00:00.000Z",
  accent: { hex: "#2F6BFF", name: "Blue" },
  seo: { title: "Test", description: "Test description" },
  visibility: "public" as const,
};

describe("ProjectSchema", () => {
  it("accepts a minimal valid project", () => {
    expect(ProjectSchema.safeParse(validProject).success).toBe(true);
  });

  it("rejects an uppercase slug", () => {
    const result = ProjectSchema.safeParse({ ...validProject, slug: "Test-Project" });
    expect(result.success).toBe(false);
  });

  it("rejects a summary over 180 characters", () => {
    const result = ProjectSchema.safeParse({ ...validProject, summary: "a".repeat(181) });
    expect(result.success).toBe(false);
  });

  it("rejects a non-hex accent color", () => {
    const result = ProjectSchema.safeParse({ ...validProject, accent: { hex: "blue", name: "Blue" } });
    expect(result.success).toBe(false);
  });
});
