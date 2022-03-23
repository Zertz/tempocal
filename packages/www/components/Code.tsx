export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded bg-gray-800 p-2">
      <code>{children}</code>
    </pre>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <code className="inline rounded bg-gray-800 px-1 py-0.5">{children}</code>
  );
}
