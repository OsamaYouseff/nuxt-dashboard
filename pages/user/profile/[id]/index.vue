<script setup lang="ts">
import edit from "@/assets/icons/edit.svg";
import save from "@/assets/icons/download.svg";

useHead({ title: "Dashboard | User Profile" });
definePageMeta({ layout: "dashboard", middleware: "auth" });

// Fetching User
const route = useRoute();
const USER_QUERY = gql`
    query GetUser {
        user (id: ${route.params.id || 1}) {
            id
            email
            password
            name
            role
            avatar
            creationAt
            updatedAt
        }
    }
`;
const { result, loading, error } = useQuery(USER_QUERY);
const user = computed(() => result?.value?.user);

const isUserBlocked = ref<boolean>(false);
const editMode = ref<boolean>(false);

const checkUserBlocked = (): boolean => {
  const blockedUsers = localStorage.getItem("blockedUsersIds");
  if (blockedUsers) {
    const blockedUsersIds = JSON.parse(blockedUsers);
    if (blockedUsersIds.includes(user.value.id)) {
      isUserBlocked.value = true;
    } else {
      isUserBlocked.value = false;
    }
  }
  return false;
};

// Add watchers for debugging
watch(result, (newResult: any) => {
  checkUserBlocked();
});

onMounted(() => {
  if (user.value) {
    checkUserBlocked();
  }
});

watch(error, (newError: any) => {
  if (newError) {
    console.error("GraphQL error:", newError);
  }
});
</script>

<template>
  <div class="content-wrapper">
    <div style="width: 88vw; position: relative">
      <spinner v-if="loading" />
    </div>

    <ErrorComponent
      v-if="error"
      :error="{
        myMessage: 'Failed to Show User Profile',
        apiMessage: error,
      }"
    />

    <div class="container">
      <!-- header -->
      <header>
        <div class="flex-between">
          <h1 style="font-weight: 600">Users</h1>
          <div class="btns flex" style="gap: 10px">
            <button
              @click="toggleBlockUser(user.id)"
              class="block"
              :style="{ background: !isUserBlocked ? '#673AB7' : '' }"
            >
              <img src="@/assets/icons/block2.svg" alt="block-icon" />
              {{ isUserBlocked ? "Unblock" : "Block" }}
            </button>
            <button @click="handleDeleteUser(user.id)" class="delete">
              <img src="@/assets/icons/delete2.svg" alt="delete-icon" />
              delete
            </button>
            <button style="padding: 0px">
              <el-dropdown
                style="width: 100%; height: 100%; padding: 10px"
                class="flex-center"
              >
                <span class="el-dropdown-link">
                  <img
                    style="cursor: pointer"
                    src="@/assets/icons/Dropdown.svg"
                    alt="edit"
                  />
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <NuxtLink :to="`/user/profile/${user.id}`">
                      <el-dropdown-item>Edit</el-dropdown-item>
                    </NuxtLink>
                    <el-dropdown-item @click="handleDeleteUser(user.id)"
                      >Delete</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </button>
          </div>
        </div>
      </header>

      <!-- Nav path -->
      <div
        class="nav-path flex"
        style="gap: 10px; margin-bottom: 20px; color: #101828"
      >
        <NuxtLink to="/user/listings">Users</NuxtLink>
        <img src="@/assets/icons/next-arrow.svg" alt="next-icon" />
        <NuxtLink to="/user/create">User Profile</NuxtLink>
      </div>

      <!-- Profile Header -->
      <div class="profile-header flex" style="gap: 20px; margin-bottom: 20px">
        <div
          class="img-container flex-center"
          style="width: 101px; height: 101px"
        >
          <img
            v-if="!user?.avatar?.includes('lorem') || !user?.avatar"
            :src="user?.avatar"
            alt="user-img"
            style="width: 100%; height: 100%; border-radius: 50%"
          />
          <CustomImg
            style="margin: 0; scale: 2.4"
            :username="user.name"
            v-else
          />
        </div>
        <div>
          <h2
            class="flex"
            style="gap: 10px"
            :class="{ blocked: isUserBlocked }"
          >
            <img
              v-if="isUserBlocked"
              style="width: 23px"
              src="@/assets/icons/block3.svg"
              alt="block-icon"
            />
            {{ user?.name }}
          </h2>
          <p style="font-size: 18px" :class="{ blocked: isUserBlocked }">
            U12345678{{ user?.id }}
          </p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs flex">
        <span class="active">Active Users</span>
      </div>
    </div>
    <div class="info-wrapper">
      <!-- Profile info -->
      <div class="info">
        <div class="flex-between">
          <span></span>
          <button @click="editMode = !editMode" class="edit">
            <img :src="editMode ? save : edit" alt="change-info-btn" />

            {{ editMode ? "Save" : "Edit" }}
          </button>
        </div>
        <h2 style="font-size: 20px">Account info</h2>
        <form @click.prevent="">
          <div style="margin-top: 20px">
            <label for="name">Name</label>
            <input
              :disabled="!editMode"
              type="text"
              placeholder="Your name"
              :value="user?.name"
            />
          </div>
          <div style="margin-top: 20px">
            <label for="name">Email address</label>
            <input
              :disabled="!editMode"
              type="emil"
              placeholder="Your Email address"
              :value="user?.email"
            />
          </div>
          <div style="margin-top: 20px">
            <label for="name">Role</label>
            <input
              :disabled="!editMode"
              type="text"
              placeholder="Your Role"
              :value="user?.role"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container,
.info-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px 30px 0 30px;
}

.info-wrapper {
  background: white;
}

a {
  color: #858589;
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
  border: 1px solid #dddcd8;
}

.blocked {
  color: #b71a2a;
}

button img {
  width: 20px;
  height: 20px;
}

button.block {
  background: linear-gradient(90deg, #ef3e2c 0%, #e71f63 100%);
  color: white;
}

.tabs {
  width: 100%;
  border-bottom: 2px solid #eaecf0;
  gap: 15px;
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

.users-table {
  width: 100%;
  padding: 0;
  margin-top: 20px;
}

form {
  min-width: 400px;
  max-width: 800px;
  max-width: 70%;
  margin-top: 20px;
}

label {
  min-width: 200px;
  font-size: 16px;
  color: #101828;
  font-weight: 500;
}

input {
  display: block;
  min-width: 244px;
  max-width: 512px;
  width: 100%;
  height: 44px;
  border: none;
  border-bottom: 1px solid #eaeaea;
  background: transparent;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
}

input:disabled {
  color: #858589;
  cursor: no-drop;
}

.img-container {
  position: relative;
  width: 58px;
  height: 58px;
  aspect-ratio: 1/1;
  background: #c7b9d9;
  border-radius: 50%;
}

h1,
h2,
label {
  color: #101828;
}
</style>
