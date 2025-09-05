<script setup>
import { onMounted } from 'vue';

const user = $page.props.user;
const homeUrl = $page.props.homeUrl;

onMounted(() => {
    setTimeout(() => {
        window.location.href = homeUrl;
    }, 3000); // 3 seconds
});
</script>

<template>
    <div class="flex h-screen flex-col items-center justify-center text-center">
        <img v-if="user.profile_picture" :src="`/storage/${user.profile_picture}`" class="mb-4 h-20 w-20 rounded-full" />
        <h1 class="text-2xl font-bold">Welcome, {{ user.name }}!</h1>
        <p class="text-gray-600">We’re setting up your experience...</p>
    </div>
</template>
