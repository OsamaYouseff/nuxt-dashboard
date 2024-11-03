<template>
    <div class="wrapper">
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

.wrapper {
    text-align: center;
    height: 100vh;
    min-height: 60vh;
    min-width: 100%;
    background: #fefefef2;
    display: grid;
    place-content: center;
    z-index: 9999;
    position: absolute;
    transform: translateY(-10%);
}

@keyframes spin {
    to {
        -webkit-transform: rotateZ(360deg);
    }
}
</style>
