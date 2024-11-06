<script setup lang="ts">
const currentPage = ref<string>("users");

const toggleNav = (page: string) => {
    currentPage.value = page;
};

const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigateTo("/login");
};
</script>

<template>
    <div>
        <div class="dashboard">
            <!-- sidebar -->
            <div class="sidebar">
                <div class="nav">
                    <nav>
                        <ul>
                            <li>
                                <NuxtLink @click="toggleNav('home')" :class="{ active: currentPage === 'home' }"
                                    to="/user/listings">
                                    <img src="@/assets/icons/house.svg" alt="nav-icon" />
                                    Home
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink @click="toggleNav('users')" :class="{ active: currentPage === 'users' }"
                                    to="/user/listings">
                                    <img src="@/assets/icons/UsersFour.svg" alt="nav-icon" />

                                    Users
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink @click="toggleNav('experts')" :class="{
                                    active: currentPage === 'experts',
                                }" to="/user/listings">
                                    <img src="@/assets/icons/SealCheck.svg" alt="nav-icon" />

                                    Experts
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink @click="toggleNav('content')" :class="{
                                    active: currentPage === 'content',
                                }" to="/user/listings" class="flex-between">
                                    <div class="flex" style="gap: 10px">
                                        <img src="@/assets/icons/SquareHalf.svg" alt="nav-icon" />

                                        Content
                                    </div>
                                    <img src="@/assets/icons/chevron-down.svg" alt="" />
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink @click="toggleNav('rooms')" :class="{ active: currentPage === 'rooms' }"
                                    to="/user/listings">
                                    <img src="@/assets/icons/ChatsCircle.svg" alt="nav-icon" />

                                    Rooms
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink @click="toggleNav('app-management')" :class="{
                                    active:
                                        currentPage === 'app-management',
                                }" to="/user/listings" class="flex-between">
                                    <div class="flex" style="gap: 10px">
                                        <img src="@/assets/icons/NotePencil.svg" alt="nav-icon" />

                                        App management
                                    </div>
                                    <img src="@/assets/icons/chevron-down.svg" alt="" />
                                </NuxtLink>
                            </li>
                        </ul>
                    </nav>

                    <div class="user flex-between">
                        <div class="flex">
                            <img src="@/assets/images/user-img.jpg" alt="" />
                            <div style="margin-left: 10px">
                                <p style="font-size: 14px; font-weight: bold">
                                    John Doe
                                </p>
                                <p style="font-size: 14px">Super admin</p>
                            </div>
                        </div>

                        <img @click="handleLogout" src="@/assets/icons/icon.svg" alt="" />
                    </div>
                </div>
            </div>
            <!-- content -->
            <div class="content">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    justify-content: space-between;
    display: flex;
    background: #f5f5f5;
}

.sidebar {
    max-width: 270px;
    min-width: 270px;
    height: 100vh;
    position: relative;
}

nav ul {
    margin-top: 60px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 100%;
}

a {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 40px;
    text-decoration: none;
    color: #000;
    font-size: 16px;
    padding: 0 10px;
    width: 100%;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
}

a:hover {
    background: #eee;
}

a.active {
    background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
    color: white;
}

.user {
    padding: 10px;
    position: fixed;
    bottom: 15px;
    max-width: 100%;
    min-width: 260px;
    border-top: 2px solid #eaecf0;
}

.user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}

.content {
    flex: 1;
    background: #fcfcfd;
    min-height: 100vh;
    max-width: calc(100vw - 270px);
}
</style>
