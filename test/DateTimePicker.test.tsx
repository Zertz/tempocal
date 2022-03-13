import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { DateTimePicker } from "../packages/www/examples/DateTimePicker";

const locale = "en-US";

const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
  timeStyle: "short",
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