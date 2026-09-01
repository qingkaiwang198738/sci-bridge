import { AppError } from "@/src/lib/errors";
import { verifySecret } from "@/src/lib/security/secrets";

export async function assertMessageOwner(message: { owner_secret_hash: string }, secret: string) {
  if (!(await verifySecret(secret, message.owner_secret_hash))) {
    throw new AppError("访问凭证无效", 403, "INVALID_CREDENTIAL");
  }
}
