<script setup lang="ts">
import defaultImg from "@/assets/images/user2-img.jpg";

const props = defineProps({
  currentImgUrl: {
    type: String,
    default: defaultImg,
  },
});


const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];
const fileInput = ref<HTMLInputElement | null>(null);
const imageUrl = ref<string | null>(defaultImg);


// custom emit

const emit = defineEmits(["update:imgFile", "update:currentImgUrl"]);
const triggerFileInput = () => {
  fileInput.value?.click();
};
const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length) {
    const file = files[0];
    if (acceptedTypes.includes(file.type)) {
      console.log("Selected file:", file);
      imageUrl.value = URL.createObjectURL(file);

      emit("update:imgFile", file);
      emit("update:currentImgUrl", imageUrl.value);

    } else {
      alert("Selected file is not an image.");
    }
  }
};


const handleDeleteImg = () => {
  imageUrl.value = null;
  emit("update:imgFile", null);
  emit("update:currentImgUrl", imageUrl.value);
}


watch(
  () => props.currentImgUrl,
  (newUrl) => {
    imageUrl.value = newUrl;
  }
);
</script>

<template>
  <div class="flex" style="gap: 1.25rem; width: 32rem">
    <div class="img-container">
      <img v-if="imageUrl" style="width: 100%; height: 100%; border-radius: 50%" :src="imageUrl" alt="" />
      <span v-if="imageUrl" class="delete-btn flex-center" @click="imageUrl = null">
        <img src="@/assets/icons/delete.svg" alt="" />
      </span>
    </div>
    <div class="upload-wrapper" @click="triggerFileInput">
      <input type="file" ref="fileInput" @change="handleFileChange" class="file-input" />
      <div class="upload-content flex-col-center">
        <span class="upload-icon flex-center">
          <img src="@/assets/icons/upload-icon.svg" alt="upload-icon" />
        </span>
        <p><span class="upload-text">Click to upload</span> or drag and drop</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-container {
  position: relative;
  width: 3.625rem;
  height: 3.625rem;
  aspect-ratio: 1/1;
  background: #cacaca;
  border-radius: 50%;
}

.delete-btn {
  position: absolute;
  bottom: -0.1875rem;
  right: -0.25rem;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 0.0625rem solid transparent;
  padding: 0.625rem;
}

.delete-btn:hover {
  background: #eee;
  border-color: #e71f63;
}

.delete-btn img {
  width: 1rem;
  height: 1rem;
}

.upload-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-wrapper:hover {
  border-color: #a0aec0;
}

.file-input {
  display: none;
}

.upload-content {
  text-align: center;
  color: #4a5568;
  align-items: center;
}

.upload-icon {
  display: flex;
  width: 40px;
  height: 40px;
  color: #9ca3af;
  border-radius: 50%;
  background: #f2f4f7;
}

.upload-text {
  color: #6941c6;
  font-weight: 500;
  cursor: pointer;
}
</style>
