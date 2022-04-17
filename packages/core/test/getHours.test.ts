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

test("getHours (year before, with min)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2021,
      month: 2,
      day: 2,
      hour: 6,
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

test("getHours (month before, with min)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 3,
      day: 2,
      hour: 6,
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

test("getHours (day before, with min)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 6,
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
      hour: 6,
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
      hour: 6,
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

test("getHours (month after, with min)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 5,
      day: 2,
      hour: 6,
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

test("getHours (year after, with min)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2023,
      month: 4,
      day: 2,
      hour: 6,
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

test("getHours (year before, with max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2021,
      month: 4,
      day: 2,
      hour: 18,
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

test("getHours (month before, with max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 3,
      day: 2,
      hour: 18,
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

test("getHours (day before, with max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 18,
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
      hour: 18,
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
      hour: 18,
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

test("getHours (month after, with max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 5,
      day: 2,
      hour: 18,
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

test("getHours (year after, with max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2023,
      month: 4,
      day: 2,
      hour: 18,
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

test("getHours (year before, with min and max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2021,
      month: 4,
      day: 2,
      hour: 12,
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
    expect(hours[i].disabled).equal(true);
  }
});

test("getHours (month before, with min and max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 3,
      day: 2,
      hour: 12,
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
    expect(hours[i].disabled).equal(true);
  }
});

test("getHours (day before, with min and max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 12,
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
    expect(hours[i].disabled).equal(true);
  }
});

test("getHours (same day, with min and max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 12,
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

test("getHours (day after, with min and max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 3,
      hour: 12,
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
    expect(hours[i].disabled).equal(true);
  }
});

test("getHours (month after, with min and max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 5,
      day: 2,
      hour: 12,
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
    expect(hours[i].disabled).equal(true);
  }
});

test("getHours (year after, with min and max)", () => {
  const hours = getHours(
    Temporal.PlainDateTime.from({
      year: 2023,
      month: 4,
      day: 2,
      hour: 12,
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
    expect(hours[i].disabled).equal(true);
  }
});
