import { Temporal } from "@js-temporal/polyfill";
import { temporalToDate } from "@tempocal/core";
import { Calendar, Locale, useTempocal } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";
import { Code } from "../Code";
import { Input } from "../Input";
import { Select } from "../Select";

export function DatePicker() {
  const [clampCalendarValue, setClampCalendarValue] = React.useState(true);
  const [locale, setLocale] = React.useState<Locale>("en-US");
  const [rollover, setRollover] = React.useState(true);
  const [startOfWeek, setStartOfWeek] = React.useState(7);

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

  const getDayContent = React.useCallback(
    ({ year, month, day }: Temporal.PlainDate) => {
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
    },
    []
  );

  return (
    <div className="flex items-start gap-4">
      <div className="bg-gray-100 text-gray-700 p-2 rounded">
        <Calendar
          {...calendarProps}
          rollover={rollover}
          startOfWeek={startOfWeek}
          calendarProps={() => ({
            className:
              "flex-shrink-0 gap-1 border border-gray-300 p-2 rounded text-center w-72",
          })}
          headerProps={() => ({ className: "flex gap-2 mx-auto w-min" })}
          renderHeader={() => (
            <>
              <Select
                onChange={({ target: { value } }) =>
                  onChangeCalendarValue({ month: Number(value) })
                }
                title="Month"
                value={calendarValue.month}
              >
                {months.map(({ disabled, month, longName }) => (
                  <option key={longName} disabled={disabled} value={month}>
                    {longName}
                  </option>
                ))}
              </Select>
              <Select
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
        />
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Props</legend>
        <p>
          Building on the previous example, this one adds a bunch of fancy
          features: month and year selectors, min and max dates, disabled days
          are red, Monday's are 😭 and disabled, and December 25th is 🎄.
        </p>
        <div>
          <span className="block font-medium">Selected date</span>
          <span className="mt-1">
            {dateFormatter.format(temporalToDate(value))}
          </span>
        </div>
        <Select
          id="select-locale"
          label="Locale"
          onChange={({ target: { value } }) => setLocale(value)}
          title="Locale"
          value={locale}
        >
          <option value="en-US">en-US</option>
          <option value="es-ES">es-ES</option>
          <option value="fr-CA">fr-CA</option>
          <option value="pt-BR">pt-BR</option>
          <option value="uk-UA">uk-UA</option>
        </Select>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              aria-describedby="clampCalendarValue-description"
              checked={clampCalendarValue}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              id="clampCalendarValue"
              name="clampCalendarValue"
              onChange={() =>
                setClampCalendarValue(
                  (clampCalendarValue) => !clampCalendarValue
                )
              }
              type="checkbox"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="clampCalendarValue" className="font-medium">
              clampCalendarValue
            </label>
            <p id="clampCalendarValue-description">
              When <Code>minValue</Code> and/or <Code>maxValue</Code> are set,
              automatically keep <Code>calendarValue</Code> within those values.
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              aria-describedby="rollover-description"
              checked={rollover}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              id="rollover"
              name="rollover"
              onChange={() => setRollover((rollover) => !rollover)}
              type="checkbox"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="rollover" className="font-medium">
              rollover
            </label>
            <p id="rollover-description">
              Fill the calendar with days from the previous and next months.
            </p>
          </div>
        </div>
        <Input
          hint="Monday = 1 and Sunday = 7"
          id="startOfWeek"
          label="Start of week"
          max={7}
          min={1}
          name="startOfWeek"
          onChange={({ target: { value } }) => setStartOfWeek(Number(value))}
          type="number"
          value={startOfWeek}
        />
      </fieldset>
    </div>
  );
}
