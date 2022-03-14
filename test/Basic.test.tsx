import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import * as React from "react";
import { Basic } from "../packages/www/examples/Basic";

describe("Basic", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Basic />);

    expect(getByText("Sun")).toBeTruthy();
    expect(getByText("Mon")).toBeTruthy();
    expect(getByText("Tue")).toBeTruthy();
    expect(getByText("Wed")).toBeTruthy();
    expect(getByText("Thu")).toBeTruthy();
    expect(getByText("Fri")).toBeTruthy();
    expect(getByText("Sat")).toBeTruthy();
  });
});
