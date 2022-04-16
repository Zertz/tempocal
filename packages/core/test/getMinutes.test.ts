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

test("getMinutes (year before, with min)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2021,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (month before, with min)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 3,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (day before, with min)", () => {
  const minutes = getMinutes(
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
      day: 2,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (hour before, with min)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 1,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
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
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
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
      day: 2,
      hour: 3,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(false);
  }
});

test("getMinutes (day after, with min)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 3,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(false);
  }
});

test("getMinutes (month after, with min)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 5,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(false);
  }
});

test("getMinutes (year after, with min)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2023,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(false);
  }
});

test("getMinutes (year before, with max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2021,
      month: 2,
      day: 2,
      hour: 2,
      minute: 45,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(false);
  }
});

test("getMinutes (month before, with max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 3,
      day: 2,
      hour: 2,
      minute: 45,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(false);
  }
});

test("getMinutes (day before, with max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 45,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
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
      day: 2,
      hour: 1,
      minute: 45,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
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
      day: 2,
      hour: 2,
      minute: 45,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
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
      day: 2,
      hour: 3,
      minute: 45,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (day after, with max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 3,
      hour: 2,
      minute: 45,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (month after, with max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 5,
      day: 2,
      hour: 2,
      minute: 45,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (year after, with max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2023,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    }),
    undefined,
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (year before, with min and max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2021,
      month: 4,
      day: 2,
      hour: 2,
      minute: 30,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (month before, with min and max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 3,
      day: 2,
      hour: 2,
      minute: 30,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (day before, with min and max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 1,
      hour: 2,
      minute: 30,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (hour before, with min and max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 1,
      minute: 30,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
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
      day: 2,
      hour: 2,
      minute: 30,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
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

test("getMinutes (hour after, with min and max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 3,
      minute: 30,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (day after, with min and max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 3,
      hour: 2,
      minute: 30,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (month after, with min and max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 5,
      day: 2,
      hour: 2,
      minute: 30,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});

test("getMinutes (year after, with min and max)", () => {
  const minutes = getMinutes(
    Temporal.PlainDateTime.from({
      year: 2023,
      month: 4,
      day: 2,
      hour: 2,
      minute: 30,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 15,
    }),
    Temporal.PlainDateTime.from({
      year: 2022,
      month: 4,
      day: 2,
      hour: 2,
      minute: 45,
    })
  );

  for (let i = 0; i < 60; i += 1) {
    expect(minutes[i].minute).equal(i);
    expect(minutes[i].disabled).equal(true);
  }
});
