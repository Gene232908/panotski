import { Mail, Clock, ShieldCheck } from "lucide-react";
import { contactEmails } from "@/content/site";

const infoItems = [
  {
    icon: Mail,
    title: "Email Us",
    description: "For general inquiries and consultation follow-ups.",
    value: contactEmails.general,
    href: `mailto:${contactEmails.general}`,
  },
  {
    icon: Clock,
    title: "Response Time",
    description:
      "We typically confirm consultation requests within 1–2 business days.",
  },
  {
    icon: ShieldCheck,
    title: "Your Information",
    description:
      "Every request is stored securely and reviewed only by authorized CREServices staff.",
  },
];

export function ContactInfoSection() {
  return (
    <div className="flex flex-col gap-4">
      {infoItems.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-ink/10 bg-surface p-6 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-teal-200"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <item.icon className="h-[18px] w-[18px]" aria-hidden strokeWidth={1.75} />
          </span>
          <h3 className="mt-4 text-[15px] font-bold tracking-tight text-ink">
            {item.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-graphite-muted">
            {item.description}
          </p>
          {item.href ? (
            <a
              href={item.href}
              className="mt-2.5 inline-block text-sm font-semibold text-teal-700 transition-colors hover:text-teal-600"
            >
              {item.value}
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}
