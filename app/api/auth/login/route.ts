import { apiError, apiSuccess } from "@/lib/api/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return apiError("Email dan password wajib diisi", 422, "VALIDATION_ERROR");
  }

  if (password.length < 6) {
    return apiError("Password minimal 6 karakter", 422, "VALIDATION_ERROR");
  }

  return apiSuccess(
    {
      user: {
        id: "user-demo",
        name: "Pengguna Demo",
        email,
      },
      token: "demo-token",
    },
    "Login berhasil"
  );
}
