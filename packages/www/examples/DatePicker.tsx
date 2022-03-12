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

  const [maxValue, setMaxValue] = React.useState(value.add({ years: 2 }));
  const [minValue, setMinValue] = React.useState(value.subtract({ years: 2 }));

  const [clampCalendarValue, setClampCalendarValue] = React.useState(true);
  const [rollover, setRollover] = React.useState(true);

  const {
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

  const formattedDate = React.useMemo(() => {
    return dateFormatter.format(
      new Date(value.year, value.month - 1, value.day)
    );
  }, [dateFormatter, value]);

  return (
    <div className="flex flex-col gap-4">
      <p>{formattedDate}</p>
      <label className="flex items-center gap-1">
        <input
          checked={rollover}
          onChange={() => setRollover((rollover) => !rollover)}
          type="checkbox"
        />
        <span>Display days from previous and next months</span>
      </label>
      <label className="flex items-center gap-1">
        <input
          checked={clampCalendarValue}
          onChange={() =>
            setClampCalendarValue((clampCalendarValue) => !clampCalendarValue)
          }
          type="checkbox"
        />
        <span>Clamp calendar within min and max values</span>
      </label>
      <Calendar
        locale={locale}
        onChange={onChangeSelectedValue}
        rollover={rollover}
        value={calendarValue}
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
            </select>
            <select
              className="border border-gray-300 mr-auto px-1 py-0.5 rounded w-min"
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
            </select>
          </>
        )}
        weekdayProps={() => ({ className: "font-medium" })}
        renderWeekday={({ weekday, narrowName }) =>
          weekday === 2 ? "😭" : narrowName
        }
        dayProps={(date) => ({
          className: classnames(
            "border overflow-hidden rounded text-gray-700 transition-colors w-full",
            "disabled:opacity-75 disabled:pointer-events-none disabled:text-red-400",
            calendarValue.month === date.month
              ? "text-gray-700"
              : "text-gray-400",
            value.equals(date)
              ? "bg-blue-100 border-blue-600"
              : "hover:bg-gray-100 border-gray-300"
          ),
          disabled: date.dayOfWeek === 1 && date.day % 5 !== 0,
        })}
        renderDay={({ year, month, day }) => {
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
        }}
      />
    </div>
  );
}
