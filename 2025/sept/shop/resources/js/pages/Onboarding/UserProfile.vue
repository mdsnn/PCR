<script setup>
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';

const step = ref(1);

const form = ref({
    name: '',
    location: '',
    profile_picture: null,
});

const submit = () => {
    router.post(route('onboarding.saveUserProfile'), form.value);
};

const next = () => step.value++;
const back = () => step.value--;
</script>

<template>
    <div class="mx-auto max-w-md p-6">
        <h1 class="mb-4 text-center text-2xl font-bold">Complete Your Profile</h1>

        <!-- Step 1: Name -->
        <div v-if="step === 1">
            <label class="mb-2 block">Name</label>
            <input v-model="form.name" type="text" class="w-full rounded border p-2" />
            <button @click="next" class="mt-4 rounded bg-green-600 px-4 py-2 text-white">Next</button>
        </div>

        <!-- Step 2: Profile Picture -->
        <div v-if="step === 2">
            <label class="mb-2 block">Profile Picture (optional)</label>
            <input type="file" @change="(e) => (form.profile_picture = e.target.files[0])" />
            <div class="mt-4 flex justify-between">
                <button @click="back" class="rounded border px-4 py-2">Back</button>
                <button @click="submit" class="rounded bg-green-600 px-4 py-2 text-white">Finish</button>
            </div>
        </div>
    </div>
</template>
