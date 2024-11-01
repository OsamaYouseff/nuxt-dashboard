<script setup lang="ts">
useHead({
    title: "Users",
});
definePageMeta({
    layout: "dashboard",
});

const currentTab = ref<string>("active");
</script>

<template>
    <div class="container">
        <!-- header -->
        <header>
            <div class="flex-between">
                <h1 style="font-weight: 600">Users</h1>

                <div class="btns flex" style="gap: 10px">
                    <button>
                        <img
                            src="@/assets/icons/download.svg"
                            alt="export-icon"
                        />
                        Export
                    </button>
                    <nuxt-link to="/user/create">
                        <button class="add-user">
                            <img
                                src="@/assets/icons/plus.svg"
                                alt=" plus-icon"
                            />

                            Add user
                        </button>
                    </nuxt-link>
                </div>
            </div>
        </header>

        <!-- Nav path -->
        <div class="nav-path">
            <NuxtLink to="/user/listings">Users</NuxtLink>
        </div>

        <!-- Users Table -->
        <div class="users-table">
            <!-- Tabs -->
            <div class="tabs flex">
                <span
                    @click="currentTab = 'active'"
                    :class="{ active: currentTab == 'active' }"
                    >Active Users</span
                >
                <span
                    @click="currentTab = 'blocked'"
                    :class="{ active: currentTab == 'blocked' }"
                    >Blocked Users</span
                >
            </div>

            <!-- Filters -->
            <div class="filters flex-between" style="margin-bottom: 20px">
                <div class="search-bar">
                    <img
                        src="@/assets/icons/MagnifyingGlass.svg"
                        alt="search-icon"
                    />
                    <input type="text" placeholder="Search" />
                </div>
                <div class="filters-btns flex" style="gap: 10px">
                    <button>Jan 6, 2022 – Jan 13, 2022</button>
                    <button>
                        <img
                            src="@/assets/icons/Vector.svg"
                            alt="filter-icon"
                        />
                        Filters
                    </button>
                </div>
            </div>

            <!-- Table -->
            <div class="users-list">
                <UsersTable />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    padding: 20px 30px;
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

button img {
    width: 20px;
    height: 20px;
}

button.add-user {
    background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
    color: white;
}
button.add-user img {
    width: 25px;
    height: 15px;
}

.users-table {
    width: 100%;
    padding: 0;
    margin-top: 20px;
}

.tabs {
    width: 100%;
    border-bottom: 2px solid #eaecf0;
    gap: 15px;
    margin-bottom: 20px;
    font-weight: 600;
}

.tabs span {
    font-size: 14px;
    font-weight: 500;
    color: #344054;
    padding-bottom: 10px;
    cursor: pointer;
}
.tabs span.active {
    border-bottom: 2px solid var(--secondary-color);
    color: var(--secondary-color);
}

.search-bar {
    position: relative;
    width: 400px;
    height: 44px;
}
.search-bar input {
    width: 100%;
    border: 1px solid #d0d5dd;
    height: 100%;
    border-radius: 8px;
    padding: 0 0 0 35px;
    font-size: 16px;
    outline: none;
}

.search-bar img {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
}
</style>
