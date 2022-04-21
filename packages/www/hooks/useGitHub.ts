import { useContext, useEffect, useState } from "react";
import { CodeContext } from "../pages/_app";

export function useGitHub({ file }: { file: `/${string}` }) {
  const { repository, branch } = useContext(CodeContext);

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
