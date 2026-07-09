"use client";

import { useState } from "react";
import { BrainLeafIcon } from "./icons";
import AuthModal, { type AuthTab } from "./AuthModal";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Psikolog", href: "#psikolog" },
  { label: "Artikel", href: "#artikel" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#kontak" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>("login");

  const openAuth = (tab: AuthTab) => {
    setAuthTab(tab);
    setAuthOpen(true);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#beranda" className="flex items-center gap-2 text-primary">
            <BrainLeafIcon className="w-7 h-7" />
            <span className="font-serif text-xl font-semibold tracking-tight">
              Dengar Jiwa
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={() => openAuth("login")}
              className="rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => openAuth("register")}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Daftar
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-white px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="flex-1 rounded-full border border-primary py-2 text-sm font-medium text-primary"
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => openAuth("register")}
                className="flex-1 rounded-full bg-primary py-2 text-sm font-medium text-white"
              >
                Daftar
              </button>
            </div>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authOpen}
        defaultTab={authTab}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
}
