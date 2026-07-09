import { apiError, apiSuccess } from "@/lib/api/server";
import { testimonialsStore } from "@/lib/api/store/testimonials";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const testimonial = testimonialsStore.getById(id);

  if (!testimonial) {
    return apiError("Testimoni tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(testimonial);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const updated = testimonialsStore.update(id, body);

  if (!updated) {
    return apiError("Testimoni tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(updated, "Testimoni berhasil diperbarui");
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const deleted = testimonialsStore.delete(id);

  if (!deleted) {
    return apiError("Testimoni tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(null, "Testimoni berhasil dihapus");
}
