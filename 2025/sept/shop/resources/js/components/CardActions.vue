<template>
    <div class="flex items-center justify-between border-t border-gray-100 pt-4">
        <button class="flex items-center space-x-2 text-gray-500 transition-colors hover:text-red-500">
            <Heart class="h-5 w-5" />
            <span class="text-sm">{{ likes }}</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-500 transition-colors hover:text-blue-500">
            <MessageCircle class="h-5 w-5" />
            <span class="text-sm">{{ comments }}</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-500 transition-colors hover:text-green-500">
            <Share class="h-5 w-5" />
            <span class="text-sm">{{ shares }}</span>
        </button>
    </div>
</template>

<script setup>
import { Heart, MessageCircle, Share } from 'lucide-vue-next';

defineProps({
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    shares: {
        type: Number,
        default: 0,
    },
});
</script>
