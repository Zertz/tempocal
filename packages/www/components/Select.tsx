import classnames from "classnames";
import * as React from "react";

export function Select({
  className,
  label,
  ...props
}: React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  (
    | { id: string; label: string; title?: string }
    | { id?: string; label?: string; title: string }
  )) {
  return (
    <div className={className}>
      <label
        className={classnames("block text-sm font-medium text-gray-700", {
          "sr-only": !label,
        })}
        htmlFor={props.id}
      >
        {label || props.title}
      </label>
      <select
        {...props}
        className="mt-1 block w-min rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
      />
    </div>
  );
}
