import { useEffect, useState } from "react";
import { CodeBlock } from "../components/Code";
import { Basic } from "../components/examples/Basic";
import { DateInput } from "../components/examples/DateInput";
import { DatePicker } from "../components/examples/DatePicker";
import { DateRangePicker } from "../components/examples/DateRangePicker";
import { DateTimePicker } from "../components/examples/DateTimePicker";
import { useGitHub } from "../hooks/useGitHub";

export default function ExamplesPage() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <Example file="/packages/www/components/examples/Basic.tsx" title="Basic">
        {client ? <Basic /> : null}
      </Example>
      <Example
        file="/packages/www/components/examples/DatePicker.tsx"
        title="DatePicker"
      >
        {client ? <DatePicker /> : null}
      </Example>
      <Example
        file="/packages/www/components/examples/DateInput.tsx"
        title="DateInput"
      >
        {client ? <DateInput /> : null}
      </Example>
      <Example
        file="/packages/www/components/examples/DateTimePicker.tsx"
        title="DateTimePicker"
      >
        {client ? <DateTimePicker /> : null}
      </Example>
      <Example
        file="/packages/www/components/examples/DateRangePicker.tsx"
        title="DateRangePicker"
      >
        {client ? <DateRangePicker /> : null}
      </Example>
    </>
  );
}

function Example({
  children,
  file,
  title,
}: {
  children: React.ReactNode;
  file: `/${string}`;
  title: string;
}) {
  const { contentUrl, rawContent } = useGitHub({
    file,
  });

  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold text-gray-200">{title}</h2>
      </div>
      <div className="flex items-start gap-4">
        {children}
        <div className="w-full h-96 overflow-auto rounded text-sm">
          <CodeBlock href={contentUrl}>{rawContent}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
