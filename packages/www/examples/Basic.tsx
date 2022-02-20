import { Temporal } from "@js-temporal/polyfill";
import { useState } from "react";
import { Calendar } from "../../lib/Calendar";
import { Locale } from "../../lib/types";
import { useTempocal } from "../../lib/useTempocal";

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

  const { onSelect } = useTempocal({
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
        onSelect={onSelect}
        rollover
        value={value}
        calendarProps={() => ({ className: "w-72" })}
      />
    </div>
  );
}
