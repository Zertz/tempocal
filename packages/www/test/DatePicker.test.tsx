import { fireEvent, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DatePicker } from "../examples/DatePicker";

test("DatePicker renders without crashing", () => {
  const { getByText, getByTitle } = render(<DatePicker />);

  expect(getByText("November 25, 2021")).toBeTruthy();

  fireEvent.click(getByText("27"));
  expect(getByText("November 27, 2021")).toBeTruthy();

  fireEvent.change(getByTitle("Month"), { target: { value: 2 } });
  expect(getByText("November 27, 2021")).toBeTruthy();

  fireEvent.change(getByTitle("Year"), { target: { value: 2022 } });
  expect(getByText("November 27, 2021")).toBeTruthy();

  fireEvent.click(getByText("25"));
  expect(getByText("February 25, 2022")).toBeTruthy();
});
