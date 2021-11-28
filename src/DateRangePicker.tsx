import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import { useCallback, useState } from "react";
import { Calendar } from "./Calendar";
import { Locale } from "./types";
import { useTempocal } from "./useTempocal";

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
      month: 11,
      day: 25,
    }),
  ]);

  const setValue = useCallback(
    (value: typeof values[number]) => {
      setValues((values) => [value, values[0]]);
    },
    [setValues]
  );

  const { monthName: monthName1, onSelect: onSelect1 } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value: values[0],
  });

  const { monthName: monthName2, onSelect: onSelect2 } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value: values[1],
  });

  return (
    <div className="flex flex-col gap-8 pt-8">
      <h2 className="text-3xl">DateRangePicker</h2>
      <p>
        {dateFormatter.format(new Date(values[0].toLocaleString()))} -{" "}
        {dateFormatter.format(new Date(values[1].toLocaleString()))}
      </p>
      <div className="flex gap-4 border border-gray-300 p-2 pt-0.5 rounded w-min">
        <div className="flex flex-col text-center w-64">
          {monthName1}
          <Calendar
            className="gap-1"
            locale={locale}
            onSelect={onSelect1}
            value={values[0]}
            dayClassName={(day) =>
              classnames(
                "border overflow-hidden rounded transition-colors w-full",
                values[0].month === day.month
                  ? "text-gray-700"
                  : "text-gray-400",
                Temporal.PlainDate.compare(values[0], day) <= 0
                  ? "bg-blue-100 border-blue-600"
                  : "hover:bg-gray-100 border-gray-300"
              )
            }
            weekdayClassName={() => "font-medium"}
            rollover
          />
        </div>
        <div className="flex flex-col text-center w-64">
          {monthName2}
          <Calendar
            className="gap-1"
            locale={locale}
            onSelect={onSelect2}
            value={values[1]}
            dayClassName={(day) =>
              classnames(
                "border overflow-hidden rounded transition-colors w-full",
                values[1].month === day.month
                  ? "text-gray-700"
                  : "text-gray-400",
                Temporal.PlainDate.compare(values[1], day) >= 0
                  ? "bg-blue-100 border-blue-600"
                  : "hover:bg-gray-100 border-gray-300"
              )
            }
            weekdayClassName={() => "font-medium"}
            rollover
          />
        </div>
      </div>
    </div>
  );
}
