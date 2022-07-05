import { fireEvent, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DateTimePicker } from "../examples/DateTimePicker";

test("DateTimePicker renders without crashing", () => {
  const { getByText, getByTitle } = render(
    <DateTimePicker clampSelectedValue="always" />
  );

  expect(
    getByText("Selected date and time: November 25, 2021 at 8:30 AM")
  ).toBeTruthy();

  fireEvent.click(getByText("27"));
  expect(
    getByText("Selected date and time: November 27, 2021 at 8:30 AM")
  ).toBeTruthy();

  fireEvent.click(getByTitle("Previous month"));
  expect(
    getByText("Selected date and time: November 27, 2021 at 8:30 AM")
  ).toBeTruthy();

  fireEvent.click(getByText("24"));
  expect(
    getByText("Selected date and time: October 24, 2021 at 8:30 AM")
  ).toBeTruthy();

  fireEvent.click(getByTitle("Next month"));
  expect(
    getByText("Selected date and time: October 24, 2021 at 8:30 AM")
  ).toBeTruthy();

  fireEvent.click(getByText("27"));
  expect(
    getByText("Selected date and time: November 27, 2021 at 8:30 AM")
  ).toBeTruthy();

  fireEvent.change(getByTitle("Hours"), { target: { value: 18 } });
  expect(
    getByText("Selected date and time: November 27, 2021 at 6:30 PM")
  ).toBeTruthy();

  fireEvent.change(getByTitle("Minutes"), { target: { value: 45 } });
  expect(
    getByText("Selected date and time: November 27, 2021 at 6:45 PM")
  ).toBeTruthy();
});
