const steps = [
  {
    number: "01",
    title: "Pilih Layanan",
    description: "Tentukan jenis konsultasi yang sesuai dengan kebutuhan Anda.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Pilih Psikolog",
    description: "Lihat profil dan pilih psikolog yang paling cocok untuk Anda.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Pilih Jadwal",
    description: "Atur tanggal dan waktu konsultasi sesuai ketersediaan Anda.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Konfirmasi & Bayar",
    description: "Selesaikan pembayaran dan dapatkan konfirmasi booking Anda.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-beige py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Booking Konsultasi dalam 4 Langkah Mudah
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Proses booking yang simpel dan cepat, hanya dalam beberapa menit.
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-16 right-[12.5%] left-[12.5%] hidden h-0.5 bg-border lg:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                {step.icon}
              </div>
              <span className="mt-4 block text-xs font-bold tracking-widest text-primary/60">
                {step.number}
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
