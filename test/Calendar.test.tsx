import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Basic } from "../packages/www/examples/Basic";
import { DateInput } from "../packages/www/examples/DateInput";
import { DatePicker } from "../packages/www/examples/DatePicker";
import { DateTimePicker } from "../packages/www/examples/DateTimePicker";

const locale = "en-US";

const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
});

const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
  timeStyle: "short",
});

describe("Basic", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <Basic dateFormatter={dateFormatter} locale={locale} />
    );

    expect(getByText("November 25, 2021")).toBeTruthy();

    fireEvent.click(getByText("27"));
    expect(getByText("November 27, 2021")).toBeTruthy();
  });
});

describe("DateInput", () => {
  it("renders without crashing", () => {
    const { getByText, getByTitle } = render(
      <DateInput dateFormatter={dateFormatter} locale={locale} />
    );

    fireEvent.click(getByTitle("November 25, 2021"));
    fireEvent.click(getByText("27"));
    expect(getByTitle("November 27, 2021")).toBeTruthy();
  });
});

describe("DatePicker", () => {
  it("renders without crashing", () => {
    const { getByText, getByTitle } = render(
      <DatePicker dateFormatter={dateFormatter} locale={locale} />
    );

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
});

describe("DateTimePicker", () => {
  it("renders without crashing", () => {
    const { getByText, getByTitle } = render(
      <DateTimePicker dateTimeFormatter={dateTimeFormatter} locale={locale} />
    );

    expect(getByText("November 25, 2021 at 8:30 AM")).toBeTruthy();

    fireEvent.click(getByText("27"));
    expect(getByText("November 27, 2021 at 8:30 AM")).toBeTruthy();

    fireEvent.click(getByTitle("Previous month"));
    expect(getByText("October 27, 2021 at 8:30 AM")).toBeTruthy();

    fireEvent.click(getByTitle("Next month"));
    expect(getByText("November 27, 2021 at 8:30 AM")).toBeTruthy();

    fireEvent.change(getByTitle("Hours"), { target: { value: 18 } });
    expect(getByText("November 27, 2021 at 6:30 PM")).toBeTruthy();

    fireEvent.change(getByTitle("Minutes"), { target: { value: 45 } });
    expect(getByText("November 27, 2021 at 6:45 PM")).toBeTruthy();
  });
});
