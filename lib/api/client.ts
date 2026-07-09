import { API_BASE_URL, API_TIMEOUT_MS } from "./config";
import { ApiError, type ApiResponse, type RequestOptions } from "./types";

function buildUrl(endpoint: string, params?: RequestOptions["params"]): string {
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const base = API_BASE_URL.startsWith("http")
    ? API_BASE_URL
    : API_BASE_URL || "";

  const url = base ? `${base}${normalizedEndpoint}` : normalizedEndpoint;

  if (!params) return url;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.toString();
  return query ? `${url}?${query}` : url;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const body =
      typeof payload === "object" && payload !== null && "message" in payload
        ? (payload as { message: string; code?: string; errors?: Record<string, string[]> })
        : { message: response.statusText || "Terjadi kesalahan pada server" };

    throw new ApiError(response.status, body);
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiResponse<T>).data;
  }

  return payload as T;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, body, timeout = API_TIMEOUT_MS, headers, ...init } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(buildUrl(endpoint, params), {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    return parseResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(408, { message: "Permintaan melebihi batas waktu" });
    }

    throw new ApiError(0, {
      message: error instanceof Error ? error.message : "Gagal terhubung ke server",
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export const api = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, "body" | "method">) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "body" | "method">) =>
    request<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "body" | "method">) =>
    request<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T>(endpoint: string, body?: unknown, options?: Omit<RequestOptions, "body" | "method">) =>
    request<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T>(endpoint: string, options?: Omit<RequestOptions, "body" | "method">) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
