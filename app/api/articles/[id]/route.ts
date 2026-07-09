import { apiError, apiSuccess } from "@/lib/api/server";
import { articlesStore } from "@/lib/api/store/articles";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const article = articlesStore.getById(id);

  if (!article) {
    return apiError("Artikel tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(article);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const updated = articlesStore.update(id, body);

  if (!updated) {
    return apiError("Artikel tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(updated, "Artikel berhasil diperbarui");
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const deleted = articlesStore.delete(id);

  if (!deleted) {
    return apiError("Artikel tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(null, "Artikel berhasil dihapus");
}
