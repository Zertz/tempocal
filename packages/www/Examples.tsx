import * as React from "react";
import { Basic } from "./examples/Basic";
import { DateInput } from "./examples/DateInput";
import { DatePicker } from "./examples/DatePicker";
import { DateRangePicker } from "./examples/DateRangePicker";
import { DateTimePicker } from "./examples/DateTimePicker";

export function Examples() {
  return (
    <>
      <Example
        title="Basic"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/Basic.tsx"
      >
        <Basic />
      </Example>
      <Example
        title="DatePicker"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/DatePicker.tsx"
      >
        <DatePicker />
      </Example>
      <Example
        title="DateInput"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/DateInput.tsx"
      >
        <DateInput />
      </Example>
      <Example
        title="DateTimePicker"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/DateTimePicker.tsx"
      >
        <DateTimePicker />
      </Example>
      <Example
        title="DateRangePicker"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/examples/DateRangePicker.tsx"
      >
        <DateRangePicker />
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
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold text-gray-200">{title}</h2>
        <a
          className="text-sm font-light underline transition-colors hover:text-gray-300"
          href={url}
        >
          View source
        </a>
      </div>
      <div className="flex flex-col items-start rounded bg-gray-200 p-2 text-gray-700">
        {children}
      </div>
    </div>
  );
}
