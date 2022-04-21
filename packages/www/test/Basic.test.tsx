import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Basic } from "../examples/Basic";

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
