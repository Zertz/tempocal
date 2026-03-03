import { temporalToDate } from "@tempocal/core";
import { Calendar, useTempocal, useTemporalState } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";
import { CalendarHeader } from "../recipes/CalendarHeader";

const locale = "en-US";

const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
});

export function DateInput() {
  const [isOpen, setOpen] = React.useState(false);

  const [value, setValue] = useTemporalState("date", {
    year: 2021,
    month: 11,
    day: 25,
  });

  const {
    calendarProps,
    months,
    onChangeCalendarValue,
    onChangeSelectedValue,
  } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value,
  });

  return (
    <div className="flex flex-col flex-shrink-0 gap-4 relative">
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
        className="shadow-xl absolute top-14 left-0 right-0 z-10"
        hidden={!isOpen}
      >
        <Calendar
          {...calendarProps}
          calendarProps={() => ({
            className:
              "bg-gray-100 text-gray-700 gap-1 p-2 rounded text-center",
          })}
          headerProps={() => ({ className: "flex items-center gap-2" })}
          renderHeader={() => (
            <CalendarHeader
              calendarProps={calendarProps}
              months={months}
              onChangeCalendarValue={onChangeCalendarValue}
              years={[...Array(20)].map((_, year) => year - 10 + value.year)}
            />
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
              onClick={() => {
                onChangeSelectedValue(plainDateLike);

                setOpen(false);
              }}
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
