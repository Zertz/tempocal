import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import * as React from "react";
import { Calendar, Locale, useTempocal } from "../../lib";

export function DatePicker({
  dateFormatter,
  locale,
}: {
  dateFormatter: Intl.DateTimeFormat;
  locale: Locale;
}) {
  const [value, setValue] = React.useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const { monthNames, onChange } = useTempocal({
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

  return (
    <div className="flex flex-col gap-4">
      <p>{formattedDate}</p>
      <Calendar
        locale={locale}
        onChange={onChange}
        rollover
        value={value}
        calendarProps={() => ({
          className:
            "gap-1 border border-gray-300 p-2 rounded text-center w-72",
        })}
        headerProps={() => ({ className: "flex gap-2" })}
        renderHeader={() => (
          <>
            <select
              className="border border-gray-300 ml-auto px-1 py-0.5 rounded w-min"
              onChange={({ target: { value } }) =>
                onChange({ month: Number(value) })
              }
              title="Month"
              value={value.month}
            >
              {monthNames.map((monthName, index) => (
                <option key={monthName} value={index + 1}>
                  {monthName}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-300 mr-auto px-1 py-0.5 rounded w-min"
              onChange={({ target: { value } }) =>
                onChange({ year: Number(value) })
              }
              title="Year"
              value={value.year}
            >
              {[...Array(20)].map((_, year) => (
                <option key={year} value={year - 10 + value.year}>
                  {year - 10 + value.year}
                </option>
              ))}
            </select>
          </>
        )}
        weekdayProps={() => ({ className: "font-medium" })}
        renderWeekday={({ weekday, weekdayName }) =>
          weekday === 1 ? "😭" : weekdayName
        }
        dayProps={(date) => ({
          className: classnames(
            "border overflow-hidden rounded transition-colors w-full",
            "disabled:opacity-75 disabled:pointer-events-none disabled:text-red-400",
            value.month === date.month ? "text-gray-700" : "text-gray-400",
            value.equals(date)
              ? "bg-blue-100 border-blue-600"
              : "hover:bg-gray-100 border-gray-300"
          ),
          disabled: date.dayOfWeek === 1 && date.day % 5 !== 0,
        })}
        renderDay={({ year, month, day }) => {
          if (value.month === 12 && day === 25) {
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
        }}
      />
    </div>
  );
}
