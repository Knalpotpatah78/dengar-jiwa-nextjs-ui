import Image from "next/image";
import Link from "next/link";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
];

export default function BottomCTA() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-beige">
          <div className="grid items-center gap-8 lg:grid-cols-3">
            <div className="relative hidden aspect-square lg:block">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&h=500&fit=crop"
                alt="Ruang konsultasi"
                fill
                className="object-cover"
              />
            </div>

            <div className="px-8 py-12 text-center lg:py-16 lg:text-left">
              <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                Siap Memulai Perjalanan Menuju Diri yang Lebih Baik?
              </h2>
              <p className="mt-4 text-muted">
                Jangan tunda lagi. Ambil langkah pertama menuju kesehatan mental yang lebih baik bersama Dengar Jiwa.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 px-8 pb-12 lg:items-end lg:pr-12 lg:pb-0">
              <Link
                href="/booking"
                className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Booking Sekarang
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {avatars.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-beige"
                    >
                      <Image src={src} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted">
                  <span className="font-semibold text-foreground">1000+</span> klien telah merasakan manfaatnya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
