import Link from "next/link";
import { BrainLeafIcon } from "@/components/icons";

export default function BookingHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <BrainLeafIcon className="w-6 h-6" />
          <span className="font-serif text-lg font-semibold">Dengar Jiwa</span>
        </Link>
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-primary"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </header>
  );
}
