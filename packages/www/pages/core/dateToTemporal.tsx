import { CodeBlock } from "../../components/Code";

export default function DocumentationPage() {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold">dateToTemporal</h2>
      </div>
      <div className="space-y-8 divide-y divide-solid divide-gray-400">
        <div className="space-y-2">
          <CodeBlock>{`import { dateToTemporal } from "@tempocal/core";

dateToTemporal(...)`}</CodeBlock>
          <p></p>
        </div>
      </div>
    </div>
  );
}
