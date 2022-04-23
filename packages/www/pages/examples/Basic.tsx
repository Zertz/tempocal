import { Example } from "../../components/Example";
import { Basic } from "../../examples/Basic";

export default function ExamplesPage() {
  return (
    <Example
      demo={<Basic />}
      file="/packages/www/examples/Basic.tsx"
      title="Basic"
    >
      👀
    </Example>
  );
}
