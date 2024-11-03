<script setup>
const props = defineProps({
    error: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <!-- error message -->
    <p class="flex error-message" style="gap: 3px; margin-top: -15px">
        <img src="@/assets/icons/info.svg" alt="info-icons" />
        <span>
            {{ props.error }}
        </span>
    </p>
</template>

<style scoped>
.error-message {
    color: #b71a2a;
}
</style>
