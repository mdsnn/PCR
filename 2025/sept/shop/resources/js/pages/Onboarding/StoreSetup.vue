<script setup>
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';

const name = ref('');
const type = ref('');

function submit() {
    router.post(route('onboarding.saveStore'), { name: name.value, type: type.value });
}
</script>

<template>
    <div class="flex h-screen flex-col items-center justify-center space-y-6">
        <h1 class="text-2xl font-bold">Set Up Your Store 🏪</h1>
        <form @submit.prevent="submit" class="flex w-80 flex-col space-y-4">
            <input v-model="name" type="text" placeholder="Store Name" class="rounded border px-3 py-2" required />

            <select v-model="type" class="rounded border px-3 py-2" required>
                <option value="">Select Store Type</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="groceries">Groceries</option>
                <option value="other">Other</option>
            </select>

            <button type="submit" class="rounded-lg bg-indigo-600 px-6 py-3 text-white disabled:opacity-50" :disabled="!name || !type">
                Finish Setup
            </button>
        </form>
    </div>
</template>
