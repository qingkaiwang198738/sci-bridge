import { describe, expect, it } from "vitest";
import { generateSecret } from "@/src/lib/security/secrets";

describe("secret generation", () => {
  it("generates the requested length", () => {
    expect(generateSecret(16)).toHaveLength(16);
  });
  it("generates different values", () => {
    expect(generateSecret()).not.toBe(generateSecret());
  });
});
