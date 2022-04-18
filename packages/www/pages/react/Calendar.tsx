import { Code, CodeBlock } from "../../components/Code";

export default function DocumentationPage() {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold">Calendar</h2>
      </div>
      <div className="space-y-8 divide-y divide-solid divide-gray-400">
        <div className="space-y-2">
          <CodeBlock>{`import { Calendar } from "@tempocal/react";

<Calendar {...calendarProps} />`}</CodeBlock>
          <p>
            <Code>Calendar</Code> is a grid with a header, weekdays, days, and a
            footer. It handles the basics of rendering a calendar, like
            accounting for rollover days and should be flexible enough cover the
            vast majority of use cases.
          </p>
        </div>
      </div>
    </div>
  );
}
