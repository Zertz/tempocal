import { temporalToDate } from "@tempocal/core";
import { Calendar, useTempocal, useTemporalState } from "@tempocal/react";
import classnames from "classnames";
import * as React from "react";
import { CalendarHeader } from "../recipes/CalendarHeader";

const locale = "en-US";

const dateTimeFormatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "long",
  timeStyle: "short",
});

export function DateTimePicker({
  clampSelectedValue,
}: {
  clampSelectedValue: boolean;
}) {
  const [value, setValue] = useTemporalState("datetime", {
    year: 2021,
    month: 11,
    day: 25,
    hour: 8,
    minute: 30,
    second: 0,
  });

  const [minValue] = React.useState(value.subtract({ years: 2 }));
  const [maxValue] = React.useState(value.add({ years: 2 }));

  const {
    calendarProps,
    years,
    months,
    hours,
    minutes,
    onChangeCalendarValue,
    onChangeSelectedValue,
  } = useTempocal({
    clampSelectedValue,
    locale: "en-US",
    maxValue,
    minValue,
    mode: "datetime",
    setValue,
    value,
  });

  return (
    <Calendar
      {...calendarProps}
      rollover
      calendarProps={() => ({
        className: "gap-1 text-center w-72",
      })}
      headerProps={() => ({ className: "flex items-center gap-2" })}
      renderHeader={() => (
        <CalendarHeader
          calendarProps={calendarProps}
          months={months}
          onChangeCalendarValue={onChangeCalendarValue}
          years={years}
        />
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
        className: "mt-1 mx-auto grid grid-rows-2 grid-cols-2 gap-2",
      })}
      renderFooter={() => (
        <>
          <select
            className="ml-auto"
            onChange={({ target: { value } }) => {
              onChangeSelectedValue({ hour: Number(value) });
            }}
            title="Hours"
            value={value.hour}
          >
            {hours.map(({ disabled, hour }) => (
              <option key={hour} disabled={disabled} value={hour}>
                {`${hour}`.padStart(2, "0")}
              </option>
            ))}
          </select>
          <select
            onChange={({ target: { value } }) => {
              onChangeSelectedValue({ minute: Number(value) });
            }}
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
          </select>
          <span className="row-start-2 col-span-2 text-sm">
            {`Selected date and time: ${dateTimeFormatter.format(
              temporalToDate(value)
            )}`}
          </span>
        </>
      )}
    />
  );
}
