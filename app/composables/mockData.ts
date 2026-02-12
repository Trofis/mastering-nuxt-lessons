import type { Chat } from "~/types";

export const MOCK_CHAT: Chat = {
  id: "1",
  title: "My first chat",
  messages: [
    {
      id: "1",
      role: "user",
      content: "Hello, how are you?",
    },
    {
      id: "2",
      role: "assistant",
      content: "I am fine, thank you!",
    },
  ],
};
