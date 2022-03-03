import { Temporal } from "@js-temporal/polyfill";
import * as React from "react";
import { Calendar, Locale, useTempocal } from "../../lib";

export function Basic({
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

  const { onChangeSelectedValue } = useTempocal({
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

  return (
    <div className="flex flex-col gap-4">
      <p>{formattedDate}</p>
      <Calendar
        locale={locale}
        onChange={onChangeSelectedValue}
        rollover
        value={value}
        calendarProps={() => ({ className: "w-72" })}
      />
    </div>
  );
}
