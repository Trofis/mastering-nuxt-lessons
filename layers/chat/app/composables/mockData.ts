import type { Chat, ChatMessage, Project } from "~/types";

const MOCK_MESSAGES: ChatMessage[] = [
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
];

const MOCK_CHAT: Chat = {
  id: "1",
  title: "My first chat",
  messages: [...MOCK_MESSAGES],
  projectId: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const MOCK_PROJECT: Project = {
  id: "1",
  name: "My first project",
};

export { MOCK_CHAT, MOCK_MESSAGES, MOCK_PROJECT };
