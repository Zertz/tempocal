import classnames from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";

export function CodeBlock({ children }: { children: string }) {
  return (
    <Highlight {...defaultProps} code={children} language="tsx">
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

export function Code({ children }: { children: string }) {
  return (
    <code className="inline rounded bg-gray-800 px-1 py-0.5">{children}</code>
  );
}
