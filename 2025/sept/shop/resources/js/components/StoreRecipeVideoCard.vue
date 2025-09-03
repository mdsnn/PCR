<template>
    <FeedCard>
        <CardHeader
            avatar="bg-gradient-to-r from-red-500 to-orange-500"
            name="Mama's Kitchen"
            username="mamaskitchen"
            time="3h"
            type="store"
            location="Town Center, Lusaka"
        />

        <div class="relative mb-4 overflow-hidden rounded-xl">
            <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
                alt="Cooking Video"
                class="h-64 w-full object-cover"
            />
            <div class="absolute inset-0 flex items-center justify-center bg-black/20">
                <button class="rounded-full bg-white/90 p-4 text-red-500 transition-colors hover:bg-white">
                    <Play class="ml-1 h-8 w-8" />
                </button>
            </div>
            <div class="absolute bottom-4 left-4 rounded bg-black/70 px-2 py-1 text-xs text-white">5:23</div>
        </div>

        <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-900">How to Make Perfect Nshima</h3>
            <p class="text-gray-600">Traditional Zambian recipe with modern techniques for the perfect texture</p>

            <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">#Recipe</span>
                <span class="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700">#Traditional</span>
                <span class="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">#Cooking</span>
            </div>
        </div>

        <CardActions :likes="156" :comments="23" :shares="45" />
    </FeedCard>
</template>

<script setup>
import CardActions from '@/components/CardActions.vue';
import CardHeader from '@/components/CardHeader.vue';
import FeedCard from '@/components/FeedCard.vue';
import { Play } from 'lucide-vue-next';
</script>
