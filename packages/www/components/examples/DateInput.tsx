import { Temporal } from "@js-temporal/polyfill";
import { temporalToDate } from "@tempocal/core";
import { Calendar, useTempocal } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";
import { Select } from "../Select";

const locale = "en-US";

export function DateInput() {
  const [isOpen, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const {
    calendarProps,
    calendarValue,
    months,
    onChangeCalendarValue,
    onChangeSelectedValue,
  } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value,
  });

  const dateFormatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
    });
  }, []);

  return (
    <div className="flex items-start gap-4">
      <div className="bg-gray-100 text-gray-700 p-2 rounded relative">
        <input
          className="border-gray-300 rounded px-1 w-72"
          onClick={() => setOpen((isOpen) => !isOpen)}
          readOnly
          title={dateFormatter.format(temporalToDate(value))}
          type="text"
          value={`${value.year.toString().padStart(4, "0")}-${value.month
            .toString()
            .padStart(2, "0")}-${value.day.toString().padStart(2, "0")}`}
        />
        <div
          className="bg-gray-100 text-gray-700 p-2 rounded shadow-xl absolute top-13 left-0 right-0"
          hidden={!isOpen}
        >
          <Calendar
            {...calendarProps}
            calendarProps={() => ({
              className:
                "flex-shrink-0 gap-1 border border-gray-300 p-2 rounded text-center",
            })}
            headerProps={() => ({ className: "flex gap-2 mx-auto w-min" })}
            renderHeader={() => (
              <>
                <Select
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
            renderDay={({ date, plainDateLike }) => (
              <button
                className={classnames(
                  "w-full rounded border text-gray-700 transition-colors",
                  value.equals(date)
                    ? "border-blue-600 bg-blue-100"
                    : "border-gray-300 hover:bg-gray-100"
                )}
                onClick={() => onChangeSelectedValue(plainDateLike)}
                type="button"
              >
                {date.day}
              </button>
            )}
          />
        </div>
      </div>
      <p>
        This example uses a simple toggle to show and hide the calendar when the
        input is clicked. You are free to use whichever fancy library you have
        already installed!
      </p>
    </div>
  );
}
