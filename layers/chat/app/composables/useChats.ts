export default function useChats() {
  // const chats = useState<Chat[]>("chats", () => [MOCK_CHAT]);

  /**
   * UseAsyncData only avalaible in top (not used inside functions)
   */
  const {
    data: chats,
    execute,
    status,
  } = useAsyncData(
    "chats",
    async () => {
      console.log("Fetching chats ...");
      return await $fetch<Chat[]>("/api/chats");
    },
    {
      immediate: false,
      default: () => [],
    },
  );

  async function fetchChats() {
    if (status.value !== "idle") return;
    await execute();
  }

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

    if (chat.projectId) {
      await navigateTo(`/projects/${chat.projectId}/chats/${chat.id}`);
    } else {
      await navigateTo(`/chats/${chat.id}`);
    }
  };

  return {
    chats,
    createChat,
    createChatAndNavigate,
    chatsInProject,
    fetchChats,
  };
}
