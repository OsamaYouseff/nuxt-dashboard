<script setup lang="ts">
const columns = [
    {
        key: "name",
        width: 120,
        label: "Name",
    },

    {
        key: "email",
        width: 180,
        label: "Email",
    },
    {
        key: "username",
        width: 100,
        label: "Username",
    },
    {
        key: "mobileNumber",
        width: 80,
        label: "Mobile Number",
    },
    {
        key: "region",
        width: 80,
        label: "Region",
    },
    {
        key: "createdAt",
        width: 80,
        label: "Created At",
    },
    {
        key: "actions",
        width: 40,
    },
];

const people = [
    {
        id: 1,
        name: "Tom",
        username: "Tom Cook",
        email: "tom.cook@example.com",
        mobileNumber: "+20 1234567890",
        region: "Egypt, Cairo",
        createdAt: "01/4/2024",
        role: "Member",
    },
    {
        id: 2,
        name: "Tom",
        username: "Tom Cook",
        email: "tom.cook@example.com",
        mobileNumber: "+20 1234567890",
        region: "Egypt, Cairo",
        createdAt: "01/4/2024",
        role: "Member",
    },
    {
        id: 4,
        name: "Whitney",
        username: "Whitney Francis",
        email: "whitney.francis@example.com",
        mobileNumber: "+20 1234567890",
        region: "Egypt, Cairo",
        createdAt: "01/4/2024",
        role: "Admin",
    },
    {
        id: 5,
        name: "Leonard",
        username: "Leonard Krasner",
        email: "leonard.krasner@example.com",
        mobileNumber: "+20 1234567890",
        region: "Egypt, Cairo",
        createdAt: "01/4/2024",
        role: "Owner",
    },
    {
        id: 3,
        name: "Tom",
        username: "Tom Cook",
        email: "tom.cook@example.com",
        mobileNumber: "+20 1234567890",
        region: "Egypt, Cairo",
        createdAt: "01/4/2024",
        role: "Member",
    },
    {
        id: 6,
        name: "Floyd",
        username: "Floyd Miles",
        email: "floyd.miles@example.com",
        mobileNumber: "+20 1234567890",
        region: "Egypt, Cairo",
        createdAt: "01/4/2024",
        role: "Member",
    },
];

let checkedAll = ref<boolean>(false);

const checkedAllUsers = () => {
    checkedAll.value = !checkedAll.value;
    document.querySelectorAll("input[type=checkbox]").forEach((el, index) => {
        if (index === 0) el.checked = !el.checked;
        if (el.checked === checkedAll.value) el.click();
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
                            <CustomCheckBtn
                                @click="checkedAllUsers"
                                :checked="checkedAll"
                            />
                        </div>
                        {{ column.label }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="person in people" :key="person.id">
                    <td
                        v-for="column in columns"
                        :key="column.key"
                        :style="{
                            minWidth: `${column.width}px`,
                            maxWidth: `${column.width}px`,
                        }"
                    >
                        <div
                            class="flex"
                            v-if="column.key === 'name'"
                            style="gap: 10px"
                        >
                            <CustomCheckBtn :checked="checkedAll" />
                            <NuxtLink :to="`/user/profile/${person.id}`">
                                <div class="flex">
                                    <img
                                        style="
                                            max-width: 40px;
                                            max-height: 40px;
                                            border-radius: 50%;
                                            margin-right: 5px;
                                        "
                                        src="@/assets/images/user2-img.png"
                                        alt="user-img"
                                    />
                                    <div>
                                        <p>{{ person[column.key] }}</p>
                                        <p>U123456781</p>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>

                        <div v-else>
                            <p>{{ person[column.key] }}</p>
                        </div>

                        <!-- Actions -->
                        <div
                            class="flex-center"
                            style="gap: 10px"
                            v-if="column.key === 'actions'"
                        >
                            <img
                                src="@/assets/icons/block.svg"
                                alt="block-icon"
                            />
                            <img
                                style="cursor: pointer"
                                src="@/assets/icons/Dropdown.svg"
                                alt="edit"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="pagination">
            <CustomPagination />
        </div>
    </div>
</template>

<style scoped>
.table {
    min-width: 1100px;
    background: #ffffff;
    border: 1px solid #dddcd8;
    padding: 15px;
    border-radius: 12px;
}

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
</style>
