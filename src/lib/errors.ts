export class AppError extends Error {
  constructor(message: string, public status = 400, public code = "BAD_REQUEST") {
    super(message);
  }
}

export function errorResponse(error: unknown) {
  if (error instanceof AppError) {
    return Response.json({ error: { code: error.code, message: error.message } }, { status: error.status });
  }
  console.error(error);
  return Response.json({ error: { code: "INTERNAL_ERROR", message: "服务器内部错误" } }, { status: 500 });
}
