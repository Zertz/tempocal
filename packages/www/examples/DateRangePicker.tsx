import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import * as React from "react";
import { Calendar, Locale, useTempocal } from "../../lib";

type DateRange = [Temporal.PlainDate, Temporal.PlainDate];

export function DateRangePicker({
  dateFormatter,
  locale,
}: {
  dateFormatter: Intl.DateTimeFormat;
  locale: Locale;
}) {
  const [values, setValues] = React.useState<DateRange>([
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    }),
    Temporal.PlainDate.from({
      year: 2021,
      month: 12,
      day: 25,
    }),
  ]);

  const setValue = React.useCallback(
    (value: typeof values[number]) => {
      setValues((values) =>
        Temporal.PlainDate.compare(value, values[0]) < 0
          ? [value, values[1]]
          : [values[0], value]
      );
    },
    [setValues]
  );

  const { calendarProps, months } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value: values[0],
  });

  const formattedDates = React.useMemo(() => {
    return [
      dateFormatter.format(
        new Date(values[0].year, values[0].month - 1, values[0].day)
      ),
      dateFormatter.format(
        new Date(values[1].year, values[1].month - 1, values[1].day)
      ),
    ];
  }, [dateFormatter, values]);

  return (
    <div className="flex flex-col gap-4">
      <p>
        🚜 🚧{" "}
        <em>
          While Tempocal can be used to select a date range, the example needs
          some love for the user experience to be adequate.
        </em>
      </p>
      <p>
        {formattedDates[0]} - {formattedDates[1]}
      </p>
      <div className="flex w-min gap-4 rounded border border-gray-300 p-2 pt-0.5">
        <Calendar
          {...calendarProps}
          monthsAfter={1}
          value={values[0]}
          calendarProps={() => ({
            className: "gap-1 text-center w-72",
          })}
          headerProps={() => ({ className: "font-bold" })}
          renderHeader={(date) => months[date.month - 1].longName}
          weekdayProps={() => ({ className: "font-medium" })}
          renderDay={(date, props) => (
            <button
              {...props}
              className={classnames(
                "w-full overflow-hidden rounded border text-gray-700 transition-colors",
                Temporal.PlainDate.compare(values[0], date) <= 0 &&
                  Temporal.PlainDate.compare(values[1], date) >= 0
                  ? "border-blue-600 bg-blue-100"
                  : "border-gray-300 hover:bg-gray-100"
              )}
            >
              {date.day}
            </button>
          )}
        />
      </div>
    </div>
  );
}
