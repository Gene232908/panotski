import { Resend } from "resend";
import type { ConsultationInput } from "@/lib/validation";

// Notification email is best-effort: a missing RESEND_API_KEY should never
// block a consultation from being saved, so failures here are swallowed
// after logging.
export async function sendConsultationNotification(data: ConsultationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_TO_EMAIL;
  const from = process.env.NOTIFICATION_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.info(
      "[email] Skipping consultation notification — RESEND_API_KEY, NOTIFICATION_TO_EMAIL, or NOTIFICATION_FROM_EMAIL not configured.",
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: `New consultation request — ${data.fullName}`,
      html: renderNotificationHtml(data),
    });
  } catch (error) {
    console.error("[email] Failed to send consultation notification", error);
  }
}

function renderNotificationHtml(data: ConsultationInput) {
  // Mirrors the reduced form (plan §10.1).
  const rows: [string, string][] = [
    ["Name", data.fullName],
    ["Mobile Number", data.phone],
    ["Email Address", data.email],
    ["Service Interest", data.serviceInterest],
    ["Message", data.notes || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#346A5C;">${label}</td><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:sans-serif;color:#000;">
      <h2 style="color:#346A5C;">New Consultation Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px;">${tableRows}</table>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
