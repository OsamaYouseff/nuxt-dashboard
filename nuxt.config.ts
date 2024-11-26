// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxtjs/i18n", "@element-plus/nuxt"],
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        iso: "en-US",
        file: "en.json",
        direction: "ltr",
      },
      {
        code: "ar",
        name: "Arabic",
        iso: "ar-AR",
        file: "ar.json",
        direction: "rtl",
      },
    ],
    langDir: "locales/",
    defaultLocale: "en",
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://api.escuelajs.co/graphql",
        httpLinkOptions: {
          headers: {
            Authorization: process.client
              ? `Bearer ${localStorage.getItem("accessToken")}`
              : "",
          },
        },
      },
    },
  },
});
