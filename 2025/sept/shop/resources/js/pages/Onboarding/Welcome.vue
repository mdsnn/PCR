<template>
    <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div class="container mx-auto px-4 py-8">
            <!-- Main Welcome Card -->
            <div class="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                <!-- Header with Celebration Animation -->
                <div class="relative overflow-hidden bg-gradient-to-r from-green-400 to-emerald-400 px-8 py-12 text-center text-white">
                    <!-- Animated Background Elements -->
                    <div class="absolute inset-0 opacity-20">
                        <div class="absolute top-4 left-4 h-6 w-6 animate-bounce rounded-full bg-white"></div>
                        <div class="absolute top-8 right-8 h-4 w-4 animate-bounce rounded-full bg-white" style="animation-delay: 0.5s"></div>
                        <div class="absolute bottom-6 left-12 h-3 w-3 animate-bounce rounded-full bg-white" style="animation-delay: 1s"></div>
                        <div class="absolute right-6 bottom-8 h-5 w-5 animate-bounce rounded-full bg-white" style="animation-delay: 1.5s"></div>
                    </div>

                    <!-- Profile Picture -->
                    <div class="relative z-10 mb-6">
                        <div class="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white/20 shadow-lg">
                            <img
                                v-if="user.profile_picture"
                                :src="`/storage/${user.profile_picture}`"
                                :alt="user.name"
                                class="h-full w-full object-cover"
                            />
                            <div v-else class="flex h-full w-full items-center justify-center text-white">
                                <svg class="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Welcome Message -->
                    <div class="relative z-10">
                        <div class="mb-4 text-6xl">🎉</div>
                        <h1 class="mb-2 text-4xl font-bold">Welcome, {{ user.name?.split(' ')[0] || user.username }}!</h1>
                        <p class="text-lg text-green-100">Your food journey starts now</p>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-8">
                    <!-- Success Message -->
                    <div class="mb-8 text-center">
                        <div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>

                        <h2 class="mb-4 text-2xl font-bold text-gray-900">Setup Complete! 🚀</h2>

                        <p class="text-lg leading-relaxed text-gray-600">
                            You're all set! We've personalized your experience based on your preferences. Time to explore delicious food, connect with
                            local vendors, and discover new flavors.
                        </p>
                    </div>

                    <!-- Feature Highlights -->
                    <div class="mb-8 grid gap-6 md:grid-cols-3">
                        <div class="p-4 text-center">
                            <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                                <svg class="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 class="mb-1 font-semibold text-gray-900">Discover</h3>
                            <p class="text-sm text-gray-600">Find amazing local food vendors and restaurants</p>
                        </div>

                        <div class="p-4 text-center">
                            <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 class="mb-1 font-semibold text-gray-900">Connect</h3>
                            <p class="text-sm text-gray-600">Share experiences with fellow food enthusiasts</p>
                        </div>

                        <div class="p-4 text-center">
                            <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                <svg class="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <h3 class="mb-1 font-semibold text-gray-900">Enjoy</h3>
                            <p class="text-sm text-gray-600">Get personalized recommendations just for you</p>
                        </div>
                    </div>

                    <!-- Quick Tips -->
                    <div class="mb-8 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                        <h3 class="mb-3 flex items-center font-semibold text-gray-900">
                            <svg class="mr-2 h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Quick Tips to Get Started
                        </h3>
                        <ul class="space-y-2 text-sm text-gray-600">
                            <li class="flex items-start">
                                <span class="mr-2 text-green-500">•</span>
                                Complete your profile to get better recommendations
                            </li>
                            <li class="flex items-start">
                                <span class="mr-2 text-green-500">•</span>
                                Enable location services to find nearby food vendors
                            </li>
                            <li class="flex items-start">
                                <span class="mr-2 text-green-500">•</span>
                                Follow your favorite restaurants and food bloggers
                            </li>
                            <li class="flex items-start">
                                <span class="mr-2 text-green-500">•</span>
                                Share photos and reviews to help the community
                            </li>
                        </ul>
                    </div>

                    <!-- Action Button -->
                    <div class="text-center">
                        <a
                            :href="homeUrl"
                            class="inline-flex transform items-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-600 hover:to-emerald-600"
                        >
                            <span class="mr-2">🚀</span>
                            Start Exploring
                            <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>

                    <!-- Footer Note -->
                    <div class="mt-8 border-t border-gray-200 pt-6">
                        <p class="text-center text-sm text-gray-500">You can always update your preferences in your profile settings</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    user: Object,
    homeUrl: String,
});

// Optional: Add some celebration effects or animations
// You could add confetti or other animations here if desired
</script>

<style scoped>
/* Add custom animations if needed */
@keyframes celebration {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.celebration {
    animation: celebration 2s ease-in-out infinite;
}
</style>
