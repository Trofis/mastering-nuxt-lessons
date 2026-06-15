// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  runtimeConfig: {
    openaiApiKey: "",
    openaiModel: "gpt-4o-mini",
    public: {
      someValue: "on the frontend!",
    },
  },
});
