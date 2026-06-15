import {
  createMessageForChat,
  getMessagesByChatId,
} from "~~/layers/chat/server/repository/chatRepository";
import {
  createOAI,
  createOpR,
  generateChatResponse,
} from "~~/layers/chat/server/services/ai.service";

export default defineEventHandler(async (_event) => {
  const { id } = getRouterParams(_event);

  if (!id) {
    return;
  }

  const history = getMessagesByChatId(id);

  const openaiApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = useRuntimeConfig().openaiModel;
  const openaiURL = useRuntimeConfig().openaiURL;

  const model = createOAI(openaiApiKey, openaiModel, openaiURL);

  const reply = await generateChatResponse(model, history);

  return createMessageForChat({
    content: reply,
    role: "assistant",
    chatId: id,
  });
});
