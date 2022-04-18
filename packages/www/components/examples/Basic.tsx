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
    <div className="flex flex-col flex-shrink-0 gap-4 w-72">
      <Calendar
        {...calendarProps}
        calendarProps={() => ({
          className: "bg-gray-100 text-gray-700 gap-1 p-2 text-center",
        })}
      />
    </div>
  );
}
