import { apiError, apiSuccess } from "@/lib/api/server";
import { bookingsStore } from "@/lib/api/store/bookings";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const booking = bookingsStore.getById(id);

  if (!booking) {
    return apiError("Booking tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(booking);
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json();
  const { status } = body;

  if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
    return apiError("Status tidak valid", 422, "VALIDATION_ERROR");
  }

  const updated = bookingsStore.update(id, { status });

  if (!updated) {
    return apiError("Booking tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(updated, "Status booking berhasil diperbarui");
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const deleted = bookingsStore.delete(id);

  if (!deleted) {
    return apiError("Booking tidak ditemukan", 404, "NOT_FOUND");
  }

  return apiSuccess(null, "Booking berhasil dihapus");
}
