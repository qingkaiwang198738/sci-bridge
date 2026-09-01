import { errorResponse, AppError } from "@/src/lib/errors";
import { getChatSession } from "@/src/lib/security/session";
import { findResponseById } from "@/src/server/repositories/response.repository";
import { findMessageById } from "@/src/server/repositories/message.repository";
import { insertChat, listChats } from "@/src/server/repositories/chat.repository";

async function authorize(responseId: string) {
  const session = await getChatSession(responseId);

  if (!session || session.responseId !== responseId) {
    throw new AppError(
      "请先进入会话",
      401,
      "UNAUTHENTICATED"
    );
  }

  const response = await findResponseById(responseId);

  if (!response) {
    throw new AppError(
      "响应不存在",
      404,
      "RESPONSE_NOT_FOUND"
    );
  }

  const message = await findMessageById(response.message_id);

  if (!message) {
    throw new AppError(
      "需求不存在",
      404,
      "MESSAGE_NOT_FOUND"
    );
  }

  if (new Date(message.expires_at) <= new Date()) {
    throw new AppError(
      "该会话已过期",
      410,
      "EXPIRED"
    );
  }

  return {
    session,
    message
  };
}

export async function GET(
  _: Request,
  context: { params: Promise<{ responseId: string }> }
) {
  try {
    const { responseId } = await context.params;

    await authorize(responseId);

    return Response.json({
      data: await listChats(responseId)
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ responseId: string }> }
) {
  try {
    const { responseId } = await context.params;

    const { session, message } = await authorize(responseId);

    const body = await request.json();
    const content = String(body.content ?? "").trim();

    if (!content || content.length > 5000) {
      return Response.json(
        {
          error: {
            code: "INVALID_CONTENT",
            message: "消息长度无效"
          }
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        data: await insertChat({
          response_id: responseId,
          sender: session.role,
          content,
          expires_at: message.expires_at
        })
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}