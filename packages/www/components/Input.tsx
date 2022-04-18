import * as React from "react";

export function Input({
  hint,
  label,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { hint?: string; id: string; label: string }) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={props.id}>
        {label}
      </label>
      <div className="mt-1">
        <input
          {...props}
          aria-describedby={hint ? `${props.id}-description` : undefined}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 text-gray-700 rounded-md w-full max-w-xs"
        />
      </div>
      {hint && (
        <p className="mt-0.5 text-sm" id={`${props.id}-description`}>
          {hint}
        </p>
      )}
    </div>
  );
}
