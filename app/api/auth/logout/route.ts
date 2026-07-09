import { apiSuccess } from "@/lib/api/server";

export async function POST() {
  return apiSuccess(null, "Logout berhasil");
}
