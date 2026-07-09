"use client";

import { useEffect, useState } from "react";
import { bookingsApi, type Booking } from "@/lib/api";
import { formatPrice } from "@/lib/data";
import StatusBadge from "@/components/admin/StatusBadge";

const statusOptions: Booking["status"][] = [
  "pending",
  "confirmed",
  "cancelled",
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Booking["status"] | "all">("all");

  async function load() {
    setLoading(true);
    try {
      const data = await bookingsApi.getAll();
      setBookings(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatusChange(id: string, status: Booking["status"]) {
    try {
      await bookingsApi.updateStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch {
      alert("Gagal memperbarui status");
    }
  }

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold">Kelola Booking</h1>
          <p className="mt-1 text-sm text-muted">
            Lihat dan kelola semua permintaan booking klien
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", ...statusOptions] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                filter === s
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-muted hover:border-primary"
              }`}
            >
              {s === "all"
                ? "Semua"
                : s === "pending"
                  ? "Menunggu"
                  : s === "confirmed"
                    ? "Dikonfirmasi"
                    : "Dibatalkan"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        {loading ? (
          <div className="p-8 text-center text-sm text-muted">Memuat data...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted">
            {filter === "all"
              ? "Belum ada data booking."
              : "Tidak ada booking dengan status ini."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-beige/50 text-left text-muted">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Klien</th>
                  <th className="px-5 py-3 font-medium">Psikolog</th>
                  <th className="px-5 py-3 font-medium">Layanan</th>
                  <th className="px-5 py-3 font-medium">Jadwal</th>
                  <th className="px-5 py-3 font-medium">Pembayaran</th>
                  <th className="px-5 py-3 font-medium">Harga</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-border last:border-0 hover:bg-beige/30"
                  >
                    <td className="px-5 py-3 font-mono text-xs">{booking.id}</td>
                    <td className="px-5 py-3 font-medium">
                      {booking.clientName}
                    </td>
                    <td className="px-5 py-3">{booking.psychologist}</td>
                    <td className="px-5 py-3">{booking.service}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      {booking.date}
                      <br />
                      <span className="text-muted">{booking.time}</span>
                    </td>
                    <td className="px-5 py-3">{booking.paymentMethod}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      {formatPrice(booking.price)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col gap-2">
                        <StatusBadge status={booking.status} />
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(
                              booking.id,
                              e.target.value as Booking["status"]
                            )
                          }
                          className="rounded-lg border border-border bg-white px-2 py-1 text-xs"
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s === "pending"
                                ? "Menunggu"
                                : s === "confirmed"
                                  ? "Dikonfirmasi"
                                  : "Dibatalkan"}
                            </option>
                          ))}
                        </select>
                      </div>
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
