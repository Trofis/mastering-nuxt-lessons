<script setup lang="ts">
import useSidebar from "~/composables/useSidebar";

const { isOpen, toggle } = useSidebar();
</script>

<template>
  <div class="layout-container">
    <AppHeader @toggle-sidebar="toggle" />
    <AppSidebar :is-open="isOpen" @toggle-sidebar="toggle" />
    <main
      class="main-content transition-all duration-200 ease-in-out"
      :class="{ 'ml-64': isOpen }"
    >
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  height: calc(100vh - 4rem);
  background-color: var(--ui-background);
}

.main-content {
  height: 100%;
  margin-top: 4rem;
}
</style>
