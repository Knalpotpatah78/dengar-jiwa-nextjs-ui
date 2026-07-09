import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token?: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    api.post<AuthResponse>(ENDPOINTS.auth.login, payload),

  register: (payload: RegisterPayload) =>
    api.post<AuthResponse>(ENDPOINTS.auth.register, payload),

  logout: () => api.post<void>(ENDPOINTS.auth.logout),
};
