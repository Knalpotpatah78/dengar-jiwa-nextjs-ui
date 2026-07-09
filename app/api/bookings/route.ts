import {
  generateBookingId,
  getServiceById,
  paymentMethods,
} from "@/lib/data";
import { apiError, apiSuccess } from "@/lib/api/server";
import { bookingsStore } from "@/lib/api/store/bookings";
import { psychologistsStore } from "@/lib/api/store/psychologists";

export async function GET() {
  return apiSuccess(bookingsStore.getAll());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { serviceId, psychologistId, date, time, name, paymentMethod } = body;

  if (
    !serviceId ||
    !psychologistId ||
    !date ||
    !time ||
    !name ||
    !paymentMethod
  ) {
    return apiError("Data booking tidak lengkap", 422, "VALIDATION_ERROR");
  }

  const service = getServiceById(serviceId);
  const psychologist = psychologistsStore.getById(psychologistId);

  if (!service || !psychologist) {
    return apiError("Layanan atau psikolog tidak valid", 400, "INVALID_DATA");
  }

  const booking = bookingsStore.create({
    id: generateBookingId(),
    serviceId,
    psychologistId,
    service: service.name,
    psychologist: psychologist.name,
    date,
    time,
    price: service.price,
    paymentMethod:
      paymentMethods.find((p) => p.id === paymentMethod)?.name || paymentMethod,
    clientName: name,
    status: "confirmed",
  });

  return apiSuccess(booking, "Booking berhasil dibuat", 201);
}
