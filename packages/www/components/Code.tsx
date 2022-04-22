import classnames from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";
import { GitHubLogo } from "./GitHubLogo";

export function CodeBlock({
  children,
  href,
}: {
  children: string | undefined;
  href?: string;
}) {
  return (
    <Highlight {...defaultProps} code={children || "Loading..."} language="tsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={classnames(className, "p-2 relative")} style={style}>
          {href && (
            <div className="flex gap-2 absolute top-2 right-2">
              <a
                className="bg-gray-200 hover:bg-gray-300 border-2 border-white rounded-full w-6 h-6"
                href={href}
                title="View on GitHub"
              >
                <GitHubLogo />
              </a>
            </div>
          )}
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {href && (
                <span className="mr-4 select-none text-gray-500">
                  {(i + 1)
                    .toString()
                    .padStart(tokens.length.toString().length, "0")}
                </span>
              )}
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

export function Code({ children }: { children: string }) {
  return (
    <code className="bg-[rgb(42,39,52)] inline rounded p-1.5">{children}</code>
  );
}
