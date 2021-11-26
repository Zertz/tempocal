import { Temporal, toTemporalInstant } from "@js-temporal/polyfill";
import classnames from "classnames";
import { useMemo, useState } from "react";
import { Calendar } from "./Calendar";
import { Locale } from "./types";
import { useTempocal } from "./useTempocal";

// @ts-expect-error
Date.prototype.toTemporalInstant = toTemporalInstant;

export function App() {
  const [locale, setLocale] = useState<Locale>("en-US");

  const [value, setValue] = useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const { monthName, monthNames, onChange } = useTempocal("date", {
    locale,
    setValue,
    value,
  });

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "long",
      }),
    [locale]
  );

  return (
    <div className="flex flex-col gap-8 px-12 pt-8">
      <h1 className="text-7xl">Tempocal</h1>
      <p>{dateFormatter.format(new Date(value.toLocaleString()))}</p>
      <select
        className="border border-gray-300 px-1 py-0.5 rounded w-min"
        onChange={({ target: { value } }) => setLocale(value)}
        title="Locale"
        value={locale}
      >
        <option value="en-US">en-US</option>
        <option value="es-ES">es-ES</option>
        <option value="fr-CA">fr-CA</option>
      </select>
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
                    ? "bg-blue-200 border-blue-600"
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
      <div className="flex flex-col text-center w-64">
        {monthName}
        <Calendar
          locale={locale}
          onChange={onChange}
          value={value}
          dayClassName={(day) =>
            classnames(
              "border overflow-hidden rounded transition-colors w-full",
              value.day === day
                ? "bg-blue-200 border-blue-600"
                : "hover:bg-gray-100 border-gray-300"
            )
          }
          monthClassName={() => "gap-1"}
          weekdayClassName={() => "font-medium"}
          renderDay={({ day }) => {
            if (value.month === 12 && day === 25) {
              return "🎄";
            }

            const now = Temporal.Now.plainDate("iso8601");

            if (
              day === now.day &&
              now.month === value.month &&
              now.year === value.year
            ) {
              return "⭐️";
            }

            return day;
          }}
          renderWeekday={({ weekday, weekdayName }) =>
            weekday === 2 ? "😭" : weekdayName
          }
        />
      </div>
    </div>
  );
}
