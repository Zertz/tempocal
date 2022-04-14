import { Temporal } from "@js-temporal/polyfill";
import { getMonthEndDate, getMonthStartDate } from "@tempocal/core";
import { Calendar, DateRange, useTempocal } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";
import { Input } from "../Input";
import { Select } from "../Select";

const locale = "en-US";

export function DateRangePicker() {
  const [monthsBefore, setMonthsBefore] = React.useState(0);
  const [monthsAfter, setMonthsAfter] = React.useState(0);

  const [values, setValues] = React.useState<DateRange>([
    Temporal.Now.plainDate("iso8601").subtract({ days: 3 }),
    Temporal.Now.plainDate("iso8601").add({ days: 3 }),
  ]);

  const [minValue] = React.useState(
    Temporal.Now.plainDate("iso8601").subtract({ years: 2 })
  );

  const [maxValue] = React.useState(
    Temporal.Now.plainDate("iso8601").add({ years: 2 })
  );

  const [hoverValue, setHoveredValue] = React.useState<Temporal.PlainDate>();

  const {
    calendarProps,
    calendarValue,
    months,
    onChangeCalendarValue,
    onChangeSelectedValue,
    years,
  } = useTempocal({
    clampCalendarValue: true,
    locale,
    maxValue,
    minValue,
    mode: "daterange",
    setValue: setValues,
    value: values,
  });

  const dateFormatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
    });
  }, []);

  const formattedDates = React.useMemo(() => {
    return [
      values[0]
        ? dateFormatter.format(
            new Date(values[0].year, values[0].month - 1, values[0].day)
          )
        : null,
      values[1]
        ? dateFormatter.format(
            new Date(values[1].year, values[1].month - 1, values[1].day)
          )
        : null,
    ];
  }, [dateFormatter, values]);

  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-wrap gap-2 bg-gray-100 text-gray-700 p-2 rounded">
        <Calendar
          {...calendarProps}
          monthsBefore={monthsBefore}
          monthsAfter={monthsAfter}
          calendarProps={() => ({
            className:
              "flex-shrink-0 gap-1 border border-gray-300 text-gray-700 p-2 rounded text-center w-72",
          })}
          headerProps={({ date }) => ({
            className: classnames("flex gap-2 font-bold", {
              "mx-auto":
                date.year !== calendarValue.year ||
                date.month !== calendarValue.month,
            }),
          })}
          renderHeader={({ date }) => {
            if (
              date.year !== calendarValue.year ||
              date.month !== calendarValue.month
            ) {
              return months[date.month - 1].longName;
            }

            return (
              <>
                <button
                  onClick={() =>
                    onChangeCalendarValue(calendarValue.subtract({ months: 1 }))
                  }
                  title="Previous month"
                  type="button"
                >
                  &larr;
                </button>
                <Select
                  className="ml-auto"
                  onChange={({ target: { value } }) =>
                    onChangeCalendarValue({ month: Number(value) })
                  }
                  title="Month"
                  value={calendarValue.month}
                >
                  {months.map(({ disabled, month, longName }) => (
                    <option key={longName} disabled={disabled} value={month}>
                      {longName}
                    </option>
                  ))}
                </Select>
                <Select
                  className="mr-auto"
                  onChange={({ target: { value } }) =>
                    onChangeCalendarValue({ year: Number(value) })
                  }
                  title="Year"
                  value={calendarValue.year}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
                <button
                  onClick={() =>
                    onChangeCalendarValue(calendarValue.add({ months: 1 }))
                  }
                  title="Next month"
                  type="button"
                >
                  &rarr;
                </button>
              </>
            );
          }}
          weekdayProps={() => ({ className: "font-medium" })}
          renderDay={({ date, disabled, plainDateLike }) => {
            const isRangeSelected =
              values[0] &&
              values[1] &&
              Temporal.PlainDate.compare(values[0], date) <= 0 &&
              Temporal.PlainDate.compare(values[1], date) >= 0;

            const isSelected =
              values[0] && !values[1] && values[0].equals(date);

            const isRangeHovered =
              values[0] &&
              !values[1] &&
              hoverValue &&
              ((Temporal.PlainDate.compare(values[0], date) <= 0 &&
                Temporal.PlainDate.compare(hoverValue, date) >= 0) ||
                (Temporal.PlainDate.compare(hoverValue, date) <= 0 &&
                  Temporal.PlainDate.compare(values[0], date) >= 0));

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
            className: "flex gap-2 mx-auto",
          })}
          renderFooter={({ date }) => (
            <>
              <button
                className="text-sm w-min border-gray-300 whitespace-nowrap px-2 py-1 bg-white hover:bg-gray-50 rounded border text-gray-700 transition-colors"
                onClick={() => {
                  onChangeSelectedValue([
                    getMonthStartDate(date),
                    getMonthEndDate(date),
                  ]);
                }}
                type="button"
              >
                Select month
              </button>
              <button
                className="text-sm w-min border-gray-300 whitespace-nowrap px-2 py-1 bg-white hover:bg-gray-50 rounded border text-gray-700 transition-colors"
                onClick={() => {
                  onChangeSelectedValue([
                    getMonthStartDate(date.with({ month: 1 })),
                    getMonthEndDate(date.with({ month: date.monthsInYear })),
                  ]);
                }}
                type="button"
              >
                Select year
              </button>
              <button
                className="text-sm w-min border-gray-300 whitespace-nowrap px-2 py-1 bg-white hover:bg-gray-50 rounded border text-gray-700 transition-colors"
                onClick={() => {
                  onChangeSelectedValue([undefined, undefined]);
                }}
                type="button"
              >
                Clear
              </button>
            </>
          )}
        />
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Props</legend>
        <p>
          This example shows one of the many ways a date range picker can work.
        </p>
        <div>
          <span className="block text-sm font-medium">Selected date range</span>
          <span className="mt-1 text-sm">
            {formattedDates[0]} - {formattedDates[1]}
          </span>
        </div>
        <Input
          hint="Number of months to show before the primary calendar"
          id="monthsBefore"
          label="Months before"
          min={0}
          name="monthsBefore"
          onChange={({ target: { value } }) => setMonthsBefore(Number(value))}
          type="number"
          value={monthsBefore}
        />
        <Input
          hint="Number of months to show after the primary calendar"
          id="monthsAfter"
          label="Months after"
          min={0}
          name="monthsAfter"
          onChange={({ target: { value } }) => setMonthsAfter(Number(value))}
          type="number"
          value={monthsAfter}
        />
      </fieldset>
    </div>
  );
}
