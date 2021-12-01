import { toTemporalInstant } from "@js-temporal/polyfill";
import { useMemo, useState } from "react";
import { Locale } from "../lib/types";
import { DatePicker } from "./DatePicker";
import { DateRangePicker } from "./DateRangePicker";
import { DateTimePicker } from "./DateTimePicker";
import { DateTimePicker2 } from "./DateTimePicker2";
import { OutOfTheBox } from "./OutOfTheBox";

// @ts-expect-error Yes.
Date.prototype.toTemporalInstant = toTemporalInstant;

export function App() {
  const [locale, setLocale] = useState<Locale>("en-US");

  const { dateFormatter, dateTimeFormatter } = useMemo(
    () => ({
      dateFormatter: new Intl.DateTimeFormat(locale, {
        dateStyle: "long",
      }),
      dateTimeFormatter: new Intl.DateTimeFormat(locale, {
        dateStyle: "long",
        timeStyle: "short",
      }),
    }),
    [locale]
  );

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-7xl">
        <a href="https://github.com/Zertz/tempocal">Tempocal</a>
      </h1>
      <select
        className="border border-gray-300 px-1 py-0.5 rounded w-min"
        onChange={({ target: { value } }) => setLocale(value)}
        title="Locale"
        value={locale}
      >
        <option value="en-US">en-US</option>
        <option value="es-ES">es-ES</option>
        <option value="fr-CA">fr-CA</option>
      </select>
      <OutOfTheBox dateFormatter={dateFormatter} locale={locale} />
      <DatePicker dateFormatter={dateFormatter} locale={locale} />
      <div className="flex gap-4">
        <DateTimePicker dateTimeFormatter={dateTimeFormatter} locale={locale} />
        <DateTimePicker2
          dateTimeFormatter={dateTimeFormatter}
          locale={locale}
        />
      </div>
      <DateRangePicker dateFormatter={dateFormatter} locale={locale} />
    </div>
  );
}
