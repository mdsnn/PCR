<template>
    <div class="mb-4 flex items-start space-x-4">
        <div :class="`h-12 w-12 rounded-full ${avatar} flex items-center justify-center`">
            <Store v-if="type === 'store'" class="h-6 w-6 text-white" />
            <User v-if="type === 'user'" class="h-6 w-6 text-white" />
        </div>
        <div class="flex-1">
            <div class="flex items-center space-x-2">
                <h3 class="font-semibold text-gray-900">{{ name }}</h3>
                <span v-if="username" class="text-sm text-gray-500">@{{ username }}</span>
                <span class="text-gray-400">·</span>
                <span class="text-sm text-gray-500">{{ time }}</span>
            </div>
            <div v-if="location" class="mt-1 flex items-center space-x-1">
                <MapPin class="h-3 w-3 text-gray-400" />
                <span class="text-xs text-gray-500">{{ location }}</span>
            </div>
        </div>
        <button class="rounded-full p-2 hover:bg-gray-50">
            <MoreHorizontal class="h-4 w-4 text-gray-400" />
        </button>
    </div>
</template>

<script setup>
import { MapPin, MoreHorizontal, Store, User } from 'lucide-vue-next';

defineProps({
    avatar: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        default: null,
    },
    time: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: null,
    },
});
</script>
