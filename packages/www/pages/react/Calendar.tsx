import { AnchorHeader } from "../../components/AnchorHeader";
import { Code, CodeBlock } from "../../components/Code";

export default function CalendarPage() {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold">Calendar</h2>
      </div>
      <div className="space-y-4">
        <p>
          This component renders a grid with a header, weekdays, days, and a
          footer that handles the basics of rendering a calendar, accounting for
          start of week day and rollover days. Everything is entirely
          customizable and should be flexible enough cover the vast majority of
          use cases.
        </p>
        <CodeBlock>{`import { Calendar } from "@tempocal/react";

const { calendarProps } = useTempocal({ ... });

return (
  <Calendar
    {...calendarProps}
    monthsAfter={number}
    monthsBefore={number}
    monthsFixedGrid={boolean}
    rollover={boolean}
    startOfWeek={number}
    calendarProps={() => React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>}
    headerProps={({ date: Temporal.PlainDate }) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>}
    renderHeader={({ date: Temporal.PlainDate }) => React.ReactNode}
    weekdayProps={({ dayOfWeek: number; longName: string; shortName: string; narrowName: string }) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>}
    renderWeekday={({ dayOfWeek: number; longName: string; shortName: string; narrowName: string }) => React.ReactNode}
    dayProps={({ date: Temporal.PlainDate; disabled: boolean; plainDateLike: Temporal.PlainDateLike }) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>}
    renderDay={({ date: Temporal.PlainDate; disabled: boolean; plainDateLike: Temporal.PlainDateLike }) => React.ReactNode}
    footerProps={({ date: Temporal.PlainDate }) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>}
    renderFooter={({ date: Temporal.PlainDate }) => React.ReactNode}
  />
);`}</CodeBlock>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h3 className="text-3xl font-bold">Props</h3>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <AnchorHeader id="props-monthsAfter">monthsAfter</AnchorHeader>
            <p>Number of months to display after the primary calendar.</p>
            <CodeBlock>{`monthsAfter?: number`}</CodeBlock>
            <em className="block">Defaults to 0</em>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-monthsBefore">monthsBefore</AnchorHeader>
            <p>Number of months to display before the primary calendar.</p>
            <CodeBlock>{`monthsBefore?: number`}</CodeBlock>
            <em className="block">Defaults to 0</em>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-monthsFixedGrid">
              monthsFixedGrid
            </AnchorHeader>
            <p>
              Always render months on the same grid, as if it were a paper
              calendar. Useful to avoid content shifting and to align multiple
              months with <Code>monthsAfter</Code> and <Code>monthsBefore</Code>
              .
            </p>
            <CodeBlock>{`monthsFixedGrid?: boolean`}</CodeBlock>
            <em className="block">Defaults to false</em>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-rollover">rollover</AnchorHeader>
            <p>Fill month grid with days from the previous and next months.</p>
            <CodeBlock>{`rollover?: number`}</CodeBlock>
            <em className="block">Defaults to false</em>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-startOfWeek">startOfWeek</AnchorHeader>
            <p>Day to start the week on. 1 is Monday, and 7 is Sunday.</p>
            <CodeBlock>{`startOfWeek?: number`}</CodeBlock>
            <em className="block">Defaults to 7</em>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-calendarProps">calendarProps</AnchorHeader>
            <p>
              Function that returns an object with any and all props a{" "}
              <Code>{`<ul>`}</Code> element accepts. This is the element that
              wraps the entire calendar.
            </p>
            <CodeBlock>{`calendarProps?: () => React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-headerProps">headerProps</AnchorHeader>
            <p>
              Function that returns an object with any and all props a{" "}
              <Code>{`<li>`}</Code> element accepts. This is the element that
              wraps the calendar's header.
            </p>
            <CodeBlock>{`headerProps?: ({
  date: Temporal.PlainDate;
}) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-renderHeader">renderHeader</AnchorHeader>
            <p>
              Function that returns a React element to render inside the
              calendar's header.
            </p>
            <CodeBlock>{`renderHeader?: ({
  date: Temporal.PlainDate;
}) => React.ReactNode`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-weekdayProps">weekdayProps</AnchorHeader>
            <p>
              Function that returns an object with any and all props a{" "}
              <Code>{`<li>`}</Code> element accepts. These are the elements that
              wrap each day of the week.
            </p>
            <CodeBlock>{`weekdayProps?: ({
  dayOfWeek: number;
  longName: string;
  shortName: string;
  narrowName: string;
}) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-renderWeekday">renderWeekday</AnchorHeader>
            <p>
              Function that returns a React element to render as the day of
              week.
            </p>
            <CodeBlock>{`renderWeekday?: ({
  dayOfWeek: number;
  longName: string;
  shortName: string;
  narrowName: string;
}) => React.ReactNode`}</CodeBlock>
            <em className="block">
              Defaults to <Code>{`() => shortName`}</Code>
            </em>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-dayProps">dayProps</AnchorHeader>
            <p>
              Function that returns an object with any and all props a{" "}
              <Code>{`<li>`}</Code> element accepts. These are the elements that
              wrap each day of the month.
            </p>
            <CodeBlock>{`dayProps?: ({
  date: Temporal.PlainDate;
  disabled: boolean;
  plainDateLike: Temporal.PlainDateLike;
}) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-renderDay">renderDay</AnchorHeader>
            <p>
              Function that returns a React element to render as the day of the
              month.
            </p>
            <CodeBlock>{`renderDay?: ({
  date: Temporal.PlainDate;
  disabled: boolean;
  plainDateLike: Temporal.PlainDateLike;
}) => React.ReactNode`}</CodeBlock>
            <em className="block">
              Defaults to <Code>{`() => date.day`}</Code>
            </em>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-footerProps">footerProps</AnchorHeader>
            <p>
              Function that returns an object with any and all props a{" "}
              <Code>{`<li>`}</Code> element accepts. This is the element that
              wraps the calendar's footer.
            </p>
            <CodeBlock>{`footerProps?: ({
  date: Temporal.PlainDate;
}) => React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="props-renderFooter">renderFooter</AnchorHeader>
            <p>
              Function that returns a React element to render inside the
              calendar's footer.
            </p>
            <CodeBlock>{`renderFooter?: ({
  date: Temporal.PlainDate;
}) => React.ReactNode`}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
