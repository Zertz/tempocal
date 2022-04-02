import { fireEvent, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DateTimePicker } from "../components/examples/DateTimePicker";

test("DateTimePicker renders without crashing", () => {
  const { getByText, getByTitle } = render(<DateTimePicker />);

  expect(getByText("November 25, 2021 at 8:30 AM")).toBeTruthy();

  fireEvent.click(getByText("27"));
  expect(getByText("November 27, 2021 at 8:30 AM")).toBeTruthy();

  fireEvent.click(getByTitle("Previous month"));
  expect(getByText("November 27, 2021 at 8:30 AM")).toBeTruthy();
  fireEvent.click(getByText("24"));
  expect(getByText("October 24, 2021 at 8:30 AM")).toBeTruthy();

  fireEvent.click(getByTitle("Next month"));
  expect(getByText("October 24, 2021 at 8:30 AM")).toBeTruthy();
  fireEvent.click(getByText("27"));
  expect(getByText("November 27, 2021 at 8:30 AM")).toBeTruthy();

  fireEvent.change(getByTitle("Hours"), { target: { value: 18 } });
  expect(getByText("November 27, 2021 at 6:30 PM")).toBeTruthy();

  fireEvent.change(getByTitle("Minutes"), { target: { value: 45 } });
  expect(getByText("November 27, 2021 at 6:45 PM")).toBeTruthy();
});
