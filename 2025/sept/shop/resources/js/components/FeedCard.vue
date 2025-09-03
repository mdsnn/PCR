<script setup lang="ts">
defineProps<{ className?: string }>();
</script>

<template>
    <div :class="['rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md', className]">
        <slot />
    </div>
</template>
