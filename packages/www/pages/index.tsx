import { Code, CodeBlock } from "../components/Code";

export default function OverviewPage() {
  return (
    <>
      <div>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h2 className="text-4xl font-bold">Highlights</h2>
        </div>
        <ul className="space-y-2">
          <li>
            🕰 Built with{" "}
            <a
              className="underline hover:text-gray-300"
              href="https://github.com/tc39/proposal-temporal"
            >
              Temporal API
            </a>{" "}
            (stage 3) and{" "}
            <a
              className="underline hover:text-gray-300"
              href="https://github.com/js-temporal/temporal-polyfill"
            >
              temporal-polyfill
            </a>
          </li>
          <li>
            🤝 Localizable with{" "}
            <a
              className="underline hover:text-gray-300"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"
            >
              Intl API
            </a>
          </li>
          <li>🚛 Bring your own DOM!</li>
          <li>
            ✨ Calendars, date pickers (with or without time), date range,
            anything goes!
          </li>
          <li>🤹‍♂️ Well suited for complex use cases!</li>
          <li>🤓 Available as ESM and CJS!</li>
        </ul>
      </div>
      <div>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h2 className="text-4xl font-bold">Features</h2>
        </div>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <Code>useTempocal</Code> hook handles the intricacies of managing
            Temporal values for controlling a calendar. It can pick a:
            <ul className="list-inside list-disc mt-2 pl-6 space-y-2">
              <li>Date</li>
              <li>Date range</li>
              <li>Date and time</li>
              <li>Date and time range</li>
            </ul>
          </li>
          <li>
            <Code>Calendar</Code> component covers the basics and render props
            open up near infinite customizability. It can optionally:
            <ul className="list-inside list-disc mt-2 pl-6 space-y-2">
              <li>Fill calendar with days from surrounding months</li>
              <li>Display multiple months</li>
              <li>Minimum and maximum dates</li>
              <li>Custom start of week day</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="space-y-4">
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h2 className="text-4xl font-bold">Getting started</h2>
        </div>
        <CodeBlock>npm install @tempocal/react @js-temporal/polyfill</CodeBlock>
      </div>
      <div>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h2 className="text-4xl font-bold">See also</h2>
        </div>
        <ul className="space-y-2">
          <li>
            <a
              className="underline hover:text-gray-300"
              href="https://react-headless-tabs.pierluc.io/"
            >
              react-headless-tabs
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
