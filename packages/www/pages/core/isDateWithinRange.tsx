import { Code, CodeBlock } from "../../components/Code";

export default function DocumentationPage() {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold">isDateWithinRange</h2>
      </div>
      <div className="space-y-8 divide-y divide-solid divide-gray-400">
        <div className="space-y-2">
          <p>
            Returns <Code>true</Code> if <Code>date</Code> falls within the
            closed interval defined by <Code>rangeValue</Code>. Both the start
            and end of the range must be defined; if either is{" "}
            <Code>undefined</Code>, the function returns <Code>false</Code>.
            Accepts both <Code>Temporal.PlainDate</Code> and{" "}
            <Code>Temporal.PlainDateTime</Code> range values — date-time values
            are automatically converted to plain dates for comparison.
          </p>
          <CodeBlock>{`import { isDateWithinRange } from "@tempocal/core";

isDateWithinRange(date, rangeValue)`}</CodeBlock>
          <CodeBlock>{`isDateWithinRange: (
  date: Temporal.PlainDate,
  rangeValue:
    | [undefined, undefined]
    | [Temporal.PlainDate, undefined]
    | [Temporal.PlainDate, Temporal.PlainDate]
    | [Temporal.PlainDateTime, undefined]
    | [Temporal.PlainDateTime, Temporal.PlainDateTime]
    | undefined
) => boolean`}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
