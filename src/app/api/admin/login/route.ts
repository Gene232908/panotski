import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validation";
import {
  sessionCookieOptions,
  signSessionToken,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Enter a valid email and password." },
      { status: 400 },
    );
  }

  const admin = await verifyAdminCredentials(parsed.data.email, parsed.data.password);

  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const token = await signSessionToken({ sub: admin.id, email: admin.email });

  const response = NextResponse.json({ success: true });
  response.cookies.set(sessionCookieOptions.name, token, sessionCookieOptions);
  return response;
}
