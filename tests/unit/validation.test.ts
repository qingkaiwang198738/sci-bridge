import { describe, expect, it } from "vitest";
import { createMessageSchema } from "@/src/lib/validation/schemas";

describe("message validation", () => {
  it("accepts a normal message", () => {
    expect(createMessageSchema.safeParse({category:"生命科学",supplyType:"demand",itemName:"抗体",content:"需要少量实验用抗体"}).success).toBe(true);
  });
  it("rejects an empty content", () => {
    expect(createMessageSchema.safeParse({category:"生命科学",supplyType:"demand",itemName:"抗体",content:""}).success).toBe(false);
  });
});
