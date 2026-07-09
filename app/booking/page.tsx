import type { Metadata } from "next";
import BookingHeader from "@/components/booking/BookingHeader";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Booking Konsultasi — Dengar Jiwa",
  description: "Booking konsultasi psikologi online dengan mudah dan cepat.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-beige">
      <BookingHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <BookingWizard />
      </main>
    </div>
  );
}
