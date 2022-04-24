import { useTempocal } from "@tempocal/react";
import { Select } from "../components/Select";

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
      {/* Left arrow to go to the previous month */}
      <button
        className="disabled:opacity-50"
        disabled={
          months.find(({ month }) => month === calendarProps.value.month - 1)
            ?.disabled
        }
        onClick={() => {
          onChangeCalendarValue(calendarProps.value.subtract({ months: 1 }));
        }}
        title="Previous month"
        type="button"
      >
        &larr;
      </button>
      {/* Select to jump to a specific month */}
      <Select
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
      </Select>
      {/* Select to jump to a specific year */}
      <Select
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
      </Select>
      {/* Left arrow to go to the next month */}
      <button
        className="disabled:opacity-50"
        disabled={
          months.find(({ month }) => month === calendarProps.value.month + 1)
            ?.disabled
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
