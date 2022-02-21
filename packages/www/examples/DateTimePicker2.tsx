import { Temporal } from "@js-temporal/polyfill";
import { Calendar, Locale, useTempocal } from "@tempocal/react";
import classnames from "classnames";
import { useState } from "react";

export function DateTimePicker2({
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
    <div className="flex flex-col gap-4">
      <p>{dateTimeFormatter.format(new Date(value.toString()))}</p>
      <section className="grid grid-rows-[min-content,1fr] grid-cols-[1fr,min-content] gap-2 border border-gray-300 overflow-hidden p-2 rounded w-96 h-[14rem]">
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
            className: "row-start-2 col-start-1 gap-1 text-center",
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
        <footer className="flex gap-2 row-start-1 row-span-2 col-start-2">
          <ul
            className="border border-gray-300 ml-auto overflow-auto px-1 py-0.5 rounded w-12"
            title="Hours"
          >
            {[...Array(24)].map((_, hour) => (
              <li key={hour}>
                <button onClick={() => onChange({ hour })} type="button">
                  {`${hour}`.padStart(2, "0")}
                </button>
              </li>
            ))}
          </ul>
          <ul
            className="border border-gray-300 mr-auto overflow-auto px-1 py-0.5 rounded w-12"
            title="Minutes"
          >
            {[...Array(60 / 5)].map((_, minute) => (
              <li key={minute}>
                <button
                  onClick={() => onChange({ minute: minute * 5 })}
                  type="button"
                >
                  {`${minute * 5}`.padStart(2, "0")}
                </button>
              </li>
            ))}
          </ul>
        </footer>
      </section>
    </div>
  );
}
