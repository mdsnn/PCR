<template>
    <div :class="`rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md ${customClass}`">
        <slot />
    </div>
</template>

<script setup>
defineProps({
    customClass: {
        type: String,
        default: '',
    },
});
</script>
