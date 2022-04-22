import { Temporal } from "@js-temporal/polyfill";
import { Calendar, useTempocal } from "@tempocal/react";
import * as React from "react";

export function Basic() {
  const [value, setValue] = React.useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const { calendarProps } = useTempocal({
    locale: "en-US",
    mode: "date",
    setValue,
    value,
  });

  return (
    <Calendar
      {...calendarProps}
      calendarProps={() => ({
        className:
          "flex-shrink-0 bg-gray-100 text-gray-700 gap-1 p-2 rounded text-center w-72",
      })}
    />
  );
}
