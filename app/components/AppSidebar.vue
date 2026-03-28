<script setup lang="ts">
import useChats from "~/composables/useChats";
import type { Chat } from "~/types";
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  isOpen: boolean;
}>();

defineEmits(["toggle-sidebar"]);

const { chats, createChatAndNavigate } = useChats();

const route = useRoute();

const formatChatItem = (chat: Chat): NavigationMenuItem => {
  return {
    label: chat.title || "New Chat",
    to: `/chats/${chat.id}`,
    active: route.params.id === chat.id,
    defaultOpen: true,
  };
};

const formattedChats = computed(() => chats.value.map(formatChatItem));

const handleNewChat = async () => {
  await createChatAndNavigate();
};
</script>

<template>
  <!-- <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="close"
    />
  </Teleport> -->

  <aside
    class="fixed left-0 top-16 bottom-0 z-50 w-72 border-r border-[var(--ui-border)] bg-[var(--ui-bg-elevated)] transition-transform duration-200 ease-in-out"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex h-full flex-col">
      <div
        class="flex items-center justify-between border-b border-[var(--ui-border)] p-4"
      >
        <h2 class="text-lg font-semibold text-[var(--ui-text)]">Chats</h2>
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="soft"
          class="lg:hidden"
          @click="$emit('toggle-sidebar')"
        />
      </div>
      <UNavigationMenu
        class="w-full mb-4 px-1.5"
        orientation="vertical"
        :items="formattedChats"
        default-open
      />
      <!-- <div class="flex-1 overflow-y-auto p-2">
        <NuxtLink
          v-for="chat in chats"
          :key="chat.id"
          :to="`/chats/${chat.id}`"
          class="mb-1 block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--ui-bg-muted)] cursor-pointer"
          :class="[
            route.params.id === chat.id
              ? 'bg-[var(--ui-bg-muted)] text-[var(--ui-text)] font-medium'
              : 'text-[var(--ui-text-muted)]',
          ]"
        >
          {{ chat.title || "New Chat" }}
        </NuxtLink>
      </div> -->

      <div class="border-t border-[var(--ui-border)] p-4">
        <UButton
          icon="i-lucide-plus"
          color="primary"
          variant="soft"
          block
          @click="handleNewChat"
        >
          New Chat
        </UButton>
      </div>
    </div>
  </aside>
</template>
