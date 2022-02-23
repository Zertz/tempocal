import { Temporal } from "@js-temporal/polyfill";
import { Calendar, Locale, useTempocal } from "@tempocal/react";
import { useState } from "react";

export function Basic({
  dateFormatter,
  locale,
}: {
  dateFormatter: Intl.DateTimeFormat;
  locale: Locale;
}) {
  const [value, setValue] = useState(
    Temporal.PlainDate.from({
      year: 2021,
      month: 11,
      day: 25,
    })
  );

  const { onChange } = useTempocal({
    locale,
    mode: "date",
    setValue,
    value,
  });

  return (
    <div className="flex flex-col gap-4">
      <p>{dateFormatter.format(new Date(value.toString()))}</p>
      <Calendar
        locale={locale}
        onChange={onChange}
        rollover
        value={value}
        calendarProps={() => ({ className: "w-72" })}
      />
    </div>
  );
}
