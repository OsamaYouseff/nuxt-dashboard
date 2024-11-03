<template>
    <div
        style="
            text-align: center;
            height: 100vh;
            width: 83%;
            background: #fefefef2;
            display: grid;
            place-content: center;
            z-index: 999;
            position: absolute;
        "
    >
        <div class="spin"></div>
    </div>
</template>

<style>
.spin {
    display: block;
    width: 40px;
    height: 40px;
    margin: 30px auto;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: #e71f63;
    animation: spin 1s ease infinite;
}

@keyframes spin {
    to {
        -webkit-transform: rotateZ(360deg);
    }
}
</style>
