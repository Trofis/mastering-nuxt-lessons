import { createOpR, generateChatResponse } from "../services/ai.service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { messages } = body;

  const id = messages.length.toString();

  const openaiApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = useRuntimeConfig().openaiModel;

  const model = createOpR(openaiApiKey, openaiModel);

  // Transform messages to AI SDK format (remove id, keep only role and content)
  // const formattedMessages = messages.map(
  //   (msg: { role: string; content: string }) => ({
  //     role: msg.role,
  //     content: msg.content,
  //   }),
  // );

  const response = await generateChatResponse(model, messages);

  return {
    id,
    role: "assistant",
    content: response,
  };
});
