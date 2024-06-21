import { Temporal } from "@js-temporal/polyfill";
import { getNow, temporalToDate } from "@tempocal/core";
import { Calendar, Locale, useTempocal } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";
import { CalendarHeader } from "../recipes/CalendarHeader";

const getDayContent = ({ year, month, day }: Temporal.PlainDate) => {
  if (month === 12 && day === 25) {
    return "🎄";
  }

  if (year === 2021 && month === 11 && day === 25) {
    return "⭐️";
  }

  const now = getNow();

  if (year === now.year && month === now.month && day === now.day) {
    return "📅";
  }

  return day;
};

export function DatePicker({
  clampCalendarValue,
  locale,
  rollover,
  startOfWeek,
}: {
  clampCalendarValue: boolean;
  locale: Locale;
  rollover: boolean;
  startOfWeek: number;
}) {
  const [value, setValue] = React.useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const [minValue] = React.useState(value.subtract({ years: 2 }));
  const [maxValue] = React.useState(value.add({ years: 2 }));

  const {
    calendarProps,
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

  return (
    <Calendar
      {...calendarProps}
      rollover={rollover}
      startOfWeek={startOfWeek}
      calendarProps={() => ({
        className: "gap-1 text-center w-72",
      })}
      headerProps={() => ({ className: "flex items-center gap-2" })}
      renderHeader={() => (
        <CalendarHeader
          calendarProps={calendarProps}
          months={months}
          onChangeCalendarValue={onChangeCalendarValue}
          years={years}
        />
      )}
      weekdayProps={() => ({ className: "font-medium" })}
      renderWeekday={({ dayOfWeek, narrowName }) =>
        dayOfWeek === 1 ? "😭" : narrowName
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
      footerProps={() => ({
        className: "text-sm",
      })}
      renderFooter={() =>
        `Selected date: ${dateFormatter.format(temporalToDate(value))}`
      }
    />
  );
}
