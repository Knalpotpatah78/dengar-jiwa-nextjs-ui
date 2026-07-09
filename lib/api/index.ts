export { api } from "./client";
export { API_BASE_URL } from "./config";
export { ENDPOINTS } from "./endpoints";
export { ApiError } from "./types";
export type { ApiResponse, RequestOptions } from "./types";

export { authApi } from "./modules/auth";
export { adminAuthApi } from "./modules/admin-auth";
export type {
  AdminLoginPayload,
  AdminUser,
  AdminAuthResponse,
} from "./modules/admin-auth";
export type {
  AuthResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "./modules/auth";

export { servicesApi } from "./modules/services";
export { psychologistsApi } from "./modules/psychologists";
export { bookingsApi } from "./modules/bookings";
export type { Booking, CreateBookingPayload } from "./modules/bookings";

export { testimonialsApi } from "./modules/testimonials";
export type {
  Testimonial,
  CreateTestimonialPayload,
  UpdateTestimonialPayload,
} from "./modules/testimonials";

export { articlesApi } from "./modules/articles";
export type {
  Article,
  CreateArticlePayload,
  UpdateArticlePayload,
} from "./modules/articles";
