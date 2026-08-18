import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Middleware already gates /admin/*, this is a defense-in-depth check so
  // the dashboard never renders without a resolvable session.
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-paper">
      <AdminTopbar email={admin.email} />
      <main className="mx-auto max-w-content px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
