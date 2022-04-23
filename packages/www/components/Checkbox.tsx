import * as React from "react";

export function Checkbox({
  hint,
  label,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { hint?: string; id: string; label: string }) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          type="checkbox"
          {...props}
          aria-describedby={hint ? `${props.id}-description` : undefined}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      <div className="ml-3 text-sm">
        <label className="font-medium" htmlFor={props.id}>
          {label}
        </label>
        <p className="mt-0.5 text-sm" id={`${props.id}-description`}>
          {hint}
        </p>
      </div>
    </div>
  );
}
