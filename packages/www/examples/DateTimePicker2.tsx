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

  const { months, onChangeSelectedValue } = useTempocal({
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
      <section className="grid w-96 grid-cols-[1fr,min-content] grid-rows-[min-content,1fr] items-start gap-2 overflow-hidden rounded border border-gray-300 p-2">
        <header className="flex items-center gap-2 font-bold">
          <button
            className="mr-auto"
            onClick={() => onChangeSelectedValue(value.subtract({ months: 1 }))}
            title="Previous month"
            type="button"
          >
            &larr;
          </button>
          {months[value.month - 1].longName}
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
          renderDay={(date, props) => (
            <button
              {...props}
              className={classnames(
                "w-full overflow-hidden rounded border transition-colors",
                "disabled:pointer-events-none disabled:text-red-400 disabled:opacity-75",
                value.month === date.month ? "text-gray-700" : "text-gray-400",
                value.toPlainDate().equals(date)
                  ? "border-blue-600 bg-blue-100"
                  : "border-gray-300 hover:bg-gray-100"
              )}
            >
              {date.day}
            </button>
          )}
        />
        <footer className="col-start-2 row-span-2 row-start-1 flex h-60 gap-2">
          <ul
            className="ml-auto w-12 overflow-auto rounded border border-gray-300 px-1 py-0.5"
            title="Hours"
          >
            {[...Array(24)].map((_, hour) => (
              <li
                key={hour}
                className={classnames("rounded border px-0.5", {
                  "border-blue-600 bg-blue-100": value.hour === hour,
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
            className="mr-auto w-12 overflow-auto rounded border border-gray-300 px-1 py-0.5"
            title="Minutes"
          >
            {[...Array(60 / 5)]
              .map((_, minute) => minute * 5)
              .map((minute) => (
                <li
                  key={minute}
                  className={classnames("rounded border px-0.5", {
                    "border-blue-600 bg-blue-100": value.minute === minute,
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
