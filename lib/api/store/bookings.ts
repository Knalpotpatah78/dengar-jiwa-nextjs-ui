import type { Booking } from "@/lib/api/modules/bookings";

const bookings = new Map<string, Booking>();

export const bookingsStore = {
  getAll: () => Array.from(bookings.values()),
  getById: (id: string) => bookings.get(id),
  create: (booking: Booking) => {
    bookings.set(booking.id, booking);
    return booking;
  },
  update: (id: string, data: Partial<Booking>) => {
    const existing = bookings.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data };
    bookings.set(id, updated);
    return updated;
  },
  delete: (id: string) => bookings.delete(id),
};
