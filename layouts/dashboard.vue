<script setup lang="ts">
const { locale } = useI18n();
const currentPage = ref<string>("users");
import { GET_MY_PROFILE_QUERY } from "@/graphql/mutations/user";

// const { result, loading, error } = useQuery(GET_MY_PROFILE_QUERY);

// console.log(result)

// const user = computed(() => result?.value?.user);

const toggleNav = (page: string) => {
  currentPage.value = page;
};

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  navigateTo("/login");
};

onMounted(() => {
  const storedLocale = localStorage.getItem("locale") as "en" | "ar" | null;
  if (storedLocale) {
    locale.value = storedLocale;
    const dir = storedLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
  }
});
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
                <NuxtLink
                  @click="toggleNav('home')"
                  :class="{ active: currentPage === 'home' }"
                  to="/home"
                >
                  <img src="@/assets/icons/house.svg" alt="nav-icon" />
                  {{ $t("Home") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  @click="toggleNav('users')"
                  :class="{ active: currentPage === 'users' }"
                  to="/user/listings"
                >
                  <img src="@/assets/icons/UsersFour.svg" alt="nav-icon" />
                  {{ $t("Users") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  @click="toggleNav('experts')"
                  :class="{
                    active: currentPage === 'experts',
                  }"
                  to="/experts"
                >
                  <img src="@/assets/icons/SealCheck.svg" alt="nav-icon" />
                  {{ $t("Experts") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  @click="toggleNav('content')"
                  :class="{
                    active: currentPage === 'content',
                  }"
                  to="/content"
                  class="flex-between"
                >
                  <div class="flex" style="gap: 10px">
                    <img src="@/assets/icons/SquareHalf.svg" alt="nav-icon" />
                    {{ $t("Content") }}
                  </div>
                  <img src="@/assets/icons/chevron-down.svg" alt="" />
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  @click="toggleNav('rooms')"
                  :class="{ active: currentPage === 'rooms' }"
                  to="/rooms"
                >
                  <img src="@/assets/icons/ChatsCircle.svg" alt="nav-icon" />
                  {{ $t("Rooms") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  @click="toggleNav('app-management')"
                  :class="{
                    active: currentPage === 'app-management',
                  }"
                  to="/app-management"
                  class="flex-between"
                >
                  <div class="flex" style="gap: 10px">
                    <img src="@/assets/icons/NotePencil.svg" alt="nav-icon" />
                    {{ $t("App management") }}
                  </div>
                  <img src="@/assets/icons/chevron-down.svg" alt="" />
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <div class="user flex-center">
            <span>Logout</span>

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
  margin-top: 15px;
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
  color: #667085;
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

.form-select {
  width: 100%;
  font-size: 20px;
  margin: 0 20px;
  padding: 4px 10px;
  border-radius: 4px;
  border: none;
}
</style>
