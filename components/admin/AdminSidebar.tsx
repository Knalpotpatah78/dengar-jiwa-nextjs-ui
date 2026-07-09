"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminAuthApi } from "@/lib/api";

const navItems = [
  { href: "/adminJiwa/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/adminJiwa/bookings", label: "Booking", icon: "📅" },
  { href: "/adminJiwa/psychologists", label: "Dokter", icon: "👨‍⚕️" },
  { href: "/adminJiwa/testimonials", label: "Testimoni", icon: "💬" },
  { href: "/adminJiwa/articles", label: "Artikel", icon: "📝" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await adminAuthApi.logout();
    } catch {
      /* ignore */
    }
    router.push("/adminJiwa");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-primary text-white">
      <div className="border-b border-white/10 px-6 py-5">
        <Link href="/adminJiwa/dashboard" className="block">
          <h1 className="font-serif text-xl font-semibold">Dengar Jiwa</h1>
          <p className="mt-0.5 text-xs text-white/60">Admin Panel</p>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          ← Kembali ke Website
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}
