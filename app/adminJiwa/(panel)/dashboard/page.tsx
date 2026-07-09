"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  bookingsApi,
  psychologistsApi,
  testimonialsApi,
  articlesApi,
  type Booking,
} from "@/lib/api";
import { formatPrice } from "@/lib/data";
import StatusBadge from "@/components/admin/StatusBadge";

interface Stats {
  bookings: number;
  psychologists: number;
  testimonials: number;
  articles: number;
  pendingBookings: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    bookings: 0,
    psychologists: 0,
    testimonials: 0,
    articles: 0,
    pendingBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [bookings, psychologists, testimonials, articles] =
          await Promise.all([
            bookingsApi.getAll(),
            psychologistsApi.getAll(),
            testimonialsApi.getAll(true),
            articlesApi.getAll(true),
          ]);

        setStats({
          bookings: bookings.length,
          psychologists: psychologists.length,
          testimonials: testimonials.length,
          articles: articles.length,
          pendingBookings: bookings.filter((b) => b.status === "pending")
            .length,
        });
        setRecentBookings(bookings.slice(0, 5));
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    {
      label: "Total Booking",
      value: stats.bookings,
      href: "/adminJiwa/bookings",
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Menunggu Konfirmasi",
      value: stats.pendingBookings,
      href: "/adminJiwa/bookings",
      color: "bg-amber-100 text-amber-700",
    },
    {
      label: "Dokter / Psikolog",
      value: stats.psychologists,
      href: "/adminJiwa/psychologists",
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Testimoni",
      value: stats.testimonials,
      href: "/adminJiwa/testimonials",
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Artikel",
      value: stats.articles,
      href: "/adminJiwa/articles",
      color: "bg-peach text-primary",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted">
          Ringkasan aktivitas dan data Dengar Jiwa
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-white"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
            >
              <p className="text-sm text-muted">{card.label}</p>
              <p className={`mt-2 text-3xl font-semibold ${card.color.split(" ")[1]}`}>
                {card.value}
              </p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-border bg-white">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-lg font-semibold">Booking Terbaru</h2>
          <Link
            href="/adminJiwa/bookings"
            className="text-sm font-medium text-primary hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-muted">Memuat data...</div>
        ) : recentBookings.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted">
            Belum ada booking. Data akan muncul setelah klien melakukan booking.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted">
                  <th className="px-6 py-3 font-medium">ID</th>
                  <th className="px-6 py-3 font-medium">Klien</th>
                  <th className="px-6 py-3 font-medium">Layanan</th>
                  <th className="px-6 py-3 font-medium">Tanggal</th>
                  <th className="px-6 py-3 font-medium">Harga</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-6 py-3 font-mono text-xs">
                      {booking.id}
                    </td>
                    <td className="px-6 py-3">{booking.clientName}</td>
                    <td className="px-6 py-3">{booking.service}</td>
                    <td className="px-6 py-3">
                      {booking.date} · {booking.time}
                    </td>
                    <td className="px-6 py-3">{formatPrice(booking.price)}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
