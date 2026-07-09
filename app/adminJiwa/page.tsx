"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { adminAuthApi, ApiError } from "@/lib/api";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/adminJiwa/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await adminAuthApi.login({ email, password });
      router.push(redirect);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Gagal login. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="font-serif text-3xl font-semibold text-primary">
              Dengar Jiwa
            </h1>
          </Link>
          <p className="mt-2 text-sm text-muted">Panel Administrasi</p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Masuk ke Admin
          </h2>
          <p className="mt-1 text-sm text-muted">
            Masukkan kredensial admin untuk melanjutkan
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="admin@dengarjiwa.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          <Link href="/" className="hover:text-primary hover:underline">
            ← Kembali ke Website
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-beige">
          <p className="text-sm text-muted">Memuat...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
