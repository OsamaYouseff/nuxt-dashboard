<script setup lang="ts">
import type { User } from "@/types/User";
import block from "../assets/icons/block.svg";
import unblock from "../assets/icons/unblock.svg";
import { toggleBlockUser, handleDeleteUser } from "@/composables/users";

const props = defineProps<{
  users: User[];
  blockedUsers: number[];
  blockedUsersIds: number[];
  pageInfo: {
    page: number;
    limit: number;
    totalPages: number;
  };
}>();

const columns = [
  {
    key: "name",
    width: 140,
    label: "Name",
  },

  {
    key: "email",
    width: 160,
    label: "Email",
  },
  {
    key: "username",
    width: 50,
    label: "Username",
  },
  {
    key: "mobileNumber",
    width: 80,
    label: "Mobile Number",
  },
  {
    key: "region",
    width: 100,
    label: "Region",
  },
  {
    key: "creationAt",
    width: 80,
    label: "Created At",
  },
  {
    key: "actions",
    width: 40,
  },
];

//// check logic
let checkedAll = ref<boolean>(false);
const checkedAllUsers = () => {
  checkedAll.value = !checkedAll.value;
  document
    .querySelectorAll("input[type=checkbox]")
    .forEach((el: Element, index) => {
      const inputEl = el as HTMLInputElement;
      if (index === 0) inputEl.checked = !inputEl.checked;
      if (inputEl.checked !== checkedAll.value) inputEl.click();
    });
};
</script>

<template>
  <div class="table">
    <!-- Header -->
    <div class="flex-between" style="padding: 0 10px; margin-bottom: 10px">
      <h2 style="font-size: 18px; font-weight: 500">All Users</h2>
      <img
        style="cursor: pointer"
        src="@/assets/icons/Dropdown.svg"
        alt="edit"
      />
    </div>
    <!-- Table -->
    <table key="users-table">
      <thead class="table-header">
        <tr>
          <th
            :class="{ flex: column.key === 'name' }"
            style="gap: 20px"
            v-for="column in columns"
            :key="column.key"
          >
            <div v-if="column.key === 'name'">
              <CustomCheckBtn @click="checkedAllUsers" :checked="checkedAll" />
            </div>
            {{ column.label ? $t(`${column.label}`) : "" }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="person in props.users" :key="person.id">
          <td
            v-for="column in columns"
            :key="column.key"
            :style="{
              minWidth: `${column.width}px`,
              maxWidth: `${column.width}px`,
            }"
          >
            <!-- Name -->
            <div class="flex" v-if="column.key === 'name'" style="gap: 10px">
              <CustomCheckBtn :checked="checkedAll" />
              <NuxtLink :to="`/user/profile/${person.id}`">
                <div class="flex-center">
                  <div
                    v-if="!person.avatar.includes('lorem')"
                    class="flex-center"
                    style="
                      width: 40px;
                      height: 40px !important;
                      border-radius: 50%;
                      margin-right: 5px;
                      background: #00000014;
                    "
                  >
                    <img
                      style="
                        max-width: 100%;
                        max-height: 40px;
                        border-radius: 50%;
                      "
                      :src="person.avatar"
                      alt="user-img"
                    />
                  </div>

                  <CustomImg v-else :username="person.name" />

                  <div>
                    <p>{{ person[column.key] }}</p>
                    <p>U12367{{ person.id }}</p>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <!-- Email -->
            <div v-else-if="column.key === 'email'">
              <p>
                {{ person.email }}
              </p>
            </div>

            <!-- Username -->
            <div
              class="flex"
              v-else-if="column.key === 'username'"
              style="gap: 10px"
            >
              <NuxtLink :to="`/user/profile/${person.id}`">
                <p>@{{ person.name }}</p>
              </NuxtLink>
            </div>

            <!-- Mobile Number -->
            <div v-else-if="column.key === 'mobileNumber'">
              <p>+20 1234567843</p>
            </div>

            <!-- Region -->
            <div v-else-if="column.key === 'region'">
              <p>Egypt, Cairo</p>
            </div>

            <!-- Created At -->
            <div v-else-if="column.key === 'creationAt'">
              <p>
                {{ new Date(person.creationAt).toLocaleString().split(",")[0] }}
              </p>
            </div>

            <!-- Actions -->
            <div
              class="flex-center actions"
              style="gap: 10px"
              v-else-if="column.key === 'actions'"
            >
              <dir @click="toggleBlockUser(person.id)" class="block">
                <img
                  v-show="!props.blockedUsersIds.includes(person.id)"
                  :src="block"
                  alt="block-icon"
                />
                <img
                  v-show="props.blockedUsersIds.includes(person.id)"
                  style="max-width: 18px"
                  :src="unblock"
                  alt="unblock-icon"
                />
              </dir>
              <el-dropdown class="flex-center" style="height: 24px">
                <span class="el-dropdown-link" style="height: 24px; margin: 0">
                  <img
                    style="cursor: pointer"
                    src="@/assets/icons/Dropdown.svg"
                    alt="edit"
                  />
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <NuxtLink :to="`/user/profile/${person.id}`">
                      <el-dropdown-item>Edit</el-dropdown-item>
                    </NuxtLink>
                    <el-dropdown-item @click="handleDeleteUser(person.id)"
                      >Delete</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
  overflow-x: scroll;
}

.table-header {
  background: #f9fafb;
}

th {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #eaecf0;
  font-size: 14px;
  font-weight: 500;
  color: #475467;
}

td {
  padding: 10px;
  font-size: 14px;
}

tr {
  cursor: pointer;
  border-bottom: 1px solid #eaecf0;
}

p,
a {
  font-weight: normal;
  color: initial;
}

.block {
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid transparent;
  padding: 2px;
  height: 25px;
}

.block:hover {
  border-color: #f86751;
}
</style>
