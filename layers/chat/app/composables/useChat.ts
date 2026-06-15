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
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  const sendMessage = async (message: string) => {
    if (!chat.value) return;
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
