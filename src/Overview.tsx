import * as React from "react";
import { CodeBlock } from "./Code";

export function Overview() {
  return (
    <>
      <div>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h2 className="text-4xl font-bold">Features</h2>
        </div>
        <ul className="space-y-2">
          <li>
            🕰 Built on{" "}
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
            🤝 Works great with{" "}
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
          <h2 className="text-4xl font-bold">Getting started</h2>
        </div>
        <CodeBlock>npm install @tempocal/react</CodeBlock>
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
