import { Temporal } from "@js-temporal/polyfill";
import classnames from "classnames";
import * as React from "react";
import { Calendar, Locale, useTempocal } from "../../lib";

export function DateInput({
  dateFormatter,
  locale,
}: {
  dateFormatter: Intl.DateTimeFormat;
  locale: Locale;
}) {
  const [isOpen, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const { monthNames, onChangeSelectedValue } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value,
  });

  const formattedDate = React.useMemo(() => {
    return dateFormatter.format(
      new Date(value.year, value.month - 1, value.day)
    );
  }, [dateFormatter, value]);

  React.useEffect(() => {
    setOpen(false);
  }, [value]);

  return (
    <div className="relative">
      <input
        className="px-1 rounded"
        onClick={() => setOpen((isOpen) => !isOpen)}
        readOnly
        title={formattedDate}
        type="text"
        value={`${value.year.toString().padStart(4, "0")}-${value.month
          .toString()
          .padStart(2, "0")}-${value.day.toString().padStart(2, "0")}`}
      />
      <div className="absolute top-7 left-0" hidden={!isOpen}>
        <Calendar
          locale={locale}
          onChange={onChangeSelectedValue}
          rollover
          value={value}
          calendarProps={() => ({
            className:
              "gap-1 bg-gray-100 border border-gray-300 p-2 rounded shadow text-center w-72",
          })}
          headerProps={() => ({ className: "flex gap-2" })}
          renderHeader={() => (
            <>
              <select
                className="border border-gray-300 ml-auto px-1 py-0.5 rounded w-min"
                onChange={({ target: { value } }) =>
                  onChangeSelectedValue({ month: Number(value) })
                }
                title="Month"
                value={value.month}
              >
                {monthNames.map((monthName, index) => (
                  <option key={monthName} value={index + 1}>
                    {monthName}
                  </option>
                ))}
              </select>
              <select
                className="border border-gray-300 mr-auto px-1 py-0.5 rounded w-min"
                onChange={({ target: { value } }) =>
                  onChangeSelectedValue({ year: Number(value) })
                }
                title="Year"
                value={value.year}
              >
                {[...Array(20)].map((_, year) => (
                  <option key={year} value={year - 10 + value.year}>
                    {year - 10 + value.year}
                  </option>
                ))}
              </select>
            </>
          )}
          weekdayProps={() => ({ className: "font-medium" })}
          dayProps={(date) => ({
            className: classnames(
              "border overflow-hidden rounded transition-colors w-full",
              value.equals(date)
                ? "bg-blue-100 border-blue-600"
                : "hover:bg-gray-100 border-gray-300"
            ),
          })}
        />
      </div>
    </div>
  );
}
