import classnames from "classnames";
import * as React from "react";

export function Select({
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
    <div>
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
        className="mt-1 block w-min rounded-md border-gray-300 py-2 pl-3 pr-10 text-base text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}
