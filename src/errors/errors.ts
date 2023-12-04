import { ErrorResponse } from "@/protocols/protocols";

export function conflictError(message: string | string[]): ErrorResponse {
  return { type: "CONFLICT", message };
}

export function notFound(message: string | string[]): ErrorResponse {
  return { type: "NOT_FOUND", message };
}

export function unprocessableEntity(message: string | string[]): ErrorResponse {
  return { type: "UNPROCESSABLE_ENTITY", message};
}

export function unauthorized(message: string | string[]): ErrorResponse {
  return { type: "UNAUTHORIZED", message};
}