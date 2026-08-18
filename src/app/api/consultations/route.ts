import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { consultationSchema } from "@/lib/validation";
import { sendConsultationNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = consultationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Plan §10.2: the lead is retained on explicit submission. There is no OTP
  // or contact-verification step — an unverified phone number must never
  // block a submission from being stored.
  const consultation = await prisma.consultation.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      serviceInterest: data.serviceInterest,
      notes: data.notes || null,
    },
  });

  await sendConsultationNotification(data);

  return NextResponse.json({ success: true, id: consultation.id }, { status: 201 });
}
