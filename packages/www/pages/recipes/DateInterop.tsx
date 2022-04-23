import { CodeBlock } from "../../components/Code";

export default function DateInteropPage() {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold">Date interop</h2>
      </div>
      <div className="space-y-4">
        <CodeBlock>{`import { dateToTemporal, temporalToDate } from "@tempocal/core";

const date = new Date(1918, 6, 18, 10, 15, 30);

const plainDateTime = dateToTemporal(birthDate); // Temporal.Plaindate<1918-07-18 10:15:30>
const plainDate = plainDateTime.toPlainDate(); // Temporal.Plaindate<1918-07-18>

const dateAndTime = temporalToDate(plainDateTime); // Date<1918-07-18 10:15:30>
const dateOnly = temporalToDate(plainDate); // Date<1918-07-18 00:00:00>`}</CodeBlock>
      </div>
    </div>
  );
}
