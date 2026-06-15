import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOpenAI } from "@ai-sdk/openai";
import type { CoreMessage, LanguageModelV1 } from "ai";

export const createOpR = (apiKey: string, model: string) => {
  const openrouter = createOpenRouter({
    apiKey,
  });

  return openrouter(model);
};

export const createOAI = (apiKey: string, model: string, url: string) => {
  const openai = createOpenAI({
    apiKey,
    baseURL: url,
  });

  return openai(model);
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
