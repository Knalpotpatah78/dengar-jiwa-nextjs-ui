export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "/api";

export const API_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000;
