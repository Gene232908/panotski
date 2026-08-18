import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { fieldTone, type FieldTone } from "@/components/ui/fieldTone";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  required?: boolean;
  /** `dark` for fields sitting on an ink band — see fieldTone.ts. */
  tone?: FieldTone;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className, id, tone = "light", ...props }, ref) => {
    const inputId = id ?? props.name;
    const t = fieldTone[tone];
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className={cn("text-sm font-medium", t.label)}>
          {label}
          {required ? <span className={t.required}> *</span> : null}
        </label>
        <textarea
          id={inputId}
          ref={ref}
          rows={4}
          className={cn(
            "resize-none rounded-xl border px-4 py-3 text-sm transition-colors duration-200",
            t.field,
            error && t.errorBorder,
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error ? <p className={cn("text-xs", t.errorText)}>{error}</p> : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
