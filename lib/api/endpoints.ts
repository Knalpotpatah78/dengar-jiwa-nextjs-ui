/**
 * Semua path endpoint API — cukup gunakan konstanta ini,
 * tanpa perlu menulis URL lengkap.
 */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    adminLogin: "/auth/admin/login",
    adminLogout: "/auth/admin/logout",
  },
  services: {
    list: "/services",
    detail: (id: string) => `/services/${id}`,
  },
  psychologists: {
    list: "/psychologists",
    detail: (id: string) => `/psychologists/${id}`,
  },
  bookings: {
    list: "/bookings",
    create: "/bookings",
    detail: (id: string) => `/bookings/${id}`,
  },
  testimonials: {
    list: "/testimonials",
    detail: (id: string) => `/testimonials/${id}`,
  },
  articles: {
    list: "/articles",
    detail: (id: string) => `/articles/${id}`,
  },
} as const;
