<script setup lang="ts">
import { Heart, MessageCircle, Share } from 'lucide-vue-next';

defineProps<{
    likes?: number;
    comments?: number;
    shares?: number;
}>();
</script>

<template>
    <div class="flex items-center justify-between border-t border-gray-100 pt-4">
        <button class="flex items-center space-x-2 text-gray-500 transition-colors hover:text-red-500">
            <Heart class="h-5 w-5" />
            <span class="text-sm">{{ likes ?? 0 }}</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-500 transition-colors hover:text-blue-500">
            <MessageCircle class="h-5 w-5" />
            <span class="text-sm">{{ comments ?? 0 }}</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-500 transition-colors hover:text-green-500">
            <Share class="h-5 w-5" />
            <span class="text-sm">{{ shares ?? 0 }}</span>
        </button>
    </div>
</template>
