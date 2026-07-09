import { services } from "@/lib/data";
import { apiSuccess } from "@/lib/api/server";

export async function GET() {
  return apiSuccess(services);
}
