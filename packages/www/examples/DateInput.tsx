import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import * as React from "react";
import { Calendar, Locale, useTempocal } from "../../lib";
import { Select } from "../Select";

export function DateInput({
  dateFormatter,
  locale,
}: {
  dateFormatter: Intl.DateTimeFormat;
  locale: Locale;
}) {
  const [isOpen, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const { calendarProps, calendarValue, months, onChangeCalendarValue } =
    useTempocal({
      locale,
      mode: "date",
      setValue,
      value,
    });

  const formattedDate = React.useMemo(() => {
    return dateFormatter.format(
      new Date(value.year, value.month - 1, value.day)
    );
  }, [dateFormatter, value]);

  React.useEffect(() => {
    setOpen(false);
  }, [value]);

  return (
    <div className="relative">
      <input
        className="rounded px-1"
        onClick={() => setOpen((isOpen) => !isOpen)}
        readOnly
        title={formattedDate}
        type="text"
        value={`${value.year.toString().padStart(4, "0")}-${value.month
          .toString()
          .padStart(2, "0")}-${value.day.toString().padStart(2, "0")}`}
      />
      <div className="absolute top-7 left-0" hidden={!isOpen}>
        <Calendar
          {...calendarProps}
          rollover
          calendarProps={() => ({
            className:
              "gap-1 bg-white border border-gray-300 p-2 rounded shadow text-center w-72",
          })}
          headerProps={() => ({ className: "flex gap-2 mx-auto w-min" })}
          renderHeader={() => (
            <>
              <Select
                className="ml-auto w-min rounded border border-gray-300 px-1 py-0.5"
                onChange={({ target: { value } }) =>
                  onChangeCalendarValue({ month: Number(value) })
                }
                title="Month"
                value={calendarValue.month}
              >
                {months.map(({ month, longName }) => (
                  <option key={longName} value={month}>
                    {longName}
                  </option>
                ))}
              </Select>
              <Select
                className="mr-auto w-min rounded border border-gray-300 px-1 py-0.5"
                onChange={({ target: { value } }) =>
                  onChangeCalendarValue({ year: Number(value) })
                }
                title="Year"
                value={calendarValue.year}
              >
                {[...Array(20)].map((_, year) => (
                  <option key={year} value={year - 10 + value.year}>
                    {year - 10 + value.year}
                  </option>
                ))}
              </Select>
            </>
          )}
          weekdayProps={() => ({ className: "font-medium" })}
          renderDay={(date, props) => (
            <button
              {...props}
              className={classnames(
                "w-full rounded border text-gray-700 transition-colors",
                value.equals(date)
                  ? "border-blue-600 bg-blue-100"
                  : "border-gray-300 hover:bg-gray-100"
              )}
              type="button"
            >
              {date.day}
            </button>
          )}
        />
      </div>
    </div>
  );
}
