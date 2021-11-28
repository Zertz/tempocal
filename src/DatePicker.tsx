import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import { useState } from "react";
import { Calendar } from "./Calendar";
import { Locale } from "./types";
import { useTempocal } from "./useTempocal";

export function DatePicker({
  dateFormatter,
  locale,
}: {
  dateFormatter: Intl.DateTimeFormat;
  locale: Locale;
}) {
  const [value, setValue] = useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const { monthName, monthNames, onChange, onSelect } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value,
  });

  return (
    <div className="flex flex-col gap-8 pt-8">
      <h2 className="text-3xl">DatePicker</h2>
      <p>{dateFormatter.format(new Date(value.toLocaleString()))}</p>
      <select
        className="border border-gray-300 px-1 py-0.5 rounded w-min"
        onChange={({ target: { value } }) => onChange({ year: Number(value) })}
        title="Year"
        value={value.year}
      >
        {[...Array(20)].map((_, year) => (
          <option key={year} value={year + 2010}>
            {year + 2010}
          </option>
        ))}
      </select>
      <div className="flex flex-col text-center w-64">
        <ul
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
          }}
        >
          {monthNames.map((monthName, i) => (
            <li key={monthName}>
              <button
                className={classnames(
                  "border overflow-hidden rounded transition-colors w-full",
                  value.month === i + 1
                    ? "bg-blue-100 border-blue-600"
                    : "hover:bg-gray-100 border-gray-300"
                )}
                onClick={() => onChange({ month: i + 1 })}
                type="button"
              >
                {monthName}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Calendar
        locale={locale}
        onSelect={onSelect}
        rollover
        value={value}
        headerProps={() => ({ className: "font-bold" })}
        renderHeader={() => monthName}
        monthProps={() => ({
          className:
            "gap-1 border border-gray-300 p-2 rounded text-center w-72",
        })}
        weekdayProps={() => ({ className: "font-medium" })}
        renderWeekday={({ weekday, weekdayName }) =>
          weekday === 1 ? "😭" : weekdayName
        }
        dayProps={(day) => ({
          className: classnames(
            "border overflow-hidden rounded transition-colors w-full",
            "disabled:opacity-75 disabled:pointer-events-none disabled:text-red-400",
            value.month === day.month ? "text-gray-700" : "text-gray-400",
            value.equals(day)
              ? "bg-blue-100 border-blue-600"
              : "hover:bg-gray-100 border-gray-300"
          ),
          disabled: day.dayOfWeek === 1 && day.day % 5 !== 0,
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
