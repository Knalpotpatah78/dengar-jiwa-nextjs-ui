"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BookingHeader from "@/components/booking/BookingHeader";
import { formatDate, formatPrice } from "@/lib/data";

interface BookingSummary {
  id: string;
  service: string;
  psychologist: string;
  date: string;
  time: string;
  price: number;
  paymentMethod: string;
  clientName: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<BookingSummary | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("lastBooking");
    if (stored) {
      setBooking(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="mt-6 font-serif text-3xl font-semibold text-foreground">
        Booking Berhasil!
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Terima kasih, {booking?.clientName || "klien"}! Booking Anda telah dikonfirmasi.
        Detail telah dikirim ke email Anda.
      </p>

      {booking && (
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-white p-6 text-left">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="text-sm text-muted">ID Booking</span>
            <span className="font-mono text-sm font-semibold text-primary">
              {bookingId || booking.id}
            </span>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Layanan</span>
              <span className="font-medium text-foreground">{booking.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Psikolog</span>
              <span className="font-medium text-foreground">{booking.psychologist}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Tanggal</span>
              <span className="font-medium text-foreground">{formatDate(booking.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Waktu</span>
              <span className="font-medium text-foreground">{booking.time} WIB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Pembayaran</span>
              <span className="font-medium text-foreground">{booking.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="font-medium text-foreground">Total Dibayar</span>
              <span className="font-serif text-lg font-semibold text-primary">
                {formatPrice(booking.price)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto mt-6 max-w-md rounded-xl bg-peach/50 p-4 text-left">
        <p className="text-sm text-foreground">
          <span className="font-medium">Langkah selanjutnya:</span> Tim kami akan menghubungi
          Anda via WhatsApp untuk konfirmasi dan instruksi pembayaran (jika belum lunas).
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/booking"
          className="rounded-full border border-primary px-8 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
        >
          Booking Lagi
        </Link>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-beige">
      <BookingHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
