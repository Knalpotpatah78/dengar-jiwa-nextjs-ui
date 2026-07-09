import { cookies } from "next/headers";
import { apiSuccess } from "@/lib/api/server";
import { ADMIN_COOKIE } from "@/lib/auth/admin";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);

  return apiSuccess(null, "Logout berhasil");
}
