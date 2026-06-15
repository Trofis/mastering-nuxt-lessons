// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  runtimeConfig: {
    openaiApiKey: "lm-studio",
    openaiModel: "google/gemma-4-e4b",
    openaiURL: "http://localhost:1234/v1",
    public: {
      someValue: "on the frontend!",
    },
  },
});
