import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { consultationStatusUpdateSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();
  const status = searchParams.get("status");

  const where: Prisma.ConsultationWhereInput = {};

  if (status && status !== "ALL") {
    where.status = status as Prisma.ConsultationWhereInput["status"];
  }

  if (search) {
    where.OR = [
      { fullName: { contains: search } },
      { email: { contains: search } },
      { companyName: { contains: search } },
      { serviceInterest: { contains: search } },
    ];
  }

  const consultations = await prisma.consultation.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, consultations });
}

export async function PATCH(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = consultationStatusUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const consultation = await prisma.consultation.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json({ success: true, consultation });
}
