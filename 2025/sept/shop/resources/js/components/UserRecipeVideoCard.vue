<template>
    <FeedCard>
        <CardHeader
            avatar="bg-gradient-to-r from-pink-500 to-red-500"
            name="Grace Sakala"
            username="graces"
            time="1d"
            type="user"
            location="Matero, Lusaka"
        />

        <div class="relative mb-4 overflow-hidden rounded-xl">
            <img
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop"
                alt="Cooking Video"
                class="h-64 w-full object-cover"
            />
            <div class="absolute inset-0 flex items-center justify-center bg-black/20">
                <button class="rounded-full bg-white/90 p-4 text-red-500 transition-colors hover:bg-white">
                    <Play class="ml-1 h-8 w-8" />
                </button>
            </div>
            <div class="absolute bottom-4 left-4 rounded bg-black/70 px-2 py-1 text-xs text-white">3:45</div>
        </div>

        <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-900">Quick Kapenta Curry Recipe</h3>
            <p class="text-gray-600">My grandmother's secret recipe! Perfect for busy weeknights 👵🏿✨</p>

            <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">#Recipe</span>
                <span class="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">#QuickMeal</span>
                <span class="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">#Kapenta</span>
            </div>
        </div>

        <CardActions :likes="89" :comments="15" :shares="23" />
    </FeedCard>
</template>

<script setup>
import CardActions from '@/Components/CardActions.vue';
import CardHeader from '@/Components/CardHeader.vue';
import FeedCard from '@/Components/FeedCard.vue';
import { Play } from 'lucide-vue-next';
</script>
