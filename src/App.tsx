import { Temporal, toTemporalInstant } from "@js-temporal/polyfill";
import classnames from "classnames";
import { useRef, useState } from "react";
import { useTempocal } from "./useTempocal";

// @ts-expect-error
Date.prototype.toTemporalInstant = toTemporalInstant;

export function App() {
  const [locale, setLocale] = useState("en-US");

  const date = useRef(new Date());

  const [value, setValue] = useState(
    new Temporal.PlainDate(
      date.current.getFullYear(),
      date.current.getMonth() + 1,
      date.current.getDate()
    )
  );

  const { monthName, monthNames, monthStartDay, onChange, weekdayNames } =
    useTempocal("date", { locale, setValue, value });

  return (
    <div className="flex flex-col gap-8 px-12 pt-8">
      <h1 className="text-7xl">Tempocal</h1>
      <p>{value.toLocaleString()}</p>
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
                  "border hover:bg-gray-100 overflow-hidden rounded transition-colors w-full",
                  value.month === i + 1 ? "border-blue-400" : "border-gray-300"
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
        <ul
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${value.daysInWeek}, minmax(0, 1fr))`,
          }}
        >
          {weekdayNames.map((weekDay) => (
            <li key={weekDay}>{weekDay}</li>
          ))}
          {[...Array(value.daysInMonth)].map((_, day) => (
            <li
              key={day}
              className={classnames(
                "",
                day === 0
                  ? {
                      "col-start-1": monthStartDay === 0,
                      "col-start-2": monthStartDay === 1,
                      "col-start-3": monthStartDay === 2,
                      "col-start-4": monthStartDay === 3,
                      "col-start-5": monthStartDay === 4,
                      "col-start-6": monthStartDay === 5,
                      "col-start-7": monthStartDay === 6,
                    }
                  : undefined
              )}
            >
              <button
                className={classnames(
                  "border hover:bg-gray-100 overflow-hidden rounded transition-colors w-full",
                  value.day === day + 1 ? "border-blue-400" : "border-gray-300"
                )}
                onClick={() => onChange({ day: day + 1 })}
                type="button"
              >
                {day + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
