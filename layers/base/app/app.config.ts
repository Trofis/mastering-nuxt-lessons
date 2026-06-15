export default defineAppConfig({
  title: "Nuxt chat",
  ui: {
    colors: {
      primary: "blue",
    },
    button: {
      slots: {
        base: "font-bold cursor-pointer",
        leadingIcon: "opacity-80",
      },
    },
  },
});
