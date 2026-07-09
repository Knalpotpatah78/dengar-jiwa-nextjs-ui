import { BrainLeafIcon } from "./icons";

const layananLinks = [
  "Konsultasi Individu",
  "Terapi Pasangan",
  "Konseling Anak",
  "Assessment Psikologi",
];

const perusahaanLinks = [
  "Tentang Kami",
  "Karir",
  "Blog",
  "Kerjasama",
];

const bantuanLinks = [
  "FAQ",
  "Privacy Policy",
  "Terms of Service",
  "Kebijakan Refund",
];

export default function Footer() {
  return (
    <footer id="kontak" className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <BrainLeafIcon className="w-7 h-7" />
              <span className="font-serif text-xl font-semibold">Dengar Jiwa</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Platform kesehatan mental terpercaya untuk membantu Anda tumbuh dan berproses dalam perjalanan hidup.
            </p>
            <div className="mt-6 flex gap-3">
              {["FB", "TW", "IG", "YT"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-medium transition-colors hover:bg-white/20"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Layanan</h4>
            <ul className="space-y-2.5">
              {layananLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-2.5">
              {perusahaanLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Bantuan</h4>
            <ul className="space-y-2.5">
              {bantuanLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>+62 812-3456-7890</li>
              <li>hello@dengarjiwa.id</li>
              <li className="leading-relaxed">
                Jl. Kesehatan Mental No. 42<br />
                Jakarta Selatan, 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Dengar Jiwa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
