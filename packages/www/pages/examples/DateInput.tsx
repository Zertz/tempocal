import { Example } from "../../components/Example";
import { DateInput } from "../../examples/DateInput";

export default function ExamplesPage() {
  return (
    <Example
      demo={<DateInput />}
      file="/packages/www/examples/DateInput.tsx"
      title="DateInput"
    >
      👀
    </Example>
  );
}
