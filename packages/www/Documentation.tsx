import * as React from "react";
import { Code, CodeBlock } from "./Code";

export function Documentation() {
  return (
    <>
      <div>
        <div className="flex items-end justify-between border-b border-solid border-gray-400 mb-4 pb-2">
          <h2 className="font-bold text-4xl">API</h2>
        </div>
        <div className="divide-y divide-solid divide-gray-400 space-y-8">
          <div className="space-y-2">
            <CodeBlock>{`import { Calendar, useTempocal } from "@tempocal/react"`}</CodeBlock>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-end justify-between border-b border-solid border-gray-400 mb-4 pb-2">
          <h2 className="font-bold text-4xl">useTempocal</h2>
        </div>
        <div className="divide-y divide-solid divide-gray-400 space-y-8">
          <div className="space-y-2">
            <CodeBlock>{`const {
  onChange,
  monthNames,
  weekdayNames,
} = useTempocal({
  locale: Locale;
  mode: "date" | "datetime";
  setValue: (value: Temporal.PlainDate | Temporal.PlainDateTime) => void;
  value: Temporal.PlainDate | Temporal.PlainDateTime;
});`}</CodeBlock>
          </div>
          <div className="pt-8 space-y-2">
            <CodeBlock>
              {
                "onChange: (params: Temporal.PlainDate | Temporal.PlainDateLike) => void"
              }
            </CodeBlock>
            <p>
              For fully or partially updating the selected, typically a month or
              time selector outside the scope of the <Code>Calendar</Code>{" "}
              component.
            </p>
            <p>
              <em>
                Required by the <Code>Calendar</Code> component.
              </em>
            </p>
          </div>
          <div className="pt-8 space-y-2">
            <CodeBlock>monthNames: string[]</CodeBlock>
            <p>Month names in the give locale, in order.</p>
          </div>
          <div className="pt-8 space-y-2">
            <CodeBlock>weekdayNames: string[]</CodeBlock>
            <p>Weekday names in the given locale, in order.</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-end justify-between border-b border-solid border-gray-400 mb-4 pb-2">
          <h2 className="font-bold text-4xl">Calendar</h2>
        </div>
        <div className="divide-y divide-solid divide-gray-400 space-y-8">
          <div className="space-y-2">
            <CodeBlock>{`<Calendar locale="en-US" onChange={onChange} value={value} />`}</CodeBlock>
            <p>
              This component handles the basics of rendering a calendar,
              including displaying weeksdays and days, accounting for rollover
              days.
            </p>
            <p>
              <em>
                While use of this component is optional, it handles the few
                universal calendar-y things and should cover the vast majority
                of use cases.
              </em>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
