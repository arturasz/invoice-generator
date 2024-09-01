import { meaningOfLife } from "./meaning-of-life";
import { describe, expect, test } from "@jest/globals";

describe("Package", () => {
    test("shoud", () => {
        expect(meaningOfLife()).toBe(42);
    });
});
