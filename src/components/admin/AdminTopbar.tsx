"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { brand } from "@/content/site";

type AdminTopbarProps = {
  email: string;
};

export function AdminTopbar({ email }: AdminTopbarProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-ink/10 bg-white">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 md:px-10">
        <Link href="/admin/consultations" className="flex items-center gap-3">
          <Image src="/logo.svg" alt={`${brand.name} logo`} width={36} height={20} className="h-8 w-auto" />
          <span className="text-sm font-bold tracking-tight text-ink">
            {brand.name} <span className="font-normal text-ink/40">Admin</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-ink/50 sm:inline">{email}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink/70 transition-colors duration-200 hover:border-teal-600 hover:text-teal-700"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
