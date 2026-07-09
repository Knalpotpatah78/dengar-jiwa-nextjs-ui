import { apiError, apiSuccess } from "@/lib/api/server";

export async function POST(request: Request) {
  const { name, email, phone, password } = await request.json();

  if (!name || !email || !phone || !password) {
    return apiError("Semua field wajib diisi", 422, "VALIDATION_ERROR");
  }

  if (password.length < 6) {
    return apiError("Password minimal 6 karakter", 422, "VALIDATION_ERROR");
  }

  return apiSuccess(
    {
      user: {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
      },
      token: "demo-token",
    },
    "Pendaftaran berhasil",
    201
  );
}
