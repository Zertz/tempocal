import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
import classnames from "classnames";
import { useMemo, useState } from "react";

// @ts-expect-error
Date.prototype.toTemporalInstant = toTemporalInstant;

function useMonthNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  monthsInYear: number
) {
  return useMemo(() => {
    const monthNames: string[] = [];

    for (let i = 0; i < monthsInYear; i += 1) {
      const date = new Date(
        `2017-${`${i + 1}`.padStart(2, "0")}-01T12:00:00.000Z`
      );

      const month = new Intl.DateTimeFormat(locale, {
        month: "long",
      }).format(date);

      monthNames.push(month);
    }

    return monthNames;
  }, [locale, monthsInYear]);
}

function useWeekdayNames(
  locale: Parameters<typeof Intl.DateTimeFormat>[0],
  daysInWeek: number
) {
  return useMemo(() => {
    const weekdayNames: string[] = [];

    for (let i = 0; i < daysInWeek; i += 1) {
      const date = new Date(
        `2017-01-${`${i + 1}`.padStart(2, "0")}T12:00:00.000Z`
      );

      const weekday = new Intl.DateTimeFormat(locale, {
        weekday: "short",
      }).format(date);

      weekdayNames.push(weekday);
    }

    return weekdayNames;
  }, [daysInWeek, locale]);
}

function useTempocal(locale: Parameters<typeof Intl.DateTimeFormat>[0]) {
  const now = Temporal.Now.plainDate("iso8601");

  const plainYearMonth = new Temporal.PlainYearMonth(now.year, now.month);

  const monthStartDay = plainYearMonth.toPlainDate({ day: 1 }).dayOfWeek;

  const monthNames = useMonthNames(locale, now.monthsInYear);
  const weekdayNames = useWeekdayNames(locale, now.daysInWeek);

  return {
    daysInWeek: now.daysInWeek,
    daysInMonth: now.daysInMonth,
    daysInYear: now.daysInYear,
    month: now.month,
    monthName: monthNames[now.month - 1],
    monthNames,
    monthStartDay,
    weekdayNames,
  };
}

export function App() {
  const [locale, setLocale] = useState("en-US");

  const {
    daysInMonth,
    daysInWeek,
    monthName,
    monthNames,
    monthStartDay,
    weekdayNames,
  } = useTempocal(locale);

  return (
    <div className="flex flex-col gap-8 px-12 pt-8">
      <h1 className="text-7xl">Tempocal</h1>
      <select
        className="border border-gray-500 px-1 py-0.5 rounded w-min"
        onChange={({ target: { value } }) => setLocale(value)}
        value={locale}
      >
        <option value="en-US">en-US</option>
        <option value="es-ES">es-ES</option>
        <option value="fr-CA">fr-CA</option>
      </select>
      <div className="flex flex-col text-center w-64">
        {monthName}
        <ul
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${daysInWeek}, minmax(0, 1fr))`,
          }}
        >
          {weekdayNames.map((weekDay) => (
            <li key={weekDay}>{weekDay}</li>
          ))}
          {[...Array(daysInMonth)].map((_, day) => (
            <li
              key={day}
              className={classnames(
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
              {day + 1}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col text-center w-64">
        <ul
          className="grid"
          style={{
            gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
          }}
        >
          {monthNames.map((monthName) => (
            <li key={monthName}>{monthName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
