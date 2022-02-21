import { useMemo } from "react";
import { Locale } from "../lib/types";
import { Basic } from "./examples/Basic";
import { DatePicker } from "./examples/DatePicker";
import { DateRangePicker } from "./examples/DateRangePicker";
import { DateTimePicker } from "./examples/DateTimePicker";
import { DateTimePicker2 } from "./examples/DateTimePicker2";

export function Examples({ locale }: { locale: Locale }) {
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
    <>
      <Example
        title="Basic"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/Basic.tsx"
      >
        <Basic dateFormatter={dateFormatter} locale={locale} />
      </Example>
      <Example
        title="DatePicker"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/DatePicker.tsx"
      >
        <DatePicker dateFormatter={dateFormatter} locale={locale} />
      </Example>
      <Example
        title="DateTimePicker"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/DateTimePicker.tsx"
      >
        <DateTimePicker dateTimeFormatter={dateTimeFormatter} locale={locale} />
      </Example>
      <Example
        title="DateTimePicker2"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/DateTimePicker2.tsx"
      >
        <DateTimePicker2
          dateTimeFormatter={dateTimeFormatter}
          locale={locale}
        />
      </Example>
      <Example
        title="DateRangePicker"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/DateRangePicker.tsx"
      >
        <DateRangePicker dateFormatter={dateFormatter} locale={locale} />
      </Example>
    </>
  );
}

function Example({
  children,
  title,
  url,
}: {
  children: React.ReactNode;
  title: string;
  url: string;
}) {
  return (
    <div>
      <div className="flex items-end justify-between border-b border-solid border-gray-400 mb-4 pb-2">
        <h2 className="font-bold text-4xl text-gray-200">{title}</h2>
        <a
          className="font-light hover:text-gray-300 text-sm transition-colors underline"
          href={url}
        >
          View source
        </a>
      </div>
      <div className="flex flex-col items-start bg-gray-200 overflow-x-auto p-2 rounded text-gray-700">
        {children}
      </div>
    </div>
  );
}
