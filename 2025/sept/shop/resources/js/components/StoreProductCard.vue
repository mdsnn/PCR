<template>
    <FeedCard>
        <CardHeader
            avatar="bg-gradient-to-r from-blue-500 to-purple-500"
            name="Fresh Valley Market"
            username="freshvalley"
            time="1h"
            type="store"
            location="Kabulonga, Lusaka"
        />

        <div class="mb-4 overflow-hidden rounded-xl">
            <img
                src="https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=400&h=300&fit=crop"
                alt="Organic Tomatoes"
                class="h-64 w-full object-cover"
            />
        </div>

        <div class="space-y-3">
            <div>
                <h3 class="text-lg font-semibold text-gray-900">Fresh Organic Tomatoes</h3>
                <p class="text-gray-600">Premium quality tomatoes, locally grown and pesticide-free</p>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <span class="text-2xl font-bold text-green-600">K25.00</span>
                    <span class="text-sm text-gray-500 line-through">K30.00</span>
                    <span class="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">17% OFF</span>
                </div>
                <button class="flex items-center space-x-2 rounded-xl bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600">
                    <ShoppingCart class="h-4 w-4" />
                    <span>Add to Cart</span>
                </button>
            </div>

            <div class="flex flex-wrap gap-2">
                <span class="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">#Organic</span>
                <span class="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">#LocalFresh</span>
            </div>
        </div>

        <CardActions :likes="24" :comments="5" :shares="3" />
    </FeedCard>
</template>

<script setup>
import CardActions from '@/components/CardActions.vue';
import CardHeader from '@/components/CardHeader.vue';
import FeedCard from '@/components/FeedCard.vue';
import { ShoppingCart } from 'lucide-vue-next';
</script>
