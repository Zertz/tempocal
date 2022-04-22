import * as React from "react";

export function useClient() {
  const [client, setClient] = React.useState(false);

  React.useEffect(() => {
    setClient(true);
  }, []);

  return client;
}
