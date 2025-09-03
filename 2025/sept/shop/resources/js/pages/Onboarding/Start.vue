<script setup>
import { router } from '@inertiajs/vue3';

function choose(role) {
    router.post(route('onboarding.chooseRole'), { role });
}
</script>

<template>
    <div class="flex h-screen flex-col items-center justify-center space-y-6">
        <h1 class="text-2xl font-bold">Welcome! 🎉</h1>
        <p>Do you want to open a store or continue as a buyer?</p>
        <div class="space-x-4">
            <button @click="choose('seller')" class="rounded-lg bg-indigo-600 px-6 py-3 text-white">Open a Store</button>
            <button @click="choose('buyer')" class="rounded-lg bg-gray-300 px-6 py-3">Continue as Buyer</button>
        </div>
    </div>
</template>
