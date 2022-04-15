import { Temporal } from "@js-temporal/polyfill";
import { expect, test } from "vitest";
import { getMinutes } from "../src/getMinutes";

test("getMinutes (unbounded)", () => {
  const minutes = getMinutes();

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(false);
  }
});

test("getMinutes (hour before, with min)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 1,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (same hour, with min)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);

    if (i < 15) {
      expect(minutes[i].disabled).equal(true);
    } else {
      expect(minutes[i].disabled).equal(false);
    }
  }
});

test("getMinutes (hour after, with min)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 3,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(false);
  }
});

test("getMinutes (hour before, with max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 1,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(false);
  }
});

test("getMinutes (same hour, with max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);

    if (i > 45) {
      expect(minutes[i].disabled).equal(true);
    } else {
      expect(minutes[i].disabled).equal(false);
    }
  }
});

test("getMinutes (hour after, with max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 3,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (same hour, with min and max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);

    if (i < 15 || i > 45) {
      expect(minutes[i].disabled).equal(true);
    } else {
      expect(minutes[i].disabled).equal(false);
    }
  }
});
