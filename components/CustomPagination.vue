<script setup lang="ts">
const props = defineProps<{
    pageInfo: {
        page: number;
        limit: number;
        totalPages: number;
    };
}>();

const currentPage = props.pageInfo.page;
const totalPages = props.pageInfo.totalPages;

//// handling change page
const goToNextPage = () => {
    if (currentPage < totalPages) {
        props.pageInfo.page++;
    }
};
const goToPrevPage = () => {
    if (props.pageInfo.totalPages > 1) {
        props.pageInfo.page--;
    }
};
const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
        props.pageInfo.page = page;
    }
};
</script>

<template>
    <div class="pagination">
        <div style="min-width: 150px">
            <button
                class="btn"
                @click="goToPrevPage"
                :disabled="props.pageInfo.page === 1"
            >
                <img src="@/assets/icons/left-arrow.svg" alt="left-arrow" />
                Previous
            </button>
        </div>

        <div class="flex-center" style="flex: 1; gap: 10px">
            <button
                @click="goToPage(i)"
                v-for="i in totalPages"
                :key="i"
                class="page-btn"
                :class="{ active: i === props.pageInfo.page }"
            >
                {{ i }}
            </button>
        </div>
        <div class="flex" style="min-width: 150px; justify-content: flex-end">
            <button
                @click="goToNextPage"
                :disabled="props.pageInfo.page === totalPages"
                class="btn"
            >
                Next
                <img src="@/assets/icons/right-arrow.svg" alt="right-arrow" />
            </button>
        </div>
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
