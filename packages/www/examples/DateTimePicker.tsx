import { Temporal } from "@js-temporal/polyfill";
import { temporalToDate } from "@tempocal/core";
import { Calendar, useTempocal } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";
import { Code } from "../components/Code";
import { Select } from "../components/Select";

const locale = "en-US";

const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
  timeStyle: "short",
});

export function DateTimePicker() {
  const [clampSelectedValue, setClampSelectedValue] = React.useState(true);

  const [value, setValue] = React.useState(
    Temporal.PlainDateTime.from({
      year: 2021,
      month: 11,
      day: 25,
      hour: 8,
      minute: 30,
      second: 0,
    })
  );

  const [minValue] = React.useState(value.subtract({ years: 2 }));
  const [maxValue] = React.useState(value.add({ years: 2 }));

  const {
    calendarProps,
    calendarValue,
    months,
    hours,
    minutes,
    onChangeCalendarValue,
    onChangeSelectedValue,
  } = useTempocal({
    clampSelectedValue,
    locale,
    maxValue,
    minValue,
    mode: "datetime",
    setValue,
    value,
  });

  return (
    <div className="flex flex-col flex-shrink-0 gap-4 w-72">
      <Calendar
        {...calendarProps}
        rollover
        calendarProps={() => ({
          className: "bg-gray-100 text-gray-700 gap-1 p-2 text-center",
        })}
        headerProps={() => ({
          className: "flex items-center gap-2 font-bold",
        })}
        renderHeader={() => (
          <>
            <button
              className="mr-auto"
              onClick={() =>
                onChangeCalendarValue(calendarValue.subtract({ months: 1 }))
              }
              title="Previous month"
              type="button"
            >
              &larr;
            </button>
            {months[calendarValue.month - 1].longName}
            <button
              className="ml-auto"
              onClick={() =>
                onChangeCalendarValue(calendarValue.add({ months: 1 }))
              }
              title="Next month"
              type="button"
            >
              &rarr;
            </button>
          </>
        )}
        weekdayProps={() => ({ className: "font-medium" })}
        renderDay={({ date, disabled, plainDateLike }) => (
          <button
            className={classnames(
              "w-full overflow-hidden rounded border transition-colors",
              value.toPlainDate().equals(date)
                ? "border-blue-600 bg-blue-100"
                : "border-gray-300 hover:bg-gray-100"
            )}
            disabled={disabled}
            onClick={() => onChangeSelectedValue(plainDateLike)}
            type="button"
          >
            {date.day}
          </button>
        )}
        footerProps={() => ({
          className: "mx-auto flex w-min gap-2",
        })}
        renderFooter={() => (
          <>
            <Select
              onChange={({ target: { value } }) =>
                onChangeSelectedValue({ hour: Number(value) })
              }
              title="Hours"
              value={value.hour}
            >
              {hours.map(({ disabled, hour }) => (
                <option key={hour} disabled={disabled} value={hour}>
                  {`${hour}`.padStart(2, "0")}
                </option>
              ))}
            </Select>
            <Select
              onChange={({ target: { value } }) =>
                onChangeSelectedValue({ minute: Number(value) })
              }
              title="Minutes"
              value={value.minute}
            >
              {minutes
                .filter(({ minute }) => minute % 5 === 0)
                .map(({ disabled, minute }) => (
                  <option key={minute} disabled={disabled} value={minute}>
                    {`${minute}`.padStart(2, "0")}
                  </option>
                ))}
            </Select>
          </>
        )}
      />
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Props</legend>
        <div>
          <span className="block font-medium">Selected date</span>
          <span className="mt-1">
            {dateTimeFormatter.format(temporalToDate(value))}
          </span>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              aria-describedby="clampSelectedValue-description"
              checked={clampSelectedValue}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              id="clampSelectedValue"
              name="clampSelectedValue"
              onChange={() =>
                setClampSelectedValue(
                  (clampSelectedValue) => !clampSelectedValue
                )
              }
              type="checkbox"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="clampSelectedValue" className="font-medium">
              clampSelectedValue
            </label>
            <p id="clampSelectedValue-description">
              When <Code>minValue</Code> and/or <Code>maxValue</Code> are set,
              automatically keep <Code>value</Code> within those values.
            </p>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
