import { Temporal } from "@js-temporal/polyfill";
import { Calendar, useTempocal } from "@tempocal/react";
import * as React from "react";
import { Code } from "../Code";

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
    <div className="flex items-start gap-4">
      <div className="bg-gray-100 text-gray-700 p-2 rounded">
        <Calendar
          {...calendarProps}
          calendarProps={() => ({
            className:
              "flex-shrink-0 gap-1 border border-gray-300 p-2 rounded text-center w-72",
          })}
        />
      </div>
      <p>
        Out of the box, <Code>Calendar</Code> is just a grid with weekdays and
        days. While this example adds a tiny bit of styling with TailwindCSS to
        make it slightly nicer to look at, the component is friendly to all
        styling solutions that can use classes.
      </p>
    </div>
  );
}
