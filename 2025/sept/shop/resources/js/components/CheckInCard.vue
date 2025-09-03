<template>
    <FeedCard custom-class="border-purple-200 bg-purple-50/50">
        <CardHeader avatar="bg-gradient-to-r from-indigo-500 to-purple-500" name="David Mulenga" username="davidm" time="just now" type="user" />

        <div class="space-y-3 rounded-xl border border-purple-200 bg-white p-4">
            <div class="flex items-center space-x-2 text-purple-700">
                <MapPin class="h-5 w-5" />
                <span class="font-semibold">Checked In</span>
            </div>

            <div>
                <h4 class="font-semibold text-gray-900">Manda Hill Shopping Mall</h4>
                <p class="text-sm text-gray-600">Great shopping experience! Found everything I needed 🛍️</p>
            </div>

            <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                    <Clock class="h-4 w-4" />
                    <span>2:45 PM</span>
                </div>
                <div class="flex items-center space-x-1">
                    <CheckCircle class="h-4 w-4 text-green-500" />
                    <span>Verified Location</span>
                </div>
            </div>
        </div>

        <CardActions :likes="8" :comments="2" :shares="0" />
    </FeedCard>
</template>

<script setup>
import CardActions from '@/Components/CardActions.vue';
import CardHeader from '@/Components/CardHeader.vue';
import FeedCard from '@/Components/FeedCard.vue';
import { CheckCircle, Clock, MapPin } from 'lucide-vue-next';
</script>
