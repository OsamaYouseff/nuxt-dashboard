<script setup lang="ts">
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
    fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length) {
        const file = files[0];
        console.log("Selected file:", file);
        // You can handle the file upload logic here
    }
};
</script>

<template>
    <div class="upload-wrapper" @click="triggerFileInput">
        <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            class="file-input"
        />
        <div class="upload-content flex-col-center">
            <span class="upload-icon flex-center">
                <img src="@/assets/icons/upload-icon.svg" alt="upload-icon" />
            </span>
            <p>
                <span class="upload-text">Click to upload</span> or drag and
                drop
            </p>
        </div>
    </div>
</template>

<style scoped>
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

h1,
h2,
label {
    color: #101828;
}
</style>
