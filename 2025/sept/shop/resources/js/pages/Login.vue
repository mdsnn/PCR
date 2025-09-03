<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps<{
    flash?: { success?: string };
}>();

const form = useForm({
    email: '',
});

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleSubmit = () => {
    form.post(route('magic-link.send'));
};

// Floating circles data
const circles = [
    { size: 200, top: '20%', left: '10%', delay: 0 },
    { size: 300, top: '60%', right: '15%', delay: 2 },
    { size: 150, bottom: '15%', left: '25%', delay: 4 },
];
</script>

<template>
    <Head title="Login" />

    <div
        class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-500 to-green-700 px-4 py-12 sm:px-6 lg:px-8"
    >
        <!-- Floating circles -->
        <div
            v-for="(c, i) in circles"
            :key="i"
            class="absolute rounded-full bg-white/10 backdrop-blur-xl"
            :style="{
                width: c.size + 'px',
                height: c.size + 'px',
                top: c.top,
                left: c.left,
                right: c.right,
                bottom: c.bottom,
                animationDelay: c.delay + 's',
            }"
            class="animate-floating"
        />

        <!-- Card -->
        <div
            v-motion
            :initial="{ y: 50, opacity: 0 }"
            :enter="{ y: 0, opacity: 1, transition: { duration: 0.8 } }"
            class="relative z-10 w-full max-w-md"
        >
            <div class="rounded-2xl bg-white/20 p-8 shadow-2xl backdrop-blur-lg">
                <h2 class="mb-6 text-center text-3xl font-extrabold text-white">POTBELLY</h2>

                <!-- Success Message -->
                <div v-if="props.flash?.success" class="mb-4 rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-700">
                    {{ props.flash.success }}
                </div>

                <form class="space-y-5" @submit.prevent="handleSubmit">
                    <!-- Email -->
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address"
                            required
                            class="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-200 focus:border-green-400 focus:ring-green-400 focus:outline-none"
                            v-model="form.email"
                        />
                        <p v-if="form.errors.email" class="mt-1 text-sm text-red-300">
                            {{ form.errors.email }}
                        </p>
                    </div>

                    <!-- Submit -->
                    <button
                        type="submit"
                        :disabled="form.processing || !isValidEmail(form.email)"
                        class="flex w-full justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-medium text-white shadow-lg hover:from-green-600 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {{ form.processing ? 'Sending Login Link...' : 'Send Login Link' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes floating {
    0%,
    100% {
        transform: translateY(0) scale(1);
        opacity: 0.6;
    }
    50% {
        transform: translateY(-30px) scale(1.05);
        opacity: 1;
    }
}
.animate-floating {
    animation: floating 6s infinite;
}
</style>
