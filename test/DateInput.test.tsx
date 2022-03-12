import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { DateInput } from "../packages/www/examples/DateInput";

const locale = "en-US";

const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
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
