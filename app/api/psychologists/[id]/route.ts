import { psychologistsStore } from "@/lib/api/store/psychologists";
import { apiError, apiSuccess } from "@/lib/api/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const psychologist = psychologistsStore.getById(id);

  if (!psychologist) {
    return apiError("Psikolog tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(psychologist);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const updated = psychologistsStore.update(id, body);

  if (!updated) {
    return apiError("Psikolog tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(updated, "Psikolog berhasil diperbarui");
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const deleted = psychologistsStore.delete(id);

  if (!deleted) {
    return apiError("Psikolog tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(null, "Psikolog berhasil dihapus");
}
