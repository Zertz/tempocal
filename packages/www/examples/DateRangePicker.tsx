import { Temporal } from "@js-temporal/polyfill";
import {
  getMonthEndDate,
  getMonthStartDate,
  temporalToDate,
} from "@tempocal/core";
import { Calendar, DateRange, useTempocalRange } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";
import { CalendarHeader } from "../recipes/CalendarHeader";

const locale = "en-US";

const dateFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
});

export function DateRangePicker({
  monthsAfter,
  monthsBefore,
  monthsFixedGrid,
}: {
  monthsAfter: number;
  monthsBefore: number;
  monthsFixedGrid: boolean;
}) {
  const [values, setValues] = React.useState<DateRange>({
    start: Temporal.Now.plainDate("iso8601").subtract({ days: 3 }),
    end: Temporal.Now.plainDate("iso8601").add({ days: 3 }),
  });

  const [minValue] = React.useState(
    Temporal.Now.plainDate("iso8601").subtract({ years: 2 })
  );

  const [maxValue] = React.useState(
    Temporal.Now.plainDate("iso8601").add({ years: 2 })
  );

  const [hoverValue, setHoveredValue] = React.useState<Temporal.PlainDate>();

  const {
    calendarProps,
    months,
    onChangeCalendarValue,
    onChangeSelectedValue,
    years,
  } = useTempocalRange({
    clampCalendarValue: true,
    locale,
    maxValue,
    minValue,
    mode: "daterange",
    setValue: setValues,
    value: values,
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Calendar
        {...calendarProps}
        monthsBefore={monthsBefore}
        monthsAfter={monthsAfter}
        monthsFixedGrid={monthsFixedGrid}
        calendarProps={() => ({
          className: "gap-1 text-center w-72",
        })}
        headerProps={({ date }) => ({
          className: classnames("flex items-center gap-2", {
            "mx-auto":
              date.year !== calendarProps.value.year ||
              date.month !== calendarProps.value.month,
          }),
        })}
        renderHeader={({ date }) => {
          if (
            date.year !== calendarProps.value.year ||
            date.month !== calendarProps.value.month
          ) {
            return months[date.month - 1].longName;
          }

          return (
            <CalendarHeader
              calendarProps={calendarProps}
              months={months}
              onChangeCalendarValue={onChangeCalendarValue}
              years={years}
            />
          );
        }}
        weekdayProps={() => ({ className: "font-medium" })}
        renderDay={({ date, disabled, plainDateLike }) => {
          const isRangeSelected =
            values.start &&
            values.end &&
            Temporal.PlainDate.compare(values.start, date) <= 0 &&
            Temporal.PlainDate.compare(values.end, date) >= 0;

          const isSelected =
            values.start && !values.end && values.start.equals(date);

          const isRangeHovered =
            values.start &&
            !values.end &&
            hoverValue &&
            ((Temporal.PlainDate.compare(values.start, date) <= 0 &&
              Temporal.PlainDate.compare(hoverValue, date) >= 0) ||
              (Temporal.PlainDate.compare(hoverValue, date) <= 0 &&
                Temporal.PlainDate.compare(values.start, date) >= 0));

          return (
            <button
              className={classnames(
                "w-full rounded border text-gray-700 transition-colors",
                "disabled:pointer-events-none disabled:text-red-400 disabled:opacity-75",
                isRangeSelected || isSelected
                  ? "border-blue-600 bg-blue-100"
                  : isRangeHovered
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-100"
              )}
              disabled={disabled}
              onClick={() => onChangeSelectedValue(plainDateLike)}
              onMouseOver={() => setHoveredValue(date)}
              type="button"
            >
              {date.day}
            </button>
          );
        }}
        footerProps={() => ({
          className: "grid grid-rows-2 auto-cols-auto gap-2",
        })}
        renderFooter={({ date }) => (
          <>
            <button
              className="text-sm border-gray-300 whitespace-nowrap px-2 py-1 bg-white hover:bg-gray-50 rounded border text-gray-700 transition-colors"
              onClick={() => {
                onChangeSelectedValue({
                  start: getMonthStartDate(date),
                  end: getMonthEndDate(date),
                });
              }}
              type="button"
            >
              Select month
            </button>
            <button
              className="text-sm border-gray-300 whitespace-nowrap px-2 py-1 bg-white hover:bg-gray-50 rounded border text-gray-700 transition-colors"
              onClick={() => {
                onChangeSelectedValue({
                  start: getMonthStartDate(date.with({ month: 1 })),
                  end: getMonthEndDate(date.with({ month: date.monthsInYear })),
                });
              }}
              type="button"
            >
              Select year
            </button>
            <button
              className="text-sm border-gray-300 whitespace-nowrap px-2 py-1 bg-white hover:bg-gray-50 rounded border text-gray-700 transition-colors"
              onClick={() => {
                onChangeSelectedValue({
                  start: undefined,
                  end: undefined,
                });
              }}
              type="button"
            >
              Clear
            </button>
            <span className="row-start-2 col-span-3 text-sm">
              {`Selected date range: ${
                values.start
                  ? dateFormatter.format(temporalToDate(values.start))
                  : ""
              } - ${
                values.end
                  ? dateFormatter.format(temporalToDate(values.end))
                  : ""
              }`}
            </span>
          </>
        )}
      />
    </div>
  );
}
