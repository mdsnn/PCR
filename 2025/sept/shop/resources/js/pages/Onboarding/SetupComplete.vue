<script setup>
import { router } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const props = defineProps({
    store: {
        type: Object,
        required: true,
    },
});

const progress = ref(0);
const currentMessage = ref('Initializing your store...');
const isComplete = ref(false);

const messages = [
    'Initializing your store...',
    'Setting up your dashboard...',
    'Configuring store settings...',
    'Loading your products catalog...',
    'Preparing analytics tools...',
    'Finalizing setup...',
    'Ready to go!',
];

let messageIndex = 0;
let progressInterval;
let messageInterval;

onMounted(() => {
    // Progress animation
    progressInterval = setInterval(() => {
        if (progress.value < 100) {
            progress.value += Math.random() * 15 + 5; // Random progress increment
            if (progress.value > 100) {
                progress.value = 100;
            }
        }
    }, 300);

    // Message rotation
    messageInterval = setInterval(() => {
        if (messageIndex < messages.length - 1) {
            messageIndex++;
            currentMessage.value = messages[messageIndex];
        }
    }, 800);

    // Complete setup after 5 seconds
    setTimeout(() => {
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        progress.value = 100;
        currentMessage.value = messages[messages.length - 1];
        isComplete.value = true;

        // Redirect to dashboard after showing completion
        setTimeout(() => {
            router.visit(route(`dashboard.${props.store.type}`));
        }, 1500);
    }, 5000);
});
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 px-4">
        <div class="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-2xl">
            <!-- Store Logo or Icon -->
            <div class="mb-8">
                <div v-if="store.logo" class="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-green-100 shadow-lg">
                    <img :src="`/storage/${store.logo}`" :alt="store.name + ' logo'" class="h-full w-full object-cover" />
                </div>
                <div
                    v-else
                    class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg"
                >
                    <svg class="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        ></path>
                    </svg>
                </div>
            </div>

            <!-- Title -->
            <h1 class="mb-2 text-3xl font-bold text-gray-900">Setting up {{ store.name }}</h1>
            <p class="mb-8 text-gray-600">We're preparing your store dashboard and getting everything ready for you.</p>

            <!-- Progress Section -->
            <div class="mb-8">
                <!-- Progress Bar -->
                <div class="mb-4 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                        class="relative h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 ease-out"
                        :style="{ width: progress + '%' }"
                    >
                        <!-- Animated shine effect -->
                        <div class="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </div>
                </div>

                <!-- Progress Percentage -->
                <div class="mb-2 text-2xl font-bold text-gray-900">{{ Math.round(progress) }}%</div>

                <!-- Current Status Message -->
                <div class="flex items-center justify-center">
                    <svg v-if="!isComplete" class="mr-3 -ml-1 h-5 w-5 animate-spin text-green-600" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <svg v-else class="mr-3 h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p class="font-medium text-gray-700">{{ currentMessage }}</p>
                </div>
            </div>

            <!-- Store Info Summary -->
            <div class="rounded-xl border border-green-100 bg-green-50 p-6">
                <h3 class="mb-3 font-semibold text-green-900">Store Details</h3>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-green-700">Name:</span>
                        <span class="font-medium text-green-900">{{ store.name }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-green-700">Type:</span>
                        <span class="font-medium text-green-900 capitalize">{{ store.type.replace('_', ' ') }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-green-700">Location:</span>
                        <span class="font-medium text-green-900">{{ store.location }}</span>
                    </div>
                </div>
            </div>

            <!-- Success Message (shown when complete) -->
            <div v-if="isComplete" class="mt-6 animate-pulse font-medium text-green-600">Redirecting to your dashboard...</div>
        </div>
    </div>
</template>

<style scoped>
@keyframes shine {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.animate-shine {
    animation: shine 2s infinite;
}
</style>
