<template>
    <div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-green-50">
        <!-- Header -->
        <header class="sticky top-0 z-10 border-b border-gray-200/60 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
            <div class="mx-auto flex max-w-7xl items-center justify-between">
                <h1 class="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-2xl font-bold text-transparent">POTBELLY</h1>

                <!-- Discovery Bar -->
                <div class="mx-6 hidden max-w-lg flex-1 md:flex">
                    <div class="relative w-full">
                        <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Discover fresh markets, stores, and recipes..."
                            class="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                        />
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center space-x-4">
                    <button class="relative rounded-full p-2 transition-colors hover:bg-green-50">
                        <Bell class="h-5 w-5 text-gray-600" />
                        <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            3
                        </span>
                    </button>
                    <div class="h-8 w-8 cursor-pointer rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                </div>
            </div>
        </header>

        <!-- Main Layout -->
        <div class="mx-auto flex max-w-7xl flex-1">
            <!-- Left Sidebar -->
            <aside class="hidden w-64 p-4 lg:block">
                <nav class="sticky top-20 space-y-3">
                    <Link
                        href="/"
                        class="flex items-center space-x-3 rounded-xl bg-green-500 px-4 py-3 text-lg font-medium text-white transition-all hover:bg-green-600"
                    >
                        <Home class="h-6 w-6" />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/map"
                        class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                    >
                        <Map class="h-6 w-6" />
                        <span>Mapview</span>
                    </Link>
                    <Link
                        href="/cart"
                        class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                    >
                        <ShoppingCart class="h-6 w-6" />
                        <span>Cart</span>
                    </Link>
                    <Link
                        href="/chat"
                        class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                    >
                        <MessageCircle class="h-6 w-6" />
                        <span>Chats</span>
                    </Link>
                    <button
                        class="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-green-600"
                    >
                        Post
                    </button>
                </nav>
            </aside>

            <!-- Feed -->
            <main class="flex-1 p-4 lg:border-r lg:border-gray-200/60">
                <div class="space-y-6">
                    <StoreProductCard />
                    <UserFoodPhotoCard />
                    <StoreRecipeVideoCard />
                    <PurchaseBroadcastCard />
                    <EventAttendanceCard />
                    <UserRecipeVideoCard />
                    <CheckInCard />
                </div>
            </main>

            <!-- Right Sidebar -->
            <aside class="hidden w-80 p-4 lg:block">
                <div class="sticky top-20 space-y-6">
                    <!-- Trending Markets -->
                    <div class="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                        <h3 class="mb-3 text-lg font-semibold text-gray-900">🌍 Popular Stores</h3>
                        <ul class="space-y-3 text-sm text-gray-700">
                            <li>#KalunduFreshMilk</li>
                            <li>#ChilenjeSportsBar</li>
                            <li>#BrewMeCoffee</li>
                            <li>#UNCJoeVeggies</li>
                            <li>#AnnasFoodTruck</li>
                        </ul>
                    </div>
                    <!-- Trending Events -->
                    <div class="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                        <h3 class="mb-2 text-lg font-semibold text-gray-900">🍲 Trending</h3>
                        <p class="text-sm text-gray-700">Mubitas Chilanga mulilo (1.3km away)</p>
                        <p class="text-sm text-gray-700">Taonga Bridal Shower (5km away)</p>
                        <p class="text-sm text-gray-700">Ben Barbeque (1.8km away)</p>
                    </div>
                </div>
            </aside>
        </div>

        <!-- Mobile Bottom Nav -->
        <nav
            class="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t border-gray-200/60 bg-white/90 py-2 shadow-lg backdrop-blur-md lg:hidden"
        >
            <Link href="/" class="flex flex-col items-center p-2 text-green-600">
                <Home class="h-5 w-5" />
                <span class="mt-1 text-xs font-medium">Home</span>
            </Link>
            <Link href="/search" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <Search class="h-5 w-5" />
                <span class="mt-1 text-xs">Discover</span>
            </Link>
            <Link href="/cart" class="relative flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <ShoppingCart class="h-5 w-5" />
                <span class="mt-1 text-xs">Cart</span>
            </Link>
            <Link href="/chats" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <MessageCircle class="h-5 w-5" />
                <span class="mt-1 text-xs">Chats</span>
            </Link>
            <Link href="/map" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <Map class="h-5 w-5" />
                <span class="mt-1 text-xs">MapView</span>
            </Link>
        </nav>

        <!-- Floating Post Button (Mobile) -->
        <button
            class="fixed right-4 bottom-20 z-20 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-green-600 lg:hidden"
        >
            <Plus class="mx-auto h-6 w-6" />
        </button>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { Bell, Home, Map, MessageCircle, Plus, Search, ShoppingCart } from 'lucide-vue-next';

// Import the child components
import CheckInCard from '@/components/CheckInCard.vue';
import EventAttendanceCard from '@/components/EventAttendanceCard.vue';
import PurchaseBroadcastCard from '@/components/PurchaseBroadcastCard.vue';
import StoreProductCard from '@/components/StoreProductCard.vue';
import StoreRecipeVideoCard from '@/components/StoreRecipeVideoCard.vue';
import UserFoodPhotoCard from '@/components/UserFoodPhotoCard.vue';
import UserRecipeVideoCard from '@/components/UserRecipeVideoCard.vue';
</script>
