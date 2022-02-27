import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import * as React from "react";
import { Basic } from "../packages/www/examples/Basic";

const locale = "en-US";

const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
});

describe("Basic", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <Basic dateFormatter={dateFormatter} locale={locale} />
    );

    expect(getByText("November 25, 2021")).toBeTruthy();
  });
});
