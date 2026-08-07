import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  required?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-sm font-medium text-ink/80">
          {label}
          {required ? <span className="text-teal-700"> *</span> : null}
        </label>
        <textarea
          id={inputId}
          ref={ref}
          rows={4}
          className={cn(
            "resize-none rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink transition-colors duration-200",
            "placeholder:text-ink/35 focus:border-teal-600",
            error && "border-red-500",
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
