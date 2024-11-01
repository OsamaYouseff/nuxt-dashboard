<script setup></script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Poppins", sans-serif;
}
body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}
a {
    color: inherit;
    text-decoration: none;
}

:root {
    --primary-color: #ef3e2c;
    --secondary-color: #e71f63;
    --error-color: #ef3e2c;
}

.flex {
    display: flex;
    align-items: center;
}
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.flex-col-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.flex-col-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
