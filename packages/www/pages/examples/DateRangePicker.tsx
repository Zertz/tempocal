import { useEffect, useState } from "react";
import { Example } from "../../components/Example";
import { DateRangePicker } from "../../examples/DateRangePicker";

export default function ExamplesPage() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <Example
      file="/packages/www/components/examples/DateRangePicker.tsx"
      title="DateRangePicker"
    >
      {client ? <DateRangePicker /> : null}
    </Example>
  );
}
