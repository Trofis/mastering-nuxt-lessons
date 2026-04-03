<script setup lang="ts">
import useChats from "~/composables/useChats";
import useProjects from "~/composables/useProjects";
import type { Chat, Project } from "~/types";
import type { NavigationMenuItem } from "@nuxt/ui";
import { filterChatsByDateRange } from "~/utils/dateUtils";

defineProps<{
  isOpen: boolean;
}>();

defineEmits(["toggle-sidebar"]);

const { chats, createChatAndNavigate } = useChats();
const { projects, createProjectAndNavigate } = useProjects();
const route = useRoute();

const routeId = computed(() => route.params.id);

// const isCurrentProject = (projectId: string): boolean => {
//   return routeId.value === projectId;
// };

// const chatsInCurrentProject = computed(() => {
//   return chats.value.filter((c) => c.projectId === routeId.value);
// });

const projectsMenu = computed(() => {
  return projects.value.map((p) =>
    formatProjectItem(
      p,
      chats.value.filter((c) => c.projectId === p.id),
    ),
  );
});

const formatProjectItem = (
  project: Project,
  chats: Chat[],
): NavigationMenuItem => {
  return {
    label: project.name || "New Project",
    to: `/projects/${project.id}`,
    active: routeId.value === project.id,
    defaultOpen: true,
    children: chats.map(formatChatItem),
  };
};

const formatChatItem = (chat: Chat): NavigationMenuItem => {
  return {
    label: chat.title || "New Chat",
    to: `/chats/${chat.id}`,
    active: routeId.value === chat.id,
    defaultOpen: true,
  };
};

const chatsWithoutProject = computed(() =>
  chats.value.filter((c) => c.projectId === undefined),
);

const filterChats = (startDays: number, endDays?: number) => {
  return computed(() => {
    return filterChatsByDateRange(
      chatsWithoutProject.value,
      startDays,
      endDays,
    ).map(formatChatItem);
  });
};

const todayChats = filterChats(-1, 1);
const lastWeekChats = filterChats(1, 7);
const lastMonthChats = filterChats(7, 30);
const olderChats = filterChats(30);

const handleNewChat = async () => {
  await createChatAndNavigate();
};

const handleNewProject = async () => {
  await createProjectAndNavigate();
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
    <div class="flex h-full justify-between flex-col">
      <div
        v-if="
          todayChats.length > 0 ||
          lastWeekChats.length > 0 ||
          lastMonthChats.length > 0 ||
          olderChats.length > 0 ||
          projectsMenu.length > 0
        "
        class="flex flex-col items-start border-b border-[var(--ui-border)] p-4"
      >
        <div v-if="todayChats.length > 0">
          <h2 class="text-lg font-semibold text-[var(--ui-text)]">Today</h2>
          <!-- <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="soft"
          class="lg:hidden"
          @click="$emit('toggle-sidebar')"
        /> -->
          <UNavigationMenu
            class="w-full mb-4 px-1.5"
            orientation="vertical"
            :items="todayChats"
            default-open
          />
        </div>

        <div
          v-if="lastWeekChats.length > 0"
          class="flex items-center justify-between border-b border-[var(--ui-border)] p-4"
        >
          <h2 class="text-lg font-semibold text-[var(--ui-text)]">Last Week</h2>
          <UNavigationMenu
            class="w-full mb-4 px-1.5"
            orientation="vertical"
            :items="lastWeekChats"
            default-open
          />
        </div>

        <div
          v-if="lastMonthChats.length > 0"
          class="flex items-center justify-between border-b border-[var(--ui-border)] p-4"
        >
          <h2 class="text-lg font-semibold text-[var(--ui-text)]">
            Last Month
          </h2>
          <UNavigationMenu
            class="w-full mb-4 px-1.5"
            orientation="vertical"
            :items="lastMonthChats"
            default-open
          />
        </div>

        <div
          v-if="olderChats.length > 0"
          class="flex items-center justify-between border-b border-[var(--ui-border)] p-4"
        >
          <h2 class="text-lg font-semibold text-[var(--ui-text)]">Older</h2>
          <UNavigationMenu
            class="w-full mb-4 px-1.5"
            orientation="vertical"
            :items="olderChats"
            default-open
          />
        </div>

        <div v-if="projectsMenu.length > 0">
          <h2 class="text-lg font-semibold text-[var(--ui-text)]">Projects</h2>
          <UNavigationMenu
            class="w-full mb-4 px-1.5"
            orientation="vertical"
            :items="projectsMenu"
            default-open
          />
        </div>
      </div>

      <div v-else class="overflow-y-auto p-4">
        <UAlert
          title="No chats"
          description="Start by creating a new chat"
          color="neutral"
          variant="soft"
          class="mt-2"
        />
      </div>

      <div class="border-t border-[var(--ui-border)] p-4 flex flex-col gap-2">
        <UButton
          class="cursor-pointer"
          icon="i-lucide-plus"
          color="primary"
          variant="soft"
          block
          @click="handleNewChat"
        >
          New Chat
        </UButton>
        <UButton
          class="cursor-pointer"
          icon="i-lucide-plus"
          color="primary"
          variant="outline"
          block
          @click="handleNewProject"
        >
          New Project
        </UButton>
      </div>
    </div>
  </aside>
</template>
