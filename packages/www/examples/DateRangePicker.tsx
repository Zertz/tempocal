import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import { useCallback, useState } from "react";
import { Calendar } from "../../lib/Calendar";
import { Locale } from "../../lib/types";
import { useTempocal } from "../../lib/useTempocal";

export function DateRangePicker({
  dateFormatter,
  locale,
}: {
  dateFormatter: Intl.DateTimeFormat;
  locale: Locale;
}) {
  const [values, setValues] = useState<
    [Temporal.PlainDate, Temporal.PlainDate]
  >([
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

  const setValue = useCallback(
    (value: typeof values[number]) => {
      setValues((values) =>
        // value.isBefore(values[0])
        Temporal.PlainDate.compare(value, values[0]) < 0
          ? [value, values[1]]
          : [values[0], value]
      );
    },
    [setValues]
  );

  const { monthNames, onSelect } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value: values[0],
  });

  return (
    <div className="flex flex-col gap-4">
      <p>
        {dateFormatter.format(new Date(values[0].toString()))} -{" "}
        {dateFormatter.format(new Date(values[1].toString()))}
      </p>
      <div className="flex gap-4 border border-gray-300 p-2 pt-0.5 rounded w-min">
        <Calendar
          locale={locale}
          monthsAfter={1}
          onSelect={onSelect}
          value={values[0]}
          calendarProps={() => ({
            className: "gap-1 text-center w-72",
          })}
          headerProps={() => ({ className: "font-bold" })}
          renderHeader={(date) => monthNames[date.month - 1]}
          weekdayProps={() => ({ className: "font-medium" })}
          dayProps={(day) => ({
            className: classnames(
              "border overflow-hidden rounded text-gray-700 transition-colors w-full",
              Temporal.PlainDate.compare(values[0], day) <= 0 &&
                Temporal.PlainDate.compare(values[1], day) >= 0
                ? "bg-blue-100 border-blue-600"
                : "hover:bg-gray-100 border-gray-300"
            ),
          })}
        />
      </div>
    </div>
  );
}
