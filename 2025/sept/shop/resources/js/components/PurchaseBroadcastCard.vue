<template>
    <FeedCard custom-class="border-green-200 bg-green-50/50">
        <CardHeader avatar="bg-gradient-to-r from-purple-500 to-pink-500" name="Mike Banda" username="mikeb" time="15m" type="user" />

        <div class="space-y-3 rounded-xl border border-green-200 bg-white p-4">
            <div class="flex items-center space-x-2 text-green-700">
                <ShoppingCart class="h-5 w-5" />
                <span class="font-semibold">Purchase Complete</span>
            </div>

            <div class="flex items-center space-x-4">
                <img
                    src="https://images.unsplash.com/photo-1608270586620-248524c67de9?w=80&h=80&fit=crop"
                    alt="Heineken"
                    class="h-16 w-16 rounded-lg object-cover"
                />
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-900">6-Pack Heineken Beer</h4>
                    <p class="text-sm text-gray-600">from <strong>City Liquor Store</strong></p>
                    <p class="text-lg font-bold text-green-600">K120.00</p>
                </div>
            </div>

            <div class="flex items-center space-x-2 text-sm text-gray-500">
                <MapPin class="h-4 w-4" />
                <span>Cairo Road, Lusaka</span>
            </div>
        </div>

        <CardActions :likes="12" :comments="3" :shares="1" />
    </FeedCard>
</template>

<script setup>
import CardActions from '@/components/CardActions.vue';
import CardHeader from '@/components/CardHeader.vue';
import FeedCard from '@/components/FeedCard.vue';
import { MapPin, ShoppingCart } from 'lucide-vue-next';
</script>
