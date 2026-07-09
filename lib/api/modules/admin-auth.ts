import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

export interface AdminAuthResponse {
  user: AdminUser;
}

export const adminAuthApi = {
  login: (payload: AdminLoginPayload) =>
    api.post<AdminAuthResponse>(ENDPOINTS.auth.adminLogin, payload),

  logout: () => api.post<void>(ENDPOINTS.auth.adminLogout),
};
