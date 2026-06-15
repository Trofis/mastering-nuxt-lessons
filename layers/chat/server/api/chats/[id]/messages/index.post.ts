import { createMessageForChat } from "~~/layers/chat/server/repository/chatRepository";

export default defineEventHandler(async (_event) => {
  const { id } = getRouterParams(_event);

  const body = await readBody(_event);

  if (!id) {
    return;
  }

  return createMessageForChat({
    content: body.content,
    role: body.role,
    chatId: id,
  });
});
