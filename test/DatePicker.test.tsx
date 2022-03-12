import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { DatePicker } from "../packages/www/examples/DatePicker";

const locale = "en-US";

const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
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
