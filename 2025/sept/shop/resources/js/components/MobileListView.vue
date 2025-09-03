<template>
    <div class="fixed inset-0 z-50 bg-white md:hidden">
        <!-- Header -->
        <div class="flex items-center justify-between border-b bg-white p-4">
            <div>
                <h2 class="text-lg font-semibold">{{ categoryLabels[category] }}</h2>
                <p class="text-sm text-gray-600">{{ markers.length }} locations</p>
            </div>
            <button @click="$emit('close')" class="rounded-full p-2 hover:bg-gray-100">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Search bar in mobile list -->
        <div class="border-b bg-gray-50 p-4">
            <input
                type="text"
                :placeholder="`Search ${categoryLabels[category].toLowerCase()}...`"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--my-green)] focus:ring-1 focus:ring-[var(--my-green)] focus:outline-none"
            />
        </div>

        <!-- List -->
        <div class="flex-1 overflow-y-auto">
            <div class="space-y-3 p-4">
                <div
                    v-for="(marker, index) in markers"
                    :key="marker.id"
                    @click="handleMarkerClick(marker)"
                    class="cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-[var(--my-green)] hover:shadow-md active:scale-98"
                >
                    <div class="flex items-start gap-3">
                        <div class="flex flex-col items-center">
                            <div
                                class="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-md"
                                :style="{ backgroundColor: getCategoryColor(category) }"
                            >
                                {{ index + 1 }}
                            </div>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900">{{ marker.label }}</h3>
                            <p v-if="marker.description" class="mt-1 text-sm text-gray-600">{{ marker.description }}</p>
                            <div v-if="marker.timestamp" class="mt-2 flex items-center gap-1">
                                <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p class="text-xs text-gray-500">{{ marker.timestamp }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                            <button class="rounded-full bg-gray-100 p-1 hover:bg-gray-200" @click.stop="handleDirections(marker)">
                                <svg class="h-3 w-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom action bar -->
        <div class="border-t bg-white p-4">
            <div class="flex gap-2">
                <button @click="$emit('close')" class="flex-1 rounded-lg bg-[var(--my-green)] px-4 py-3 text-sm font-medium text-white">
                    Back to Map
                </button>
                <button class="rounded-lg border border-gray-300 px-4 py-3">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    category: {
        type: String,
        required: true,
    },
    markers: {
        type: Array,
        required: true,
    },
    categoryLabels: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['selectMarker', 'close']);

// Helper function for category colors
const getCategoryColor = (category) => {
    const colors = {
        events: '#8B5CF6',
        checkins: '#10B981',
        food: '#F59E0B',
        places: '#EF4444',
    };
    return colors[category];
};

const handleMarkerClick = (marker) => {
    emit('selectMarker', marker);
};

const handleDirections = (marker) => {
    // Handle directions functionality
    console.log('Get directions to:', marker.label);
};
</script>
