import { Temporal } from "@js-temporal/polyfill";
import { useTempocal } from "@tempocal/react";

export function CalendarHeader({
  calendarProps,
  months,
  onChangeCalendarValue,
  years,
}: Pick<
  ReturnType<typeof useTempocal>,
  "calendarProps" | "months" | "onChangeCalendarValue" | "years"
>) {
  return (
    <>
      {/* Go to the previous month */}
      <button
        className="disabled:opacity-50"
        disabled={
          calendarProps.minValue &&
          Temporal.PlainYearMonth.compare(
            calendarProps.value,
            calendarProps.minValue
          ) <= 0
        }
        onClick={() => {
          onChangeCalendarValue(calendarProps.value.subtract({ months: 1 }));
        }}
        title="Previous month"
        type="button"
      >
        &larr;
      </button>
      {/* Jump to a specific month */}
      <select
        className="ml-auto"
        onChange={({ target: { value } }) => {
          onChangeCalendarValue({ month: Number(value) });
        }}
        title="Month"
        value={calendarProps.value.month}
      >
        {months.map(({ disabled, month, longName }) => (
          <option key={longName} disabled={disabled} value={month}>
            {longName}
          </option>
        ))}
      </select>
      {/* Jump to a specific year */}
      <select
        className="mr-auto"
        onChange={({ target: { value } }) => {
          onChangeCalendarValue({ year: Number(value) });
        }}
        title="Year"
        value={calendarProps.value.year}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      {/* Go to the next month */}
      <button
        className="disabled:opacity-50"
        disabled={
          calendarProps.maxValue &&
          Temporal.PlainYearMonth.compare(
            calendarProps.value,
            calendarProps.maxValue
          ) >= 0
        }
        onClick={() => {
          onChangeCalendarValue(calendarProps.value.add({ months: 1 }));
        }}
        title="Next month"
        type="button"
      >
        &rarr;
      </button>
    </>
  );
}
