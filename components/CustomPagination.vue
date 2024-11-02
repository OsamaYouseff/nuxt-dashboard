<script setup lang="ts">
const currentPage = ref<number>(1);
const totalPages = ref<number>(7);
</script>

<template>
    <div class="pagination">
        <button
            class="btn"
            @click="currentPage--"
            :disabled="currentPage === 1"
        >
            <img src="@/assets/icons/left-arrow.svg" alt="left-arrow" />
            Previous
        </button>

        <div class="flex-center" style="flex: 1; gap: 10px">
            <button
                @click="currentPage = i"
                v-for="i in totalPages"
                :key="i"
                class="page-btn"
                :class="{ active: i === currentPage }"
            >
                {{ i }}
            </button>
        </div>
        <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="btn"
        >
            Next
            <img src="@/assets/icons/right-arrow.svg" alt="right-arrow" />
        </button>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 10px 16px;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    color: #344054;
}

.page-btn {
    width: 40px;
    height: 40px;
    border-color: transparent;
    text-align: center;

    border-radius: 8px;
}

.page-btn.active {
    background: #f5f5f5;
    color: #ef3e2c;
}
</style>
