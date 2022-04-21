import { useEffect, useState } from "react";
import { Example } from "../../components/Example";
import { Basic } from "../../components/examples/Basic";

export default function ExamplesPage() {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <Example file="/packages/www/components/examples/Basic.tsx" title="Basic">
      {client ? <Basic /> : null}
    </Example>
  );
}
