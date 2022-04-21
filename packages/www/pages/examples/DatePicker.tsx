import { useEffect, useState } from "react";
import { Example } from "../../components/Example";
import { DatePicker } from "../../components/examples/DatePicker";

export default function ExamplesPage() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <Example
      file="/packages/www/components/examples/DatePicker.tsx"
      title="DatePicker"
    >
      {client ? <DatePicker /> : null}
    </Example>
  );
}
