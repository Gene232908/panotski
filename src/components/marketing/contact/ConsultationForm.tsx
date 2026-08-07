"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { consultationSchema, type ConsultationInput } from "@/lib/validation";
import {
  consultationFormLabels,
  formStates,
  timeSlotOptions,
} from "@/content/contact";
import { services } from "@/content/services";

type SubmitState = "idle" | "success" | "error";

export function ConsultationForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

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
      <div className="flex flex-col items-center rounded-3xl border border-teal-200 bg-teal-50 p-12 text-center">
        <CheckCircle2 className="h-11 w-11 text-teal-700" aria-hidden />
        <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">
          {formStates.success.headline}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/65">
          {formStates.success.body}
        </p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="mt-7 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-teal-700 hover:text-teal-700"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {submitState === "error" ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">{formStates.error.headline}</p>
            <p className="mt-0.5 text-red-600/90">{formStates.error.body}</p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label={consultationFormLabels.fullName}
          required
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <Input
          label={consultationFormLabels.email}
          type="email"
          required
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label={consultationFormLabels.phone}
          type="tel"
          required
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Input
          label={consultationFormLabels.companyName}
          required
          {...register("companyName")}
          error={errors.companyName?.message}
        />
      </div>

      <Input
        label={consultationFormLabels.address}
        {...register("address")}
        error={errors.address?.message}
      />

      <Select
        label={consultationFormLabels.serviceInterest}
        required
        placeholder="Select a service"
        options={services.map((service) => service.name)}
        {...register("serviceInterest")}
        error={errors.serviceInterest?.message}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label={consultationFormLabels.preferredDate}
          type="date"
          required
          {...register("preferredDate")}
          error={errors.preferredDate?.message}
        />
        <Select
          label={consultationFormLabels.preferredTime}
          required
          placeholder="Select a time"
          options={[...timeSlotOptions]}
          {...register("preferredTime")}
          error={errors.preferredTime?.message}
        />
      </div>

      <Textarea
        label={consultationFormLabels.notes}
        required
        {...register("notes")}
        error={errors.notes?.message}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-paper transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-teal-700 disabled:pointer-events-none disabled:opacity-50"
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
