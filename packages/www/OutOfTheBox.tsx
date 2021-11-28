import { Temporal } from "@js-temporal/polyfill";
import { useState } from "react";
import { Calendar } from "../lib/Calendar";
import { Locale } from "../lib/types";
import { useTempocal } from "../lib/useTempocal";

export function OutOfTheBox({
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
    <div className="flex flex-col gap-8 pt-8">
      <h2 className="text-3xl">OutOfTheBox</h2>
      <p>{dateFormatter.format(new Date(value.toLocaleString()))}</p>
      <Calendar
        locale={locale}
        onSelect={onSelect}
        rollover
        value={value}
        monthProps={() => ({ className: "w-72" })}
      />
    </div>
  );
}
