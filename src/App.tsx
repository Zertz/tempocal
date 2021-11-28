import { toTemporalInstant } from "@js-temporal/polyfill";
import { useMemo, useState } from "react";
import { DatePicker } from "./DatePicker";
import { DateRangePicker } from "./DateRangePicker";
import { Locale } from "./types";

// @ts-expect-error Yes.
Date.prototype.toTemporalInstant = toTemporalInstant;

export function App() {
  const [locale, setLocale] = useState<Locale>("en-US");

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "long",
      }),
    [locale]
  );

  return (
    <div className="flex flex-col gap-8 px-12 pt-8">
      <h1 className="text-7xl">Tempocal</h1>
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
      <DatePicker dateFormatter={dateFormatter} locale={locale} />
      <DateRangePicker dateFormatter={dateFormatter} locale={locale} />
    </div>
  );
}
