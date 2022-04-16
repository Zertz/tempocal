import { Temporal } from "@js-temporal/polyfill";
import { temporalToDate } from "@tempocal/core";
import { Calendar, useTempocal } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";
import { Select } from "../Select";

const locale = "en-US";

export function DateTimePicker() {
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
    locale,
    maxValue,
    minValue,
    mode: "datetime",
    setValue,
    value,
  });

  const dateTimeFormatter = React.useMemo(() => {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
      timeStyle: "short",
    });
  }, []);

  return (
    <div className="flex items-start gap-4">
      <section className="w-72 rounded border border-gray-300 p-2">
        <header className="flex items-center gap-2 font-bold">
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
        </header>
        <Calendar
          {...calendarProps}
          rollover
          calendarProps={() => ({
            className: "gap-1 text-center",
          })}
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
                className="ml-auto w-min rounded border border-gray-300 px-1 py-0.5"
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
                className="mr-auto w-min rounded border border-gray-300 px-1 py-0.5"
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
      </section>
      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <div>
          <span className="block font-medium">Selected date</span>
          <span className="mt-1">
            {dateTimeFormatter.format(temporalToDate(value))}
          </span>
        </div>
      </div>
    </div>
  );
}
