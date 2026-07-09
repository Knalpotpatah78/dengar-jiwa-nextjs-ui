import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export interface CreateBookingPayload {
  serviceId: string;
  psychologistId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  paymentMethod: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  psychologistId: string;
  service: string;
  psychologist: string;
  date: string;
  time: string;
  price: number;
  paymentMethod: string;
  clientName: string;
  status: "pending" | "confirmed" | "cancelled";
}

export const bookingsApi = {
  getAll: () => api.get<Booking[]>(ENDPOINTS.bookings.list),

  getById: (id: string) => api.get<Booking>(ENDPOINTS.bookings.detail(id)),

  create: (payload: CreateBookingPayload) =>
    api.post<Booking>(ENDPOINTS.bookings.create, payload),

  updateStatus: (id: string, status: Booking["status"]) =>
    api.patch<Booking>(ENDPOINTS.bookings.detail(id), { status }),
};
