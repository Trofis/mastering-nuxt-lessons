import type { Chat, ChatMessage, Project } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: uuidv4(),
    role: "user",
    content: "Hello, how are you?",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    role: "assistant",
    content: "I am fine, thank you!",
    createdAt: new Date(),
    updatedAt: new Date(),
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
