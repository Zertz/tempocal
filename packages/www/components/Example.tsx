import classnames from "classnames";
import * as React from "react";
import { useClient } from "../hooks/useClient";
import { useGitHub } from "../hooks/useGitHub";
import { CodeBlock } from "./Code";

export function Example({
  children,
  demo,
  file,
  title,
}: {
  children: React.ReactNode;
  demo: React.ReactNode;
  file: `/${string}`;
  title: string;
}) {
  const client = useClient();

  const { contentUrl, rawContent } = useGitHub({
    file,
  });

  return (
    <div
      className={classnames(
        "flex flex-col sm:grid gap-4 items-start",
        "auto-rows-min grid-cols-[min-content,1fr]",
        "2xl:grid-cols-[min-content,1fr,2fr]"
      )}
    >
      <div
        className={classnames(
          "mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2 w-full",
          "row-start-1 col-start-1 col-span-2",
          "2xl:col-span-3"
        )}
      >
        <h2 className="text-4xl font-bold text-gray-200">{title}</h2>
      </div>
      <div
        className={classnames(
          "bg-gray-100 text-gray-700 p-2 rounded",
          "row-start-2 col-start-1"
        )}
      >
        {client ? demo : null}
      </div>
      <div className={classnames("row-start-2 col-start-2")}>{children}</div>
      <div
        className={classnames(
          "w-full overflow-auto rounded text-sm",
          "row-start-3 col-start-1 col-span-2",
          "2xl:row-start-2 2xl:col-start-3"
        )}
      >
        <CodeBlock href={contentUrl}>{rawContent}</CodeBlock>
      </div>
    </div>
  );
}
