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
  const [rawContent, setRawContent] = useState<string>();

  const contentUrl = `https://github.com/${repository}/blob/${branch}${file}`;
  const rawContentUrl = `https://raw.githubusercontent.com/${repository}/${branch}${file}`;

  useEffect(() => {
    fetch(rawContentUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.text();
      })
      .then((text) => setRawContent(text.trim()))
      .catch((e) =>
        setRawContent(`Error loading ${rawContentUrl}: ${e.message}`)
      );
  }, [rawContentUrl]);

  return {
    contentUrl,
    rawContent,
    rawContentUrl,
  };
}
