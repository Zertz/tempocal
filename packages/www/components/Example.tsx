import * as React from "react";
import { useClient } from "../hooks/useClient";
import { useGitHub } from "../hooks/useGitHub";
import { CodeBlock } from "./Code";

export function Example({
  children,
  file,
  title,
}: {
  children: React.ReactNode;
  file: `/${string}`;
  title: string;
}) {
  const client = useClient();

  const { contentUrl, rawContent } = useGitHub({
    file,
  });

  return (
    <div>
      <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
        <h2 className="text-4xl font-bold text-gray-200">{title}</h2>
      </div>
      <div className="flex items-start gap-4">
        {client ? children : null}
        <div className="w-full overflow-auto rounded text-sm">
          <CodeBlock href={contentUrl}>{rawContent}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
