import { getServiceById } from "@/lib/data";
import { apiError, apiSuccess } from "@/lib/api/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const service = getServiceById(id);

  if (!service) {
    return apiError("Layanan tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(service);
}
