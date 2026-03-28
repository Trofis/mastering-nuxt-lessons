import type { Chat } from "~/types";
import { MOCK_CHAT } from "./mockData";

export default function useChats() {
  const chats = useState<Chat[]>("chats", () => [MOCK_CHAT]);

  const createChat = (options: { projectId?: string } = {}) => {
    const id = (chats.value.length + 1).toString();
    const chat = {
      id,
      title: "New Chat",
      messages: [],
      projectId: options.projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    chats.value.push(chat);

    return chat;
  };

  const chatsInProject = (projectId: string) => {
    return chats.value.filter((chat) => chat.projectId === projectId);
  };

  const createChatAndNavigate = async (
    options: { projectId?: string } = {},
  ) => {
    const chat = createChat(options);
    await navigateTo(`/chats/${chat.id}`);
  };

  return {
    chats,
    createChat,
    createChatAndNavigate,
    chatsInProject,
  };
}
