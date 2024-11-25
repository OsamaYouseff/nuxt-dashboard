<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{
  pageInfo: {
    page: number;
    limit: number;
    totalPages: number;
  };
}>();

let paginationLimit = 15;

const totalPages = computed(() => props.pageInfo.totalPages);

const startRange = computed(() => {
  const page = props.pageInfo.page;
  return [page, page + 1, page + 2, page + 3, page + 4].filter(
    (p) => p <= totalPages.value
  );
});

const endRange = computed(() => {
  return [
    totalPages.value - 4,
    totalPages.value - 3,
    totalPages.value - 2,
    totalPages.value - 1,
    totalPages.value,
  ].filter((p) => p > 0);
});

const isNumberExist = (num: number) => {
  return startRange.value.includes(num) || endRange.value.includes(num);
};

// Handling change page
const goToNextPage = () => {
  if (props.pageInfo.page < props.pageInfo.totalPages) {
    props.pageInfo.page++;
  }
};

const goToPrevPage = () => {
  if (props.pageInfo.page > 1) {
    props.pageInfo.page--;
  }
};

const goToPage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    props.pageInfo.page = page;
  }
};

// // Watch for changes in pageInfo
watch(
  () => props.pageInfo,
  (newPageInfo) => {
    // console.log("Page info changed:", newPageInfo);
  },
  { deep: true } // Ensure the watcher reacts to nested changes
);
</script>

<template>
  <div v-if="props.pageInfo.totalPages > 1" class="pagination">
    <div style="min-width: 150px">
      <button
        class="btn"
        @click="goToPrevPage"
        :disabled="props.pageInfo.page <= 1"
      >
        <img src="@/assets/icons/left-arrow.svg" alt="left-arrow" />
        Previous
      </button>
    </div>

    <div class="flex-center" style="flex: 1; gap: 10px">
      <!-- if total pages is less than 7 -->
      <div v-if="props.pageInfo.totalPages >= paginationLimit" class="flex">
        <button
          @click="goToPage(i)"
          v-for="i in startRange"
          :key="i"
          class="page-btn"
          :class="{ active: i === props.pageInfo.page }"
        >
          {{ i }}
        </button>
        <span style="margin: 0 5px">...</span>
        <button
          v-if="!isNumberExist(props.pageInfo.page)"
          class="page-btn active"
        >
          {{ props.pageInfo.page }}
        </button>
        <span style="margin: 0 5px">...</span>
        <button
          @click="goToPage(i)"
          v-for="i in endRange"
          :key="i"
          class="page-btn"
          :class="{ active: i === props.pageInfo.page }"
        >
          {{ i }}
        </button>
      </div>

      <button
        v-else
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
        :disabled="props.pageInfo.page >= props.pageInfo.totalPages"
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
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn.active {
  background: #f5f5f5;
  color: #ef3e2c;
}
</style>
