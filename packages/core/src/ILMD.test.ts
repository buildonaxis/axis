import { describe, expect, it } from "vitest";
import { ILMD } from "./ILMD.js";

describe("ILMD", () => {
  it("stores standard ILMD fields", () => {
    const ilmd = new ILMD({
      lotNumber: "ABC123",
      expirationDate: "2027-12-31"
    });

    expect(
      ilmd.get("lotNumber")
    ).toBe("ABC123");

    expect(
      ilmd.get("expirationDate")
    ).toBe("2027-12-31");
  });

  it("supports custom attributes", () => {
    const ilmd = new ILMD({
      customField: "value"
    });

    expect(
      ilmd.get("customField")
    ).toBe("value");
  });
});