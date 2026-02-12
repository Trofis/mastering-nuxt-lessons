<script setup lang="ts">
import useChat from "~/composables/useChat";

const { chat, messages, sendMessage } = useChat();

const typing = ref(false);

const handleSendMessage = async (message: string) => {
  typing.value = true;
  await sendMessage(message);
  typing.value = false;
};

const appConfig = useAppConfig();

const title = computed(() =>
  chat.value?.title
    ? `${chat.value.title} - ${appConfig.title}`
    : appConfig.title,
);
console.log(title.value);
// Change settings of the page
useHead({
  title: title.value as string,
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
  <ChatWindow
    :typing
    :messages="messages"
    :chat
    @send-message="handleSendMessage"
  />
</template>
