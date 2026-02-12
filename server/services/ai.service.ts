import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { CoreMessage, LanguageModelV1 } from "ai";

export const createOpR = (apiKey: string, model: string) => {
  const openrouter = createOpenRouter({
    apiKey,
  });

  return openrouter(model);
};

export const generateChatResponse = async (
  model: LanguageModelV1,
  messages: CoreMessage[],
) => {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Invalid messages format");
  }
  console.log(messages);

  const response = await generateText({
    model,
    messages,
  });

  return response.text.trim();
};
