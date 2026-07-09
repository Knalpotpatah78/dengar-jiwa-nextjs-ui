"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services, psychologists, timeSlots } from "@/lib/data";

const serviceNameToId: Record<string, string> = Object.fromEntries(
  services.map((s) => [s.name, s.id])
);

const psychNameToId: Record<string, string> = Object.fromEntries(
  psychologists.map((p) => [p.name, p.id])
);

export default function BookingCard() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(services[0].name);
  const [selectedPsychologist, setSelectedPsychologist] = useState(psychologists[0].name);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00");

  const handleContinue = () => {
    const params = new URLSearchParams({
      service: serviceNameToId[selectedService] || services[0].id,
      psychologist: psychNameToId[selectedPsychologist] || psychologists[0].id,
      time: selectedTime,
    });
    if (selectedDate) params.set("date", selectedDate);

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl shadow-black/8">
      <h3 className="font-serif text-lg font-semibold text-foreground">
        Booking Konsultasi
      </h3>

      <div className="mt-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            Pilih Layanan
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full rounded-xl border border-border bg-beige/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
          >
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            Pilih Psikolog
          </label>
          <select
            value={selectedPsychologist}
            onChange={(e) => setSelectedPsychologist(e.target.value)}
            className="w-full rounded-xl border border-border bg-beige/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
          >
            {psychologists.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">
            Pilih Tanggal
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-border bg-beige/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-muted">
            Pilih Waktu
          </label>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.slice(0, 7).map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`rounded-lg py-2 text-xs font-medium transition-colors ${
                  selectedTime === time
                    ? "bg-primary text-white"
                    : "border border-border bg-white text-muted hover:border-primary/30"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
      >
        Lanjutkan Booking
      </button>
    </div>
  );
}
