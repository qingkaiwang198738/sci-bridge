import { hashReporter } from "@/src/lib/security/secrets";
import { reportSchema } from "@/src/lib/validation/schemas";
import { AppError } from "@/src/lib/errors";
import { findMessageById } from "@/src/server/repositories/message.repository";
import { reportExists, insertReport } from "@/src/server/repositories/report.repository";
import { scoreContent } from "@/src/server/services/risk.service";

export async function createReport(raw: unknown) {
  const input = reportSchema.parse(raw);
  const message=await findMessageById(input.messageId);
  if (!message) throw new AppError("内容不存在", 404, "MESSAGE_NOT_FOUND");
  const reporterHash = hashReporter(input.fingerprint);
  if (await reportExists(input.messageId, reporterHash)) return { duplicate: true };
  await insertReport({
    message_id: input.messageId,
    reason: input.reason,
    reporter_hash: reporterHash,
    status: "pending",
    risk_score: Math.min(100, Number(message.risk_score ?? 0) + scoreContent(message.item_name,message.content) / 2)
  });
  return { duplicate: false };
}
