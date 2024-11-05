// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // devtools: { enabled: true },
    modules: ["@nuxtjs/apollo"],
    apollo: {
        clients: {
            default: {
                httpEndpoint: "https://api.escuelajs.co/graphql",
            },
        },
    },
});
