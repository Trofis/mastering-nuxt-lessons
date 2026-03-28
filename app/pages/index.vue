<script setup lang="ts">
import useChats from "~/composables/useChats";

const { createChatAndNavigate } = useChats();
const appConfig = useAppConfig();

const handleCreateChat = async () => {
  await createChatAndNavigate();
};
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center h-screen">
    <span class="text-4xl font-bold">{{ appConfig.title }}</span>
    <UButton class="mt-4" @click="handleCreateChat"> Start Chatting </UButton>
  </UContainer>
</template>
