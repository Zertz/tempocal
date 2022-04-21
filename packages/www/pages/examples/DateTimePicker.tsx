import { useEffect, useState } from "react";
import { Example } from "../../components/Example";
import { DateTimePicker } from "../../examples/DateTimePicker";

export default function ExamplesPage() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <Example
      file="/packages/www/examples/DateTimePicker.tsx"
      title="DateTimePicker"
    >
      {client ? <DateTimePicker /> : null}
    </Example>
  );
}
