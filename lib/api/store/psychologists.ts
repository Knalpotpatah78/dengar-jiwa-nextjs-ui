import { psychologists as seedData, type Psychologist } from "@/lib/data";

const psychologists = new Map<string, Psychologist>(
  seedData.map((p) => [p.id, { ...p }])
);

export const psychologistsStore = {
  getAll: () => Array.from(psychologists.values()),
  getById: (id: string) => psychologists.get(id),
  getForService: (serviceId: string) =>
    Array.from(psychologists.values()).filter((p) =>
      p.specialties.includes(serviceId)
    ),
  create: (psychologist: Psychologist) => {
    psychologists.set(psychologist.id, psychologist);
    return psychologist;
  },
  update: (id: string, data: Partial<Psychologist>) => {
    const existing = psychologists.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data, id };
    psychologists.set(id, updated);
    return updated;
  },
  delete: (id: string) => psychologists.delete(id),
};
