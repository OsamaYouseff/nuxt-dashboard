<script setup lang="ts">
const props = defineProps({
    checked: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <label class="checkbox-container">
        <input type="checkbox" :checked="props.checked" />
        <span class="checkmark"></span>
    </label>
</template>

<style scoped>
/* Hide default checkbox */
.checkbox-container input[type="checkbox"] {
    display: none;
}

/* Create custom checkbox */
.checkbox-container .checkmark {
    width: 20px;
    height: 20px;
    left: 0%;
    top: 0%;
    transform: translate(0, 15%);
    background-color: #ddd; /* Default background color */
    border-radius: 4px;
    display: inline-block;
    position: relative;
    cursor: pointer;
}

/* Checked background color */
.checkbox-container input[type="checkbox"]:checked + .checkmark {
    background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
}

/* Optional: checkmark icon */
.checkbox-container input[type="checkbox"]:checked + .checkmark::after {
    content: "";
    position: absolute;
    left: 6px;
    top: 1.5px;
    width: 6px;
    height: 11px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    border-radius: 2px;
}
</style>
