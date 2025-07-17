<script setup lang="ts">
useHead({ title: "Nuxt Dashboard | Home ", });
definePageMeta({ middleware: "un-auth" });

</script>

<template>
    <div class="container flex-col-center">
        <h1>Welcome to Nuxt Dashboard</h1>
        <div class="flex-center" style="gap: 30px">
            <NuxtLink to="/user/login">Sign IN</NuxtLink>
            <NuxtLink to="/user/register">Sign Up</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    padding: 20px 30px;
    text-align: center;
    background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
}

h1 {
    font-size: 40px;
    margin-bottom: 100px;
}

a {
    font-size: 20px;
    text-decoration: none;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px 20px;
    transition: all 0.3s ease;
    color: white;
}
</style>
