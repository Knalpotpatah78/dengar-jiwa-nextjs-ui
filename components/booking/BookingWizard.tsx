"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import BookingStepper from "./BookingStepper";
import {
  services,
  psychologists,
  timeSlots,
  paymentMethods,
  formatPrice,
  formatDate,
  getPsychologistsForService,
  getServiceById,
  getPsychologistById,
  generateBookingId,
} from "@/lib/data";
import { StarIcon } from "@/components/icons";

export interface BookingFormData {
  serviceId: string;
  psychologistId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  paymentMethod: string;
}

const initialFormData: BookingFormData = {
  serviceId: "",
  psychologistId: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
  paymentMethod: "transfer",
};

function getMinDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

function getInitialStep(data: BookingFormData): number {
  if (data.serviceId && data.psychologistId && data.date && data.time) return 4;
  if (data.serviceId && data.psychologistId) return 3;
  if (data.serviceId) return 2;
  return 1;
}

function BookingWizardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);

  useEffect(() => {
    const serviceId = searchParams.get("service") || "";
    const psychologistId = searchParams.get("psychologist") || "";
    const date = searchParams.get("date") || "";
    const time = searchParams.get("time") || "";
    const stepParam = searchParams.get("step");

    const initial = { ...initialFormData, serviceId, psychologistId, date, time };
    setFormData(initial);

    if (stepParam) {
      setStep(Number(stepParam));
    } else {
      setStep(getInitialStep(initial));
    }
  }, [searchParams]);

  const updateForm = (updates: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const selectedService = getServiceById(formData.serviceId);
  const selectedPsychologist = getPsychologistById(formData.psychologistId);
  const availablePsychologists = formData.serviceId
    ? getPsychologistsForService(formData.serviceId)
    : psychologists;

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.serviceId;
      case 2:
        return !!formData.psychologistId;
      case 3:
        return !!formData.date && !!formData.time;
      case 4:
        return (
          !!formData.name.trim() &&
          !!formData.email.trim() &&
          !!formData.phone.trim() &&
          !!formData.paymentMethod
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!canProceed() || !selectedService || !selectedPsychologist) return;

    setIsSubmitting(true);

    const bookingId = generateBookingId();
    const bookingSummary = {
      id: bookingId,
      service: selectedService.name,
      psychologist: selectedPsychologist.name,
      date: formData.date,
      time: formData.time,
      price: selectedService.price,
      paymentMethod:
        paymentMethods.find((p) => p.id === formData.paymentMethod)?.name || "",
      clientName: formData.name,
    };

    sessionStorage.setItem("lastBooking", JSON.stringify(bookingSummary));

    await new Promise((r) => setTimeout(r, 1200));

    router.push(`/booking/success?id=${bookingId}`);
  };

  return (
    <div>
      <BookingStepper currentStep={step} />

      {step === 1 && (
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Pilih Layanan
          </h1>
          <p className="mt-2 text-muted">
            Pilih jenis konsultasi yang sesuai dengan kebutuhan Anda.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() =>
                  updateForm({
                    serviceId: service.id,
                    psychologistId: "",
                  })
                }
                className={`rounded-2xl border p-5 text-left transition-all ${
                  formData.serviceId === service.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border bg-white hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                      <span>{service.duration} menit</span>
                      <span>·</span>
                      <span className="font-semibold text-primary">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      formData.serviceId === service.id
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}
                  >
                    {formData.serviceId === service.id && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Pilih Psikolog
          </h1>
          <p className="mt-2 text-muted">
            Pilih psikolog yang paling cocok untuk kebutuhan Anda.
          </p>

          <div className="mt-8 space-y-4">
            {availablePsychologists.map((psych) => (
              <button
                key={psych.id}
                onClick={() => updateForm({ psychologistId: psych.id })}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all sm:p-5 ${
                  formData.psychologistId === psych.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border bg-white hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
                  <Image
                    src={psych.image}
                    alt={psych.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {psych.name}
                  </h3>
                  <p className="text-sm text-primary">{psych.title}</p>
                  <p className="mt-1 text-xs text-muted">{psych.bio}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <StarIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium">{psych.rating}</span>
                    <span className="text-xs text-muted">
                      ({psych.reviews} ulasan) · {psych.experience}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    formData.psychologistId === psych.id
                      ? "border-primary bg-primary"
                      : "border-border"
                  }`}
                >
                  {formData.psychologistId === psych.id && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Pilih Jadwal
          </h1>
          <p className="mt-2 text-muted">
            Atur tanggal dan waktu konsultasi sesuai ketersediaan Anda.
          </p>

          {selectedPsychologist && (
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-beige p-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={selectedPsychologist.image}
                  alt={selectedPsychologist.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {selectedPsychologist.name}
                </p>
                <p className="text-xs text-muted">{selectedService?.name}</p>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Pilih Tanggal
              </label>
              <input
                type="date"
                min={getMinDate()}
                value={formData.date}
                onChange={(e) => updateForm({ date: e.target.value })}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-foreground">
                Pilih Waktu
              </label>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => updateForm({ time })}
                    className={`rounded-xl py-2.5 text-sm font-medium transition-colors ${
                      formData.time === time
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
        </div>
      )}

      {step === 4 && selectedService && selectedPsychologist && (
        <div>
          <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Konfirmasi & Bayar
          </h1>
          <p className="mt-2 text-muted">
            Periksa detail booking dan lengkapi data diri Anda.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-medium text-foreground">Data Diri</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateForm({ name: e.target.value })}
                      placeholder="Masukkan nama lengkap"
                      className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                        placeholder="email@contoh.com"
                        className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted">
                        No. Telepon *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateForm({ phone: e.target.value })}
                        placeholder="08xx xxxx xxxx"
                        className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Catatan (opsional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateForm({ notes: e.target.value })}
                      placeholder="Ceritakan singkat apa yang ingin Anda diskusikan..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-medium text-foreground">Metode Pembayaran</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => updateForm({ paymentMethod: method.id })}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        formData.paymentMethod === method.id
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <p className="text-sm font-medium text-foreground">
                        {method.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {method.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl border border-border bg-beige p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Ringkasan Booking
                </h3>

                <div className="mt-5 space-y-4 border-b border-border pb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                      <Image
                        src={selectedPsychologist.image}
                        alt={selectedPsychologist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {selectedPsychologist.name}
                      </p>
                      <p className="text-xs text-muted">
                        {selectedPsychologist.title}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Layanan</span>
                      <span className="font-medium text-foreground">
                        {selectedService.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Durasi</span>
                      <span className="font-medium text-foreground">
                        {selectedService.duration} menit
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Tanggal</span>
                      <span className="font-medium text-foreground text-right">
                        {formatDate(formData.date)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Waktu</span>
                      <span className="font-medium text-foreground">
                        {formData.time} WIB
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="font-serif text-xl font-semibold text-primary">
                    {formatPrice(selectedService.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
          >
            Kembali
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Lanjutkan
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="flex items-center gap-2 rounded-full bg-primary px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Memproses...
              </>
            ) : (
              "Bayar & Konfirmasi"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function BookingWizard() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <BookingWizardInner />
    </Suspense>
  );
}
