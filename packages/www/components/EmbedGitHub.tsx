import classnames from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useEffect, useState } from "react";

export function EmbedGitHub({
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
      .catch(console.error);
  }, [branch, file, repository]);

  if (!raw) {
    return null;
  }

  return (
    <Highlight {...defaultProps} code={raw} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={classnames(className, "p-2")} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
