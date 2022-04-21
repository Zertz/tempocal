import { useEffect, useState } from "react";
import { Example } from "../../components/Example";
import { DatePicker } from "../../examples/DatePicker";

export default function ExamplesPage() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <Example file="/packages/www/examples/DatePicker.tsx" title="DatePicker">
      {client ? <DatePicker /> : null}
    </Example>
  );
}
