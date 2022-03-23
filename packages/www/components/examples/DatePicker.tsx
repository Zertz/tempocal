import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import * as React from "react";
import { Calendar, useTempocal } from "../../../lib";
import { Select } from "../Select";
import { Props, useProps } from "./Props";

export function DatePicker() {
  const [value, setValue] = React.useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const [maxValue] = React.useState(value.add({ years: 2 }));
  const [minValue] = React.useState(value.subtract({ years: 2 }));

  const {
    clampCalendarValue,
    setClampCalendarValue,
    locale,
    setLocale,
    rollover,
    setRollover,
  } = useProps();

  const {
    calendarProps,
    calendarValue,
    months,
    onChangeCalendarValue,
    onChangeSelectedValue,
    years,
  } = useTempocal({
    clampCalendarValue,
    locale,
    maxValue,
    minValue,
    mode: "date",
    setValue,
    value,
  });

  const dateFormatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
    });
  }, [locale]);

  const formattedDate = React.useMemo(() => {
    return dateFormatter.format(
      new Date(value.year, value.month - 1, value.day)
    );
  }, [dateFormatter, value]);

  const getDayContent = React.useCallback(({ year, month, day }) => {
    if (month === 12 && day === 25) {
      return "🎄";
    }

    if (year === 2021 && month === 11 && day === 25) {
      return "⭐️";
    }

    const now = Temporal.Now.plainDate("iso8601");

    if (year === now.year && month === now.month && day === now.day) {
      return "📅";
    }

    return day;
  }, []);

  return (
    <div className="flex items-start gap-4">
      <Calendar
        {...calendarProps}
        rollover={rollover}
        calendarProps={() => ({
          className:
            "flex-shrink-0 gap-1 border border-gray-300 p-2 rounded text-center w-72",
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
              {months.map(({ month, longName, available }) => (
                <option key={longName} disabled={!available} value={month}>
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
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </>
        )}
        weekdayProps={() => ({ className: "font-medium" })}
        renderWeekday={({ weekday, narrowName }) =>
          weekday === 2 ? "😭" : narrowName
        }
        renderDay={({ date, disabled, plainDateLike }) => (
          <button
            className={classnames(
              "w-full rounded border text-gray-700 transition-colors",
              "disabled:pointer-events-none disabled:text-red-400 disabled:opacity-75",
              value.equals(date)
                ? "border-blue-600 bg-blue-100"
                : "border-gray-300 hover:bg-gray-100"
            )}
            disabled={disabled || date.dayOfWeek === 1}
            onClick={() => onChangeSelectedValue(plainDateLike)}
            type="button"
          >
            {getDayContent(date)}
          </button>
        )}
      />
      <Props
        clampCalendarValue={clampCalendarValue}
        setClampCalendarValue={setClampCalendarValue}
        locale={locale}
        setLocale={setLocale}
        rollover={rollover}
        setRollover={setRollover}
        formattedDate={formattedDate}
      />
    </div>
  );
}
