"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { consultationSchema, type ConsultationInput } from "@/lib/validation";
import { BrandText } from "@/components/ui/BrandMark";
import { consultationFormLabels, formStates } from "@/content/contact";
import { serviceInterestOptions } from "@/content/services";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "success" | "error";

type ConsultationFormProps = {
  /**
   * Surface the form is sitting on. `dark` is the Contact band, which is pure
   * black — the fields, the states and the submit button all invert. Everything
   * a visitor reads is still `paper` on near-black, well above the contrast
   * floor; blending in must not cost legibility on the one component on the
   * site where a misread character loses a lead.
   */
  tone?: "light" | "dark";
};

export function ConsultationForm({ tone = "light" }: ConsultationFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const dark = tone === "dark";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
  });

  async function onSubmit(data: ConsultationInput) {
    setSubmitState("idle");
    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Request failed");

      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center rounded-2xl border px-6 py-10 text-center",
          dark ? "border-teal-300/25 bg-teal-300/[0.07]" : "border-teal-200 bg-teal-50",
        )}
      >
        <CheckCircle2
          className={cn("h-11 w-11", dark ? "text-teal-300" : "text-teal-700")}
          aria-hidden
        />
        <h3
          className={cn(
            "mt-5 text-lg font-bold tracking-tight",
            dark ? "text-paper" : "text-ink",
          )}
        >
          {formStates.success.headline}
        </h3>
        <p
          className={cn(
            "mt-2 max-w-sm text-sm leading-relaxed",
            dark ? "text-paper/70" : "text-ink/65",
          )}
        >
          <BrandText text={formStates.success.body} tone={tone} />
        </p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className={cn(
            "mt-7 rounded-full border px-6 py-3 text-sm font-semibold transition-colors duration-200",
            dark
              ? "border-white/20 text-paper hover:border-teal-300 hover:text-teal-300"
              : "border-ink/15 text-ink hover:border-teal-700 hover:text-teal-700",
          )}
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {submitState === "error" ? (
        <div
          className={cn(
            "flex items-start gap-3 rounded-2xl border p-4 text-sm",
            dark
              ? "border-red-400/30 bg-red-400/10 text-red-200"
              : "border-red-200 bg-red-50 text-red-700",
          )}
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">{formStates.error.headline}</p>
            <p className={cn("mt-0.5", dark ? "text-red-200/80" : "text-red-600/90")}>
              {formStates.error.body}
            </p>
          </div>
        </div>
      ) : null}

      {/* Plan §10.1 — five fields only. Company, Address, Preferred Date and
          Preferred Time were removed. */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label={consultationFormLabels.fullName}
          required
          tone={tone}
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <Input
          label={consultationFormLabels.phone}
          type="tel"
          required
          tone={tone}
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      <Input
        label={consultationFormLabels.email}
        type="email"
        required
        tone={tone}
        {...register("email")}
        error={errors.email?.message}
      />

      <Select
        label={consultationFormLabels.serviceInterest}
        required
        tone={tone}
        placeholder="Select a service"
        // Same ordered source as What We Do and Detailed Services (plan §6.1).
        options={[...serviceInterestOptions]}
        {...register("serviceInterest")}
        error={errors.serviceInterest?.message}
      />

      <Textarea
        label={consultationFormLabels.notes}
        required
        tone={tone}
        {...register("notes")}
        error={errors.notes?.message}
      />

      {/* On the dark band the button goes brand teal rather than ink — a black
          pill on a black section disappears. This is the same teal pill the
          header already puts on its dark bar, so the page's two calls to
          action match. */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "group mt-2 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-paper transition-all duration-300 ease-premium hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50",
          dark ? "bg-teal-700 hover:bg-teal-500" : "bg-ink hover:bg-teal-700",
        )}
      >
        {isSubmitting
          ? consultationFormLabels.submitting
          : consultationFormLabels.submit}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
          aria-hidden
        />
      </button>
    </form>
  );
}
