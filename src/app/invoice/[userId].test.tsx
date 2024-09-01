import { describe, expect, test } from "@jest/globals";
import { cleanup, fireEvent, render } from "@testing-library/react";

import Invoice from "./[userId]";

describe("Package", () => {
  /* test("shoud", () => {
   *   expect(<Invoice />).toBe(42);
   * }); */

  test("should be 42", () => {
    const { getByText } = render(<Invoice />);

    expect(getByText(/42/i)).toBeTruthy();
  });
});
