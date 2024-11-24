// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // devtools: { enabled: true },
    modules: ["@nuxtjs/apollo", "@nuxtjs/i18n"],
    i18n: {
        locales: [
          { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' , direction: 'ltr'},
          { code: 'ar', name: 'Arabic', iso: 'ar-AR', file: 'ar.json' , direction: 'rtl'},  
        ],
        // lazy: true,
        langDir: 'locales/',
        defaultLocale: 'en',
      },
    apollo: {
        clients: {
            default: {
                httpEndpoint: "https://api.escuelajs.co/graphql",
            },
        },
    },
});
