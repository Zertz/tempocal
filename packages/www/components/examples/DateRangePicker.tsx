import { Temporal } from "@js-temporal/polyfill";
import { Calendar, useTempocal } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";

type DateRange =
  | [undefined, undefined]
  | [Temporal.PlainDate, undefined]
  | [Temporal.PlainDate, Temporal.PlainDate];

const locale = "en-US";

export function DateRangePicker() {
  const [values, setValues] = React.useState<DateRange>([
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    }),
    Temporal.PlainDate.from({
      year: 2021,
      month: 12,
      day: 25,
    }),
  ]);

  const [hoverValue, setHoveredValue] = React.useState<Temporal.PlainDate>();

  const setValue = React.useCallback((value: Temporal.PlainDate) => {
    setValues(([value1, value2]) => {
      if (value1 && !value2) {
        return [value1, value].sort(Temporal.PlainDate.compare) as DateRange;
      }

      return [value, undefined] as DateRange;
    });
  }, []);

  const { calendarProps, months, onChangeSelectedValue } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value: values[0],
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
      <div className="flex w-min flex-col gap-4 rounded border border-gray-300 p-2 pt-0.5">
        <Calendar
          {...calendarProps}
          monthsAfter={1}
          calendarProps={() => ({
            className: "gap-1 text-center w-72",
          })}
          headerProps={() => ({ className: "font-bold" })}
          renderHeader={(date) => months[date.month - 1].longName}
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
                  "w-full overflow-hidden rounded border text-gray-700 transition-colors",
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
        />
      </div>
      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <p>
          🚧 Although this example is still a work in progress, it shows one of
          the many ways a date range picker can work.
        </p>
        <div>
          <span className="block font-medium">Selected date range</span>
          <span className="mt-1">
            {formattedDates[0]} - {formattedDates[1]}
          </span>
        </div>
      </div>
    </div>
  );
}
