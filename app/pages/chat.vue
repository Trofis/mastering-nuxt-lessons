<script setup lang="ts">
import useChat from "~/composables/useChat";

const { chat, messages, sendMessage } = useChat();
</script>

<template>
  <ChatWindow :messages="messages" :chat @send-message="sendMessage" />
</template>
