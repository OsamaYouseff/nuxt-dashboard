<script setup>

useHead({ title: "Dashboard | Home" });
definePageMeta({ layout: "dashboard", middleware: "auth" });
</script>


<template>
    <div class="container">
        <h1>Home</h1>
    </div>
</template>


<style scoped>
.container {
    width: 100%;
    height: 100vh;
    padding: 20px 30px;
    display: grid;
    place-items: center;
}
</style>