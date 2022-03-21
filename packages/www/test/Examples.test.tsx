import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Basic } from "../examples/Basic";
import { DateInput } from "../examples/DateInput";
import { DatePicker } from "../examples/DatePicker";
import { DateTimePicker } from "../examples/DateTimePicker";

test("Basic renders without crashing", () => {
  const { getByText } = render(<Basic />);

  expect(getByText("Sun")).toBeTruthy();
  expect(getByText("Mon")).toBeTruthy();
  expect(getByText("Tue")).toBeTruthy();
  expect(getByText("Wed")).toBeTruthy();
  expect(getByText("Thu")).toBeTruthy();
  expect(getByText("Fri")).toBeTruthy();
  expect(getByText("Sat")).toBeTruthy();
});

it("DateInput renders without crashing", () => {
  const { getByText, getByTitle } = render(<DateInput />);

  fireEvent.click(getByTitle("November 25, 2021"));
  fireEvent.click(getByText("27"));
  expect(getByTitle("November 27, 2021")).toBeTruthy();
});

it("DatePicker renders without crashing", () => {
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

it("DateTimePicker renders without crashing", () => {
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
