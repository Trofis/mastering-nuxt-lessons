import type { ChatMessage } from "~/types";
import useChats from "./useChats";

export default function useChat(chatId: string) {
  const { chats } = useChats();
  const chat = computed(() => chats.value.find((c) => c.id === chatId));

  const messages = computed<ChatMessage[]>(() => chat.value?.messages || []);

  const createMessage = (message: string, role: ChatMessage["role"]) => {
    const id = messages.value.length.toString();
    return {
      id,
      role,
      content: message,
    };
  };

  const sendMessage = async (message: string) => {
    messages.value.push(createMessage(message, "user"));

    const data = await $fetch<ChatMessage>("/api/ai", {
      method: "POST",
      body: {
        messages: messages.value,
      },
    });

    messages.value.push(createMessage(data.content, "assistant"));

    // setTimeout(() => {
    //   messages.value.push(createMessage(`You said: ${message}`, "assistant"));
    // }, 1000);
  };

  return {
    chat,
    messages,
    sendMessage,
  };
}
