import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import { useState } from "react";
import { Calendar } from "../../lib/Calendar";
import { Locale } from "../../lib/types";
import { useTempocal } from "../../lib/useTempocal";

export function DateTimePicker({
  dateTimeFormatter,
  locale,
}: {
  dateTimeFormatter: Intl.DateTimeFormat;
  locale: Locale;
}) {
  const [value, setValue] = useState(
    Temporal.PlainDateTime.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const { monthNames, onChange, onSelect } = useTempocal({
    locale,
    mode: "datetime",
    setValue,
    value,
  });

  return (
    <div className="flex flex-col gap-8 pt-8">
      <p>{dateTimeFormatter.format(new Date(value.toString()))}</p>
      <section className="border border-gray-300 p-2 rounded w-72">
        <header className="flex items-center gap-2 font-bold">
          <button
            className="mr-auto"
            onClick={() => onChange(value.subtract({ months: 1 }))}
            type="button"
          >
            &larr;
          </button>
          {monthNames[value.month - 1]}
          <button
            className="ml-auto"
            onClick={() => onChange(value.add({ months: 1 }))}
            type="button"
          >
            &rarr;
          </button>
        </header>
        <Calendar
          locale={locale}
          onSelect={onSelect}
          rollover
          value={value}
          calendarProps={() => ({
            className: "gap-1 text-center",
          })}
          weekdayProps={() => ({ className: "font-medium" })}
          dayProps={(day) => ({
            className: classnames(
              "border overflow-hidden rounded transition-colors w-full",
              "disabled:opacity-75 disabled:pointer-events-none disabled:text-red-400",
              value.month === day.month ? "text-gray-700" : "text-gray-400",
              value.equals(day)
                ? "bg-blue-100 border-blue-600"
                : "hover:bg-gray-100 border-gray-300"
            ),
          })}
        />
        <footer className="flex gap-2 mt-2">
          <select
            className="border border-gray-300 ml-auto px-1 py-0.5 rounded w-min"
            onChange={({ target: { value } }) =>
              onChange({ hour: Number(value) })
            }
            title="Hours"
            value={value.hour}
          >
            {[...Array(24)].map((_, hour) => (
              <option key={hour} value={hour}>
                {`${hour}`.padStart(2, "0")}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 mr-auto px-1 py-0.5 rounded w-min"
            onChange={({ target: { value } }) =>
              onChange({ minute: Number(value) })
            }
            title="Minutes"
            value={value.minute}
          >
            {[...Array(60 / 5)].map((_, minute) => (
              <option key={minute} value={minute * 5}>
                {`${minute * 5}`.padStart(2, "0")}
              </option>
            ))}
          </select>
        </footer>
      </section>
    </div>
  );
}
