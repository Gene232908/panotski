import type { Metadata } from "next";
import Image from "next/image";
import { brand } from "@/content/site";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-paper/10 bg-paper p-10">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo.svg" alt={`${brand.name} logo`} width={56} height={32} className="h-10 w-auto" />
          <h1 className="mt-6 text-xl font-bold tracking-tight text-ink">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Sign in to manage consultation requests.
          </p>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
