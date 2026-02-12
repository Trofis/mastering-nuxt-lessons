// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxtjs/mdc"],

  ui: {
    fonts: true,
    colorMode: true,
  },

  vite: {
    optimizeDeps: {
      include: ["debug"],
    },
  },
  debug: false,

  mdc: {
    highlight: {
      theme: "tokyo-night",
      langs: ["html", "markdown", "vue", "javascript", "typescript"],
    },
  },

  runtimeConfig: {
    openaiApiKey: "",
    openaiModel: "gpt-4o-mini",
    public: {
      someValue: "on the frontend!",
    },
  },
});
