import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export interface Testimonial {
  id: string;
  text: string;
  name: string;
  service: string;
  avatar: string;
  published: boolean;
  order: number;
}

export type CreateTestimonialPayload = Omit<Testimonial, "id">;
export type UpdateTestimonialPayload = Partial<CreateTestimonialPayload>;

export const testimonialsApi = {
  getAll: (all = false) =>
    api.get<Testimonial[]>(ENDPOINTS.testimonials.list, {
      params: all ? { all: "true" } : undefined,
    }),

  getById: (id: string) =>
    api.get<Testimonial>(ENDPOINTS.testimonials.detail(id)),

  create: (payload: CreateTestimonialPayload) =>
    api.post<Testimonial>(ENDPOINTS.testimonials.list, payload),

  update: (id: string, payload: UpdateTestimonialPayload) =>
    api.put<Testimonial>(ENDPOINTS.testimonials.detail(id), payload),

  delete: (id: string) =>
    api.delete<void>(ENDPOINTS.testimonials.detail(id)),
};
