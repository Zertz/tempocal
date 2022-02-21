import { CodeBlock } from "./Code";

export function Overview() {
  return (
    <>
      <div>
        <div className="flex items-end justify-between border-b border-solid border-gray-400 mb-4 pb-2">
          <h2 className="font-bold text-4xl">Features</h2>
        </div>
        <ul className="space-y-2">
          <li>
            🕰 Built on{" "}
            <a
              className="hover:text-gray-300 underline"
              href="https://github.com/tc39/proposal-temporal"
            >
              Temporal API
            </a>{" "}
            (stage 3) and{" "}
            <a
              className="hover:text-gray-300 underline"
              href="https://github.com/js-temporal/temporal-polyfill"
            >
              temporal-polyfill
            </a>
          </li>
          <li>🤓 Available as ESM and CJS!</li>
        </ul>
      </div>
      <div>
        <div className="flex items-end justify-between border-b border-solid border-gray-400 mb-4 pb-2">
          <h2 className="font-bold text-4xl">Getting started</h2>
        </div>
        <CodeBlock>npm install @tempocal/react</CodeBlock>
      </div>
    </>
  );
}
