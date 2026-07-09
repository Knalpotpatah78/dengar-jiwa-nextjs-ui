import type { Testimonial } from "@/lib/api/modules/testimonials";

const seedTestimonials: Testimonial[] = [
  {
    id: "1",
    text: "Dengar Jiwa benar-benar mengubah hidup saya. Psikolog yang saya temui sangat profesional dan penuh empati. Saya merasa didengar dan dipahami setiap sesinya.",
    name: "Rina Putri",
    service: "Konsultasi Individu",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    published: true,
    order: 1,
  },
  {
    id: "2",
    text: "Proses booking sangat mudah dan sesi online-nya nyaman banget. Setelah beberapa bulan konsultasi, saya merasa jauh lebih tenang dan punya cara mengelola stres yang lebih baik.",
    name: "Andi Pratama",
    service: "Terapi Online",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    published: true,
    order: 2,
  },
  {
    id: "3",
    text: "Saya dan pasangan kami sangat terbantu setelah mengikuti sesi konseling di Dengar Jiwa. Komunikasi kami jadi lebih baik dan hubungan kami semakin kuat.",
    name: "Dewi & Raka",
    service: "Terapi Pasangan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    published: true,
    order: 3,
  },
];

const testimonials = new Map<string, Testimonial>(
  seedTestimonials.map((t) => [t.id, { ...t }])
);

export const testimonialsStore = {
  getAll: () =>
    Array.from(testimonials.values()).sort((a, b) => a.order - b.order),
  getPublished: () =>
    Array.from(testimonials.values())
      .filter((t) => t.published)
      .sort((a, b) => a.order - b.order),
  getById: (id: string) => testimonials.get(id),
  create: (testimonial: Testimonial) => {
    testimonials.set(testimonial.id, testimonial);
    return testimonial;
  },
  update: (id: string, data: Partial<Testimonial>) => {
    const existing = testimonials.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data, id };
    testimonials.set(id, updated);
    return updated;
  },
  delete: (id: string) => testimonials.delete(id),
};
