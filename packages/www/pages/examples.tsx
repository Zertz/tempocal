import { useEffect, useState } from "react";
import { Basic } from "../components/examples/Basic";
import { DateInput } from "../components/examples/DateInput";
import { DatePicker } from "../components/examples/DatePicker";
import { DateRangePicker } from "../components/examples/DateRangePicker";
import { DateTimePicker } from "../components/examples/DateTimePicker";

export default function ExamplesPage() {
  return (
    <>
      <Example
        title="Basic"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/components/examples/Basic.tsx"
      >
        <Basic />
      </Example>
      <Example
        title="DatePicker"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/components/examples/DatePicker.tsx"
      >
        <DatePicker />
      </Example>
      <Example
        title="DateInput"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/components/examples/DateInput.tsx"
      >
        <DateInput />
      </Example>
      <Example
        title="DateTimePicker"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/components/examples/DateTimePicker.tsx"
      >
        <DateTimePicker />
      </Example>
      <Example
        title="DateRangePicker"
        url="https://github.com/Zertz/tempocal/blob/main/packages/www/components/examples/DateRangePicker.tsx"
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
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

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
      <div className="flex flex-col items-start">
        {client ? children : null}
      </div>
    </div>
  );
}
