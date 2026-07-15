"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { StoreProvider } from "@/lib/store";
import { AuthProvider, useAuth } from "@/lib/auth";

function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Engineers", href: "/admin/engineers", icon: "👷" },
    { label: "Tasks", href: "/admin/tasks", icon: "📋" },
    { label: "Earnings", href: "/admin/earnings", icon: "💰" },
    { label: "Payment QR", href: "/admin/payment", icon: "📱" },
    { label: "Gallery", href: "/admin/gallery", icon: "🖼️" },
  ];

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-gray-900 text-white">
      <div className="p-6">
        <Link href="/admin" className="text-xl font-bold text-blue-400">
          TechConnect
        </Link>
        <p className="mt-1 text-xs text-gray-400">Admin Panel</p>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-gray-400 transition hover:bg-gray-800 hover:text-white"
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isLoggedIn) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreProvider>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </StoreProvider>
    </AuthProvider>
  );
}
