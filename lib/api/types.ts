export interface ApiErrorBody {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly errors?: Record<string, string[]>;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message);
    this.name = "ApiError";
    this.status = status;
    this.code = body.code;
    this.errors = body.errors;
  }
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  timeout?: number;
}
