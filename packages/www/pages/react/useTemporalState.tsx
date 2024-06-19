import { AnchorHeader } from "../../components/AnchorHeader";
import { Code, CodeBlock } from "../../components/Code";

export default function UseTemporalStatePage() {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold">useTemporalState</h2>
      </div>
      <div className="space-y-4">
        <p>
          This hooks works like <Code>React.useState</Code>, except it's only
          meant to hold Temporal values.
        </p>
        <CodeBlock>{`import { useTemporalState } from "@tempocal/react";

const [value, setValue] = useTemporalState(
  mode: "date" | "datetime",
  initialState: Temporal.PlainDate | Temporal.PlainDateLike | Temporal.PlainDateTime | Temporal.PlainDateTimeLike
);`}</CodeBlock>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h3 className="text-3xl font-bold">Options</h3>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <AnchorHeader id="options-mode">mode</AnchorHeader>
            <p></p>
            <CodeBlock>{`mode: "date" | "datetime"`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="options-initialState">initialState</AnchorHeader>
            <p></p>
            <CodeBlock>{`// mode: "date"
initialState: Temporal.PlainDate | Temporal.PlainDateLike

// mode: "datetime"
initialState: Temporal.PlainDateTime | Temporal.PlainDateTimeLike`}</CodeBlock>
          </div>
        </div>
        <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
          <h3 className="text-3xl font-bold">Returns</h3>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <AnchorHeader id="options-value">value</AnchorHeader>
            <p></p>
            <CodeBlock>{`// mode: "date"
value: Temporal.PlainDate

// mode: "datetime"
value: Temporal.PlainDateTime`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <AnchorHeader id="options-setValue">setValue</AnchorHeader>
            <p></p>
            <CodeBlock>{`// mode: "date"
setValue: (value: Temporal.PlainDate | Temporal.PlainDateLike) => void

// mode: "datetime"
setValue: (value: Temporal.PlainDateTime | Temporal.PlainDateTimeLike) => void`}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
