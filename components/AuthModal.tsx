"use client";

import { useEffect, useState } from "react";
import { BrainLeafIcon } from "./icons";

export type AuthTab = "login" | "register";

interface AuthModalProps {
  isOpen: boolean;
  defaultTab?: AuthTab;
  onClose: () => void;
}

export default function AuthModal({
  isOpen,
  defaultTab = "login",
  onClose,
}: AuthModalProps) {
  const [tab, setTab] = useState<AuthTab>(defaultTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
      setMessage("");
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    await new Promise((r) => setTimeout(r, 800));

    setMessage("Login berhasil! Selamat datang kembali.");
    setIsSubmitting(false);

    setTimeout(onClose, 1200);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (registerForm.password !== registerForm.confirmPassword) {
      setMessage("Konfirmasi password tidak cocok.");
      return;
    }

    if (registerForm.password.length < 6) {
      setMessage("Password minimal 6 karakter.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    setMessage("Pendaftaran berhasil! Silakan masuk ke akun Anda.");
    setIsSubmitting(false);

    setTimeout(() => {
      setTab("login");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-beige hover:text-foreground"
          aria-label="Tutup"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-beige px-6 pb-4 pt-8 text-center">
          <div className="mx-auto flex w-fit items-center gap-2 text-primary">
            <BrainLeafIcon className="h-6 w-6" />
            <span className="font-serif text-lg font-semibold">Dengar Jiwa</span>
          </div>
          <p id="auth-modal-title" className="mt-2 text-sm text-muted">
            {tab === "login"
              ? "Masuk ke akun Anda"
              : "Buat akun baru untuk mulai booking"}
          </p>
        </div>

        <div className="flex border-b border-border">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setMessage("");
            }}
            className={`flex-1 py-3.5 text-sm font-medium transition-colors ${
              tab === "login"
                ? "border-b-2 border-primary text-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setMessage("");
            }}
            className={`flex-1 py-3.5 text-sm font-medium transition-colors ${
              tab === "register"
                ? "border-b-2 border-primary text-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {message && (
            <div
              className={`mb-4 rounded-xl px-4 py-3 text-sm ${
                message.includes("berhasil")
                  ? "bg-primary/10 text-primary"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  placeholder="email@contoh.com"
                  className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  placeholder="Masukkan password"
                  className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                >
                  Lupa password?
                </button>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
              >
                {isSubmitting ? "Memproses..." : "Masuk"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={registerForm.name}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, name: e.target.value })
                  }
                  placeholder="Masukkan nama lengkap"
                  className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                  placeholder="email@contoh.com"
                  className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  required
                  value={registerForm.phone}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, phone: e.target.value })
                  }
                  placeholder="08xx xxxx xxxx"
                  className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    placeholder="Min. 6 karakter"
                    className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    required
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Ulangi password"
                    className="w-full rounded-xl border border-border bg-beige/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
              >
                {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
              </button>
            </form>
          )}

          <p className="mt-5 text-center text-xs text-muted">
            {tab === "login" ? (
              <>
                Belum punya akun?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setTab("register");
                    setMessage("");
                  }}
                  className="font-medium text-primary hover:underline"
                >
                  Daftar di sini
                </button>
              </>
            ) : (
              <>
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setTab("login");
                    setMessage("");
                  }}
                  className="font-medium text-primary hover:underline"
                >
                  Masuk di sini
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
