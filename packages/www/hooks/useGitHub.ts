import { useEffect, useState } from "react";

export function useGitHub({
  repository,
  branch,
  file,
}: {
  repository: `${string}/${string}`;
  branch: string;
  file: `/${string}`;
}) {
  const [raw, setRaw] = useState<string>();

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/${repository}/${branch}${file}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.text();
      })
      .then((text) => setRaw(text.trim()))
      .catch((e) => setRaw(`Error loading ${file}: ${e.message}`));
  }, [branch, file, repository]);

  return raw;
}
