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
  calendarValue,
  onChangeCalendarValue,
  onChangeSelectedValue,
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
            <CodeBlock>{"calendarValue: Temporal.PlainDate"}</CodeBlock>
            <p>
              Represents the date that should be visible. Typically passed to
              the <Code>Calendar</Code> component's <Code>value</Code> prop.
            </p>
          </div>
          <div className="pt-8 space-y-2">
            <CodeBlock>
              {
                "onChangeCalendarValue: (params: Temporal.PlainDate | Temporal.PlainDateLike) => void"
              }
            </CodeBlock>
            <p>
              Fully or partially updates the visible date. Typically used to
              navigate the calendar using, for example, month and year
              selectors.
            </p>
          </div>
          <div className="pt-8 space-y-2">
            <CodeBlock>
              {
                "onChangeSelectedValue: (params: Temporal.PlainDate | Temporal.PlainDateLike | Temporal.PlainDateTime | Temporal.PlainDateTimeLike) => void"
              }
            </CodeBlock>
            <p>
              Fully or partially updates the selected date. Typically passed to
              the <Code>Calendar</Code> component's <Code>onChange</Code> prop.
            </p>
          </div>
          <div className="pt-8 space-y-2">
            <CodeBlock>monthNames: string[]</CodeBlock>
            <p>Month names in the specified locale, in order.</p>
          </div>
          <div className="pt-8 space-y-2">
            <CodeBlock>weekdayNames: string[]</CodeBlock>
            <p>Weekday names in the specified locale, in order.</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-end justify-between border-b border-solid border-gray-400 mb-4 pb-2">
          <h2 className="font-bold text-4xl">Calendar</h2>
        </div>
        <div className="divide-y divide-solid divide-gray-400 space-y-8">
          <div className="space-y-2">
            <CodeBlock>{`<Calendar locale="en-US" onChange={onChangeSelectedValue} value={calendarValue} />`}</CodeBlock>
            <p>
              Handles the basics of rendering a calendar, including displaying
              weekdays and days, accounting for rollover days.
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
