import * as React from "react";
import { Code, CodeBlock } from "./Code";

export function Documentation() {
  return (
    <>
      <div>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h2 className="text-4xl font-bold">API</h2>
        </div>
        <div className="space-y-8 divide-y divide-solid divide-gray-400">
          <div className="space-y-2">
            <CodeBlock>{`import { Calendar, useTempocal } from "@tempocal/react"`}</CodeBlock>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h2 className="text-4xl font-bold">useTempocal</h2>
        </div>
        <div className="space-y-8 divide-y divide-solid divide-gray-400">
          <div className="space-y-2">
            <CodeBlock>{`const {
  calendarValue,
  onChangeCalendarValue,
  onChangeSelectedValue,
  months,
  weekdays,
  years,
} = useTempocal({
  clampCalendarValue?: boolean;
  locale: Locale;
  maxValue?: Temporal.PlainDate;
  minValue?: Temporal.PlainDate;
  mode: "date" | "datetime";
  setValue: (value: Temporal.PlainDate | Temporal.PlainDateTime) => void;
  value: Temporal.PlainDate | Temporal.PlainDateTime;
});`}</CodeBlock>
          </div>
          <div className="space-y-2 pt-8">
            <CodeBlock>{"calendarValue: Temporal.PlainDate"}</CodeBlock>
            <p>
              Represents the date that should be visible. Typically passed to
              the <Code>Calendar</Code> component's <Code>value</Code> prop.
            </p>
          </div>
          <div className="space-y-2 pt-8">
            <CodeBlock>
              {
                "onChangeCalendarValue: (params?: Temporal.PlainDate | Temporal.PlainDateLike) => void"
              }
            </CodeBlock>
            <p>
              Fully or partially updates the visible date. Typically used to
              navigate the calendar using, for example, month and year
              selectors. If <Code>params</Code> is not specified,{" "}
              <Code>calendarValue</Code> will be set to now.
            </p>
          </div>
          <div className="space-y-2 pt-8">
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
          <div className="space-y-2 pt-8">
            <CodeBlock>{`months: { month: number; longName: string; shortName: string; narrowName: string; }[]`}</CodeBlock>
            <p>Months in the specified locale, in order.</p>
          </div>
          <div className="space-y-2 pt-8">
            <CodeBlock>{`weekdays: { weekday: number; longName: string; shortName: string; narrowName: string; }[]`}</CodeBlock>
            <p>Weekdays in the specified locale, in order.</p>
          </div>
          <div className="space-y-2 pt-8">
            <CodeBlock>{`years: number[]`}</CodeBlock>
            <p>
              Contains the years between <Code>minValue</Code> and{" "}
              <Code>maxValue</Code>, inclusively, when both are specified.
              Returns an empty array otherwise.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h2 className="text-4xl font-bold">Calendar</h2>
        </div>
        <div className="space-y-8 divide-y divide-solid divide-gray-400">
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
