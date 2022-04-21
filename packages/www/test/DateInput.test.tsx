import { fireEvent, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DateInput } from "../examples/DateInput";

test("DateInput renders without crashing", () => {
  const { getByText, getByTitle } = render(<DateInput />);

  fireEvent.click(getByTitle("November 25, 2021"));
  fireEvent.click(getByText("27"));
  expect(getByTitle("November 27, 2021")).toBeTruthy();
});
