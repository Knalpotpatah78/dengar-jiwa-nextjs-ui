import type { Service } from "@/lib/data";
import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export const servicesApi = {
  getAll: () => api.get<Service[]>(ENDPOINTS.services.list),

  getById: (id: string) => api.get<Service>(ENDPOINTS.services.detail(id)),
};
