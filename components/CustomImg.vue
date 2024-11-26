<script setup lang="ts">
const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="image-container flex-center">
    <span>{{ props.username.slice(0, 2).toUpperCase() }}</span>
  </div>
</template>

<style scoped>
.image-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0;
  margin-right: 5px;
  background: #f4f1f7;
}

span {
  color: #7f56d9;
  font-weight: bolder;
  letter-spacing: 1px;
}
</style>
