<script setup lang="ts">
const props = defineProps({
    error: {
        myMessage: String,
        apiMessage: String,
    },
});

const reload = () => {
    window.location.reload();
};
</script>

<template>
    <div class="flex-col-center" style="text-align: center; height: 80vh; gap: 30px">
        <h1 style="color: var(--secondary-color)">
            {{ props.error.myMessage }} 😢😢
        </h1>
        <h2 style="color: var(--secondary-color)">
            Error: {{ error.apiMessage }}
        </h2>

        <button @click="reload()" class="flex-center try">
            <span>Retry</span>
        </button>
    </div>
</template>

<style scoped>
.try {
    background: var(--primary-color);
    width: 200px;
    height: 50px;
    text-align: center;
    color: white;
    margin: 0px auto;
    font-size: 20px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 10px 16px;
    gap: 8px;
    border-radius: 8px;
}

h1 {
    color: var(--secondary-color);
    font-size: 30px;
}

h2 {
    color: var(--primary-color);
    font-size: 20px;
}
</style>
