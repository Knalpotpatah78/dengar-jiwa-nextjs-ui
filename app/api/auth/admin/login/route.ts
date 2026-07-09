import { cookies } from "next/headers";
import { apiError, apiSuccess } from "@/lib/api/server";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_TOKEN,
  verifyAdminCredentials,
} from "@/lib/auth/admin";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return apiError("Email dan password wajib diisi", 422, "VALIDATION_ERROR");
  }

  if (!verifyAdminCredentials(email, password)) {
    return apiError("Email atau password salah", 401, "INVALID_CREDENTIALS");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, ADMIN_SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return apiSuccess(
    {
      user: {
        id: "admin",
        name: "Administrator",
        email,
        role: "admin" as const,
      },
    },
    "Login berhasil"
  );
}
