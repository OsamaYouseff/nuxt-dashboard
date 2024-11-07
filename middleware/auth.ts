export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const token = window.localStorage.getItem("accessToken");

        if (!token && to.path !== "/login") {
            return navigateTo("/login");
        }
    }
});
