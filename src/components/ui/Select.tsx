import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options: string[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, required, className, id, placeholder, options, ...props },
    ref,
  ) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-sm font-medium text-ink/80">
          {label}
          {required ? <span className="text-teal-700"> *</span> : null}
        </label>
        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            defaultValue=""
            className={cn(
              "w-full appearance-none rounded-xl border border-ink/15 bg-paper px-4 py-3 pr-10 text-sm text-ink transition-colors duration-200",
              "focus:border-teal-600",
              error && "border-red-500",
              className,
            )}
            aria-invalid={Boolean(error)}
            {...props}
          >
            <option value="" disabled>
              {placeholder ?? "Select an option"}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            aria-hidden
          />
        </div>
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    );
  },
);

Select.displayName = "Select";
