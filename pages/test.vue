<script setup>
import { gql } from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";

const USERS_QUERY = gql`
    query GetUsers {
        users(limit: 7) {
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

const { result, loading, error } = useQuery(USERS_QUERY);

// Changed from launches to users
const users = computed(() => result.value?.users ?? []);

// Add watchers for debugging
watch(result, (newResult) => {
    console.log("Query result:", newResult);
});

watch(error, (newError) => {
    if (newError) {
        console.error("GraphQL error:", newError);
    }
});
</script>

<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Users List</h1>

        <!-- Loading state -->
        <div v-if="loading">Loading users...</div>

        <!-- Error state -->
        <div v-else-if="error" class="text-red-500">
            Error: {{ error.message }}
        </div>

        <!-- Data display -->
        <div v-else-if="users.length" class="space-y-4">
            <div
                v-for="user in users"
                :key="user.id"
                class="border p-4 rounded-lg"
            >
                <div class="flex gap-4">
                    <img
                        v-if="user.avatar"
                        :src="user.avatar"
                        :alt="user.name"
                        class="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h2 class="text-xl font-semibold">{{ user.name }}</h2>
                        <p>Email: {{ user.email }}</p>
                        <p>Role: {{ user.role }}</p>
                        <p>
                            Created:
                            {{ new Date(user.creationAt).toLocaleDateString() }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div v-else>No users found</div>
    </div>
</template>
