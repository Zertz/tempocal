import { CodeBlock } from "../../components/Code";

export default function DocumentationPage() {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold">Calendar</h2>
      </div>
      <div className="space-y-8 divide-y divide-solid divide-gray-400">
        <div className="space-y-2">
          <CodeBlock>{`import { Calendar } from "@tempocal/react";

<Calendar {...calendarProps} onChange={onChangeSelectedValue} />`}</CodeBlock>
          <p>
            Handles the basics of rendering a calendar, including displaying
            weekdays and days, accounting for rollover days.
          </p>
          <p>
            <em>
              While use of this component is optional, it handles the few
              universal calendar-y things and should cover the vast majority of
              use cases.
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}
