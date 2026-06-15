import { updateChat } from "../../../repository/chatRepository";
import { createOAI, generateChatTitle } from "../../../services/ai.service";

export default defineEventHandler(async (_event) => {
  const { id } = getRouterParams(_event);
  const body = await readBody(_event);

  const openaiApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = useRuntimeConfig().openaiModel;
  const openaiURL = useRuntimeConfig().openaiURL;

  const model = createOAI(openaiApiKey, openaiModel, openaiURL);

  const title = await generateChatTitle(model, body.content);

  return updateChat(id, {
    title,
  });
});
