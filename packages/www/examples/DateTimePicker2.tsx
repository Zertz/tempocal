import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import * as React from "react";
import { Calendar, Locale, useTempocal } from "../../lib";

export function DateTimePicker2({
  dateTimeFormatter,
  locale,
}: {
  dateTimeFormatter: Intl.DateTimeFormat;
  locale: Locale;
}) {
  const [value, setValue] = React.useState(
    Temporal.PlainDateTime.from({
      year: 2021,
      month: 11,
      day: 25,
      hour: 8,
      minute: 30,
      second: 0,
    })
  );

  const { monthNames, onChangeSelectedValue } = useTempocal({
    locale,
    mode: "datetime",
    setValue,
    value,
  });

  const formattedDateTime = React.useMemo(() => {
    return dateTimeFormatter.format(
      new Date(value.year, value.month - 1, value.day, value.hour, value.minute)
    );
  }, [dateTimeFormatter, value]);

  return (
    <div className="flex flex-col gap-4">
      <p>{formattedDateTime}</p>
      <section className="grid grid-rows-[min-content,1fr] grid-cols-[1fr,min-content] gap-2 border border-gray-300 overflow-hidden p-2 rounded w-96 h-[16rem]">
        <header className="flex items-center gap-2 font-bold">
          <button
            className="mr-auto"
            onClick={() => onChangeSelectedValue(value.subtract({ months: 1 }))}
            title="Previous month"
            type="button"
          >
            &larr;
          </button>
          {monthNames[value.month - 1]}
          <button
            className="ml-auto"
            onClick={() => onChangeSelectedValue(value.add({ months: 1 }))}
            title="Next month"
            type="button"
          >
            &rarr;
          </button>
        </header>
        <Calendar
          locale={locale}
          onChange={onChangeSelectedValue}
          rollover
          value={value}
          calendarProps={() => ({
            className: "row-start-2 col-start-1 gap-1 text-center",
          })}
          weekdayProps={() => ({ className: "font-medium" })}
          dayProps={(date) => ({
            className: classnames(
              "border overflow-hidden rounded transition-colors w-full",
              "disabled:opacity-75 disabled:pointer-events-none disabled:text-red-400",
              value.month === date.month ? "text-gray-700" : "text-gray-400",
              value.toPlainDate().equals(date)
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
              <li
                key={hour}
                className={classnames("border px-0.5 rounded", {
                  "bg-blue-100 border-blue-600": value.hour === hour,
                })}
              >
                <button
                  onClick={() => onChangeSelectedValue({ hour })}
                  type="button"
                >
                  {`${hour}`.padStart(2, "0")}
                </button>
              </li>
            ))}
          </ul>
          <ul
            className="border border-gray-300 mr-auto overflow-auto px-1 py-0.5 rounded w-12"
            title="Minutes"
          >
            {[...Array(60 / 5)]
              .map((_, minute) => minute * 5)
              .map((minute) => (
                <li
                  key={minute}
                  className={classnames("border px-0.5 rounded", {
                    "bg-blue-100 border-blue-600": value.minute === minute,
                  })}
                >
                  <button
                    onClick={() => onChangeSelectedValue({ minute })}
                    type="button"
                  >
                    {`${minute}`.padStart(2, "0")}
                  </button>
                </li>
              ))}
          </ul>
        </footer>
      </section>
    </div>
  );
}
