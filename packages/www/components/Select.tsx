import * as React from "react";

export function Select({
  className,
  label,
  ...props
}: React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { id: string; label: string }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium" htmlFor={props.id}>
        {label}
      </label>
      <select
        {...props}
        className="mt-1 block w-min rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
      />
    </div>
  );
}
