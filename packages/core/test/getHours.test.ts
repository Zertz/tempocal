import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getHours } from "../src/getHours";

test("getHours (unbounded)", () => {
  const hours = getHours();

  for (let i = 0; i < 24; i += 1) {
    expect(hours[i].hour).equal(i);
    expect(hours[i].disabled).equal(false);
  }
});

test("getHours (day before, with min)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 6,
    })
  );

  for (let i = 0; i < 24; i += 1) {
    expect(hours[i].hour).equal(i);
    expect(hours[i].disabled).equal(true);
  }
});

test("getHours (same day, with min)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 6,
    })
  );

  for (let i = 0; i < 24; i += 1) {
    expect(hours[i].hour).equal(i);

    if (i < 6) {
      expect(hours[i].disabled).equal(true);
    } else {
      expect(hours[i].disabled).equal(false);
    }
  }
});

test("getHours (day after, with min)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 3,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 6,
    })
  );

  for (let i = 0; i < 24; i += 1) {
    expect(hours[i].hour).equal(i);
    expect(hours[i].disabled).equal(false);
  }
});

test("getHours (day before, with max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 18,
    })
  );

  for (let i = 0; i < 24; i += 1) {
    expect(hours[i].hour).equal(i);
    expect(hours[i].disabled).equal(false);
  }
});

test("getHours (same day, with max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 18,
    })
  );

  for (let i = 0; i < 24; i += 1) {
    expect(hours[i].hour).equal(i);

    if (i > 18) {
      expect(hours[i].disabled).equal(true);
    } else {
      expect(hours[i].disabled).equal(false);
    }
  }
});

test("getHours (day after, with max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 3,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 18,
    })
  );

  for (let i = 0; i < 24; i += 1) {
    expect(hours[i].hour).equal(i);
    expect(hours[i].disabled).equal(true);
  }
});

test("getHours (same day, with min and max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 6,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 18,
    })
  );

  for (let i = 0; i < 24; i += 1) {
    expect(hours[i].hour).equal(i);

    if (i < 6 || i > 18) {
      expect(hours[i].disabled).equal(true);
    } else {
      expect(hours[i].disabled).equal(false);
    }
  }
});
