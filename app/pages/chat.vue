<script setup lang="ts">
import useChat from "~/composables/useChat";

const { chat, messages, sendMessage } = useChat();

// Change settings of the page
useHeadSafe({
  title: chat.value?.title,
  htmlAttrs: {
    lang: "en",
    class: "my-reality-is-cool",
  },
  // Safe prevents injecting script
  // script: [
  //   {
  //     innerHTML: "window.analytics.track('page_view', { page: 'chat' })",
  //   },
  // ],
});
</script>

<template>
  <ChatWindow :messages="messages" :chat @send-message="sendMessage" />
</template>
