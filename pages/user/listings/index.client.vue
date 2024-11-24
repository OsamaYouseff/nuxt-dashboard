<script setup lang="ts">
import type { User } from "@/types/User";
import { GET_USERS_QUERY } from "@/graphql/mutations/user";
import { toRawType } from "element-plus/es/utils";

const { locale } = useI18n();

useHead({ title: "Dashboard | All Users" });
definePageMeta({ layout: "dashboard", middleware: "auth" });
const currentTab = ref<string>(localStorage.getItem("currentTab") || "active");

const { result, loading, error } = useQuery(GET_USERS_QUERY);

// Pagination Logic
const pageInfo = reactive({
  page: 1,
  limit: 7,
  totalPages: 1,
});
const blockedUsersIds = ref(
  (await JSON.parse(localStorage.getItem("blockedUsersIds"))) ?? []
);
const blockedUsers: User[] | any = computed(() => {
  const from = (pageInfo.page - 1) * pageInfo.limit;
  const to = from + pageInfo.limit;
  return result.value?.users
    .filter((user: User) => blockedUsersIds.value.includes(user.id))
    .slice(from, to);
});
const users: User[] | any = computed(() => {
  const from = (pageInfo.page - 1) * pageInfo.limit;
  const to = from + pageInfo.limit;
  return result.value?.users
    .filter((user: User) => !blockedUsersIds.value.includes(user.id))
    .slice(from, to);
});

/// handlers

const changeLocale = (lang: any) => {
  locale.value = lang;

  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);

  localStorage.setItem("locale", lang);
};
const handelChangeTab = (tab: string) => {
  switch (tab) {
    case "active":
      currentTab.value = "active";
      localStorage.setItem("currentTab", "active");
      pageInfo.page = 1;
      pageInfo.totalPages = Math.ceil(users?.value.length / 7) + 1;
      break;
    case "blocked":
      currentTab.value = "blocked";
      pageInfo.page = 1;
      localStorage.setItem("currentTab", "blocked");
      pageInfo.totalPages = Math.trunc(blockedUsers?.value.length / 7);

      break;
  }
};
const handleLocaleChange = (selectedLang: string) => {
  changeLocale(selectedLang);
};

const filterUsers = () => {
  console.log("test");
};

// Add watchers for debugging
watch(result, (newResult: any) => {
  if (result.value)
    if (currentTab.value === "blocked") {
      pageInfo.totalPages = Math.trunc(blockedUsers?.value?.length / 7);
    } else {
      pageInfo.totalPages = Math.ceil(users?.value.length / 7) + 1;
    }
  // console.log("Query result:", newResult);
});

watch(error, (newError: any) => {
  if (newError) {
    console.error("GraphQL error:", newError);
  }
});
watch(
  () => pageInfo.page,
  (newPage: number) => {}
);

const value2 = ref(2);
</script>

<template>
  <div class="container">
    <!-- header -->
    <header>
      <div class="flex-between">
        <h1 style="font-weight: 600">Users</h1>

        <div class="btns flex" style="gap: 10px">
          <button>
            <img src="@/assets/icons/download.svg" alt="export-icon" />
            Export
          </button>
          <nuxt-link to="/user/create">
            <button class="add-user">
              <img src="@/assets/icons/plus.svg" alt=" plus-icon" />

              Add user
            </button>
          </nuxt-link>

          <div
            class="flex-center"
            style="gap: 5px; font-weight: bolder"
            :style="{ direction: locale === 'en' ? 'ltr' : 'rtl' }"
          >
            <span>En</span>
            <el-switch
              @click="handleLocaleChange(locale === 'en' ? 'ar' : 'en')"
              v-model="value2"
              class="ml-2"
              style="
                --el-switch-on-color: #ef3e2c;
                --el-switch-off-color: #e71f63;
              "
            />
            <span>ع</span>
          </div>
        </div>
      </div>
    </header>

    <div v-if="loading" style="width: 88vw; position: relative">
      <spinner />
    </div>

    <ErrorComponent
      v-else-if="error"
      :error="{
        myMessage: 'Failed to show users Information',
        apiMessage: error,
      }"
    />

    <div v-else>
      <!-- Nav path -->
      <div class="nav-path">
        <NuxtLink to="/user/listings">Users</NuxtLink>
      </div>

      <!-- Users Table -->
      <div class="users-table">
        <!-- Tabs -->
        <div class="tabs flex">
          <span
            @click="handelChangeTab('active')"
            :class="{ active: currentTab == 'active' }"
            >Active Users</span
          >
          <span
            @click="handelChangeTab('blocked')"
            :class="{ active: currentTab == 'blocked' }"
            >Blocked Users</span
          >
        </div>

        <!-- Filters -->
        <div class="filters flex-between" style="margin-bottom: 20px">
          <div class="search-bar">
            <img src="@/assets/icons/MagnifyingGlass.svg" alt="search-icon" />
            <input @input="filterUsers" type="text" placeholder="Search" />
          </div>
          <div class="filters-btns flex" style="gap: 10px">
            <button>Jan 6, 2022 – Jan 13, 2022</button>
            <button>
              <img src="@/assets/icons/Vector.svg" alt="filter-icon" />
              Filters
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="users-list" style="overflow: auto">
          <UsersTable
            :users="currentTab == 'active' ? users : blockedUsers"
            :blockedUsers="blockedUsers"
            :blockedUsersIds="blockedUsersIds"
            :pageInfo="pageInfo"
          />

          <div v-if="loading" style="width: 88vw; position: relative">
            <spinner />
          </div>
          <CustomPagination v-else :pageInfo="pageInfo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  padding: 20px 30px;
  margin-bottom: 20px;
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
  min-width: 132px;
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

.users-list {
  min-width: 1100px;
  background: #ffffff;
  border: 1px solid #dddcd8;
  padding: 15px;
  border-radius: 12px;
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

a {
  color: initial;
}
</style>
