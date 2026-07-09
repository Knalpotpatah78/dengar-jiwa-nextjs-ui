import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, message?: string, status = 200) {
  return NextResponse.json({ data, message }, { status });
}

export function apiError(message: string, status = 400, code?: string) {
  return NextResponse.json({ message, code }, { status });
}
