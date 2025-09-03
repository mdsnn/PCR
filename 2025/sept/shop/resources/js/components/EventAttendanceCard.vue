<template>
    <FeedCard custom-class="border-blue-200 bg-blue-50/50">
        <CardHeader avatar="bg-gradient-to-r from-yellow-500 to-red-500" name="Jane Phiri" username="janep" time="2h" type="user" />

        <div class="space-y-3 rounded-xl border border-blue-200 bg-white p-4">
            <div class="flex items-center space-x-2 text-blue-700">
                <Calendar class="h-5 w-5" />
                <span class="font-semibold">Attending Event</span>
            </div>

            <div>
                <h4 class="font-semibold text-gray-900">Jane's Weekend Braai 🔥</h4>
                <p class="text-sm text-gray-600">Join us for an amazing weekend braai with great food and music!</p>
            </div>

            <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                    <Clock class="h-4 w-4" />
                    <span>Saturday, 2:00 PM</span>
                </div>
                <div class="flex items-center space-x-2">
                    <MapPin class="h-4 w-4" />
                    <span>Chelstone, Lusaka</span>
                </div>
            </div>

            <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">23 people attending</span>
                <div class="flex -space-x-2">
                    <div v-for="i in 4" :key="i" class="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-r from-green-400 to-blue-500"></div>
                </div>
            </div>
        </div>

        <CardActions :likes="34" :comments="12" :shares="8" />
    </FeedCard>
</template>

<script setup>
import CardActions from '@/components/CardActions.vue';
import CardHeader from '@/components/CardHeader.vue';
import FeedCard from '@/components/FeedCard.vue';
import { Calendar, Clock, MapPin } from 'lucide-vue-next';
</script>
