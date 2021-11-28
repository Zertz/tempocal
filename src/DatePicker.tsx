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
      <div className="flex gap-4 border border-gray-300 p-2 pt-0.5 rounded w-min">
        <div className="flex flex-col text-center w-64">
          {monthName}
          <Calendar
            className="gap-1"
            locale={locale}
            onSelect={onSelect}
            value={value}
            dayClassName={(day) =>
              classnames(
                "border overflow-hidden rounded text-gray-700 transition-colors w-full",
                value.equals(day)
                  ? "bg-blue-100 border-blue-600"
                  : "hover:bg-gray-100 border-gray-300"
              )
            }
            weekdayClassName={() => "font-medium"}
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
            renderWeekday={({ weekday, weekdayName }) =>
              weekday === 1 ? "😭" : weekdayName
            }
          />
        </div>
      </div>
    </div>
  );
}
