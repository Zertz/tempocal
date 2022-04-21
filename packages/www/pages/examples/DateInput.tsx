import { useEffect, useState } from "react";
import { Example } from "../../components/Example";
import { DateInput } from "../../examples/DateInput";

export default function ExamplesPage() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <Example file="/packages/www/examples/DateInput.tsx" title="DateInput">
      {client ? <DateInput /> : null}
    </Example>
  );
}
