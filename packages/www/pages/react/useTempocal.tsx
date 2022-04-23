import { LinkIcon } from "@heroicons/react/outline";
import { Code, CodeBlock } from "../../components/Code";
import ExternalLink from "../../components/ExternalLink";

export default function DocumentationPage() {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold">useTempocal</h2>
      </div>
      <div className="space-y-4">
        <CodeBlock>{`import { useTempocal } from "@tempocal/react";

const {
  calendarProps,
  calendarValue,
  years,
  months,
  hours,
  minutes,
  onChangeCalendarValue,
  onChangeSelectedValue,
} = useTempocal({
  clampCalendarValue?: boolean;
  clampSelectedValue?: boolean;
  locale: Locale;
  maxValue?: Temporal.PlainDate | Temporal.PlainDateTime;
  minValue?: Temporal.PlainDate | Temporal.PlainDateTime;
  mode: "date" | "daterange" | "datetime" | "datetimerange";
  setValue: (value: Temporal.PlainDate | DateRange | Temporal.PlainDateTime | DateTimeRange) => void;
  value: Temporal.PlainDate | DateRange | Temporal.PlainDateTime | DateTimeRange;
});`}</CodeBlock>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h3 className="text-3xl font-bold">Options</h3>
        </div>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h3 className="text-3xl font-bold">Returns</h3>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <AnchorHeader id="returns-calendarProps">
              calendarProps
            </AnchorHeader>
            <p>
              Provided for convenience, to be spread into the{" "}
              <Code>Calendar</Code> component's props.
            </p>
            <CodeBlock>{"<Calendar {...calendarProps} />"}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="returns-calendarValue">
              calendarValue
            </AnchorHeader>
            <CodeBlock>{"calendarValue: Temporal.PlainDate"}</CodeBlock>
            <p>
              Represents the date that should be visible. Typically passed to
              the <Code>Calendar</Code> component's <Code>value</Code> prop.
            </p>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="returns-onChangeCalendarValue">
              onChangeCalendarValue
            </AnchorHeader>
            <p>
              Fully or partially updates the visible date. Typically used to
              navigate the calendar using, for example, month and year
              selectors. If <Code>params</Code> is falsy,{" "}
              <Code>calendarValue</Code> will be set to now.
            </p>
            <CodeBlock>
              {`onChangeCalendarValue: (params?: Temporal.PlainDate | Temporal.PlainDateLike) => Temporal.PlainDate`}
            </CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="returns-onChangeSelectedValue">
              onChangeSelectedValue
            </AnchorHeader>
            <p>Fully or partially updates the selected date or date range.</p>
            <CodeBlock>
              {`// mode: "date"
onChangeSelectedValue: (params: Temporal.PlainDate | Temporal.PlainDateLike) => Temporal.PlainDate

// mode: "daterange"
onChangeSelectedValue: (params: Temporal.PlainDate | Temporal.PlainDateLike | DateRange) => DateRange

// mode: "datetime"
onChangeSelectedValue: (params: Temporal.PlainDateTime | Temporal.PlainDateTimeLike) => Temporal.PlainDateTime

// mode: "datetimerange"
onChangeSelectedValue: (params: Temporal.PlainDateTime | Temporal.PlainDateTimeLike | DateTimeRange) => DateTimeRange`}
            </CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="returns-years">years</AnchorHeader>
            <p>
              Years between <Code>minValue</Code> and <Code>maxValue</Code>,
              inclusively, when both are specified. Returns an empty array
              otherwise.
            </p>
            <CodeBlock>{`years: number[]`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="returns-months">months</AnchorHeader>
            <p>
              Months of the year, with <Code>month</Code> being 1-indexed to
              align with Temporal API. Their names are supplied in the specified
              locale, in the three different forms supported by{" "}
              <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format">
                Intl.DateTimeFormat.format
              </ExternalLink>
              . If <Code>minValue</Code> and/or <Code>maxValue</Code> are set,
              disabled will be set accordingly.
            </p>
            <CodeBlock>{`months: {
  month: number;
  longName: string;
  shortName: string;
  narrowName: string;
  disabled: boolean;
}[]`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="returns-hours">hours</AnchorHeader>
            <p>
              Hours of the selected day, with <Code>hour</Code> starting at 0
              and ending at 23. If <Code>minValue</Code> and/or{" "}
              <Code>maxValue</Code> are set, disabled will be set accordingly.
            </p>
            <CodeBlock>{`hours: {
  hour: number;
  disabled: boolean;
}[]`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="returns-minutes">minutes</AnchorHeader>
            <p>
              Minutes of the selected hour, with <Code>minutes</Code> starting
              at 0 and ending at 59. If <Code>minValue</Code> and/or{" "}
              <Code>maxValue</Code> are set, disabled will be set accordingly.
            </p>
            <CodeBlock>{`minutes: {
  minute: number;
  disabled: boolean;
}[]`}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnchorHeader({ children, id }: { children: string; id: string }) {
  return (
    <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
      <h4 id={id} className="text-xl font-bold">
        <a className="flex items-center group relative" href={`#${id}`}>
          <LinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity absolute -left-5" />
          {children}
        </a>
      </h4>
    </div>
  );
}
