import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fieldTone, type FieldTone } from "@/components/ui/fieldTone";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options: string[];
  /** `dark` for fields sitting on an ink band — see fieldTone.ts. */
  tone?: FieldTone;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      required,
      className,
      id,
      placeholder,
      options,
      tone = "light",
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? props.name;
    const t = fieldTone[tone];
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className={cn("text-sm font-medium", t.label)}>
          {label}
          {required ? <span className={t.required}> *</span> : null}
        </label>
        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            defaultValue=""
            className={cn(
              "w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm transition-colors duration-200",
              t.field,
              error && t.errorBorder,
              className,
            )}
            aria-invalid={Boolean(error)}
            {...props}
          >
            {/* The popup is drawn by the OS, not by us, so the options carry
                their own colours — inheriting a light text colour from a dark
                select renders white-on-white in Chrome. */}
            <option value="" disabled className={t.option}>
              {placeholder ?? "Select an option"}
            </option>
            {options.map((option) => (
              <option key={option} value={option} className={t.option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            className={cn(
              "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2",
              t.chevron,
            )}
            aria-hidden
          />
        </div>
        {error ? <p className={cn("text-xs", t.errorText)}>{error}</p> : null}
      </div>
    );
  },
);

Select.displayName = "Select";
