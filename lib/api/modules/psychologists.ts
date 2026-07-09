import type { Psychologist } from "@/lib/data";
import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export type CreatePsychologistPayload = Omit<Psychologist, "id"> & { id?: string };
export type UpdatePsychologistPayload = Partial<CreatePsychologistPayload>;

export const psychologistsApi = {
  getAll: (serviceId?: string) =>
    api.get<Psychologist[]>(ENDPOINTS.psychologists.list, {
      params: serviceId ? { service: serviceId } : undefined,
    }),

  getById: (id: string) =>
    api.get<Psychologist>(ENDPOINTS.psychologists.detail(id)),

  create: (payload: CreatePsychologistPayload) =>
    api.post<Psychologist>(ENDPOINTS.psychologists.list, payload),

  update: (id: string, payload: UpdatePsychologistPayload) =>
    api.put<Psychologist>(ENDPOINTS.psychologists.detail(id), payload),

  delete: (id: string) =>
    api.delete<void>(ENDPOINTS.psychologists.detail(id)),
};
