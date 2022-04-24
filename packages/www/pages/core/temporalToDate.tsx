import { CodeBlock } from "../../components/Code";

export default function DocumentationPage() {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold">temporalToDate</h2>
      </div>
      <div className="space-y-8 divide-y divide-solid divide-gray-400">
        <div className="space-y-2">
          <CodeBlock>{`import { temporalToDate } from "@tempocal/core";

const plainDateTime = Temporal.PlainDateTime.from({
  year: 1918,
  month: 7,
  day: 18,
  hour: 15,
  minute: 30,
  second: 45,
  millisecond: 600,
});

const dateTime = temporalToDate(plainDateTime); // Date<1918-07-18 15:30:45.600>

const plainDate = Temporal.PlainDate.from({
  year: 1918,
  month: 7,
  day: 18,
});

const dateOnly = temporalToDate(plainDateTime); // Date<1918-07-18 00:00:00>`}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
