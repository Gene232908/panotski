import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE_NAME,
  type SessionPayload,
  verifySessionToken,
} from "@/lib/session";

export {
  SESSION_COOKIE_NAME,
  signSessionToken,
  verifySessionToken,
  sessionCookieOptions,
  type SessionPayload,
} from "@/lib/session";

export async function getCurrentAdmin(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function verifyAdminCredentials(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return null;

  return { id: admin.id, email: admin.email };
}
