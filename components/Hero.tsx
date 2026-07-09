import Image from "next/image";
import Link from "next/link";
import BookingCard from "./BookingCard";
import { ArrowRightIcon } from "./icons";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    label: "Psikolog Berpengalaman",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    label: "Konsultasi Aman & Privasi",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    label: "Mudah & Cepat Booking Online",
  },
];

export default function Hero() {
  return (
    <section id="beranda" className="bg-beige">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-block rounded-full bg-peach px-4 py-1.5 text-xs font-medium text-primary">
              Kesehatan Mental, Prioritas Kita
            </span>

            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              Ruang Aman untuk Tumbuh dan Berproses
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Dengar Jiwa menghadirkan layanan konsultasi psikologi profesional yang aman,
              nyaman, dan mudah diakses. Mulai perjalanan menuju kesehatan mental yang lebih baik.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-peach text-primary">
                    {f.icon}
                  </div>
                  <span className="text-xs font-medium text-foreground">{f.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Booking Sekarang
              </Link>
              <a
                href="#layanan"
                className="flex items-center gap-2 rounded-full border border-primary px-7 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
              >
                Lihat Layanan
                <ArrowRightIcon />
              </a>
            </div>
          </div>

          <div className="relative flex flex-col items-center gap-8 lg:items-end">
            <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-peach-light">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=750&fit=crop"
                  alt="Ruang konsultasi yang nyaman"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="w-full max-w-sm lg:absolute lg:-bottom-6 lg:-left-12 lg:z-10">
              <BookingCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
