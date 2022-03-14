import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { DateInput } from "../packages/www/examples/DateInput";

describe("DateInput", () => {
  it("renders without crashing", () => {
    const { getByText, getByTitle } = render(<DateInput />);

    fireEvent.click(getByTitle("November 25, 2021"));
    fireEvent.click(getByText("27"));
    expect(getByTitle("November 27, 2021")).toBeTruthy();
  });
});
