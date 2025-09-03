<template>
    <div class="flex h-screen w-full flex-col bg-gray-50">
        <!-- Enhanced header with stats -->
        <div class="z-10 bg-white p-4 shadow-md">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-semibold text-gray-900">Discover Nearby</h1>
                    <p class="text-sm text-gray-600">
                        Showing {{ currentMarkers.length }} {{ categoryLabels[activeCategory].toLowerCase() }} • {{ markerCount }} total locations
                    </p>
                </div>

                <!-- Desktop search input -->
                <div class="hidden md:flex">
                    <input
                        type="text"
                        placeholder="Search locations..."
                        class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--my-green)] focus:ring-1 focus:ring-[var(--my-green)] focus:outline-none"
                    />
                </div>

                <!-- Mobile controls -->
                <div class="flex gap-2 md:hidden">
                    <button @click="showMobileList = true" class="rounded-lg bg-[var(--my-green)] p-2 text-white" title="List view">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <button class="rounded-lg border border-gray-300 bg-white p-2 text-gray-600" title="Search">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Category filters -->
            <div class="mt-3 flex flex-wrap gap-2">
                <button
                    v-for="cat in categories"
                    :key="cat"
                    @click="activeCategory = cat"
                    :class="[
                        'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                        activeCategory === cat
                            ? 'bg-[var(--my-green)] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm',
                    ]"
                >
                    <div class="h-3 w-3 rounded-full" :style="{ backgroundColor: getCategoryColor(cat) }" />
                    <span class="hidden sm:inline">{{ categoryLabels[cat] }}</span>
                    <span class="sm:hidden">{{ cat }}</span>
                    <span class="ml-1 rounded-full bg-black/10 px-2 py-0.5 text-xs">{{ markersData[cat].length }}</span>
                </button>
            </div>
        </div>

        <div class="flex flex-1 overflow-hidden">
            <!-- Desktop sidebar for selected marker details -->
            <div v-if="selectedMarker && !isMobile" class="w-80 overflow-y-auto bg-white p-4 shadow-lg">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <div
                                class="h-4 w-4 rounded-full border-2 border-white shadow-md"
                                :style="{ backgroundColor: getCategoryColor(activeCategory) }"
                            />
                            <h3 class="text-lg font-semibold text-gray-900">{{ selectedMarker.label }}</h3>
                        </div>
                        <p v-if="selectedMarker.description" class="mt-2 text-sm text-gray-600">{{ selectedMarker.description }}</p>
                        <div v-if="selectedMarker.timestamp" class="mt-2 flex items-center gap-1">
                            <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p class="text-xs text-gray-500">{{ selectedMarker.timestamp }}</p>
                        </div>
                    </div>
                    <button @click="selectedMarker = null" class="ml-4 rounded-full p-1 hover:bg-gray-100">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="mt-4 space-y-2">
                    <button class="w-full rounded-lg bg-[var(--my-green)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--my-green)]/90">
                        Get Directions
                    </button>
                    <div class="flex gap-2">
                        <button class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Share
                        </button>
                        <button class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Save
                        </button>
                    </div>
                </div>

                <!-- Additional info section -->
                <div class="mt-6 rounded-lg bg-gray-50 p-3">
                    <h4 class="text-sm font-medium text-gray-900">Location Details</h4>
                    <div class="mt-2 space-y-1 text-xs text-gray-600">
                        <p>Lat: {{ selectedMarker.position[0].toFixed(6) }}</p>
                        <p>Lng: {{ selectedMarker.position[1].toFixed(6) }}</p>
                        <p>Category: {{ categoryLabels[activeCategory] }}</p>
                    </div>
                </div>
            </div>

            <!-- Map container -->
            <div class="relative flex-1">
                <div ref="mapContainer" class="h-full w-full"></div>

                <!-- Map overlay controls -->
                <div class="absolute top-4 left-4 z-10 rounded-lg bg-white p-2 shadow-md">
                    <div class="text-xs text-gray-600">Zoom to see individual markers</div>
                </div>
            </div>
        </div>

        <!-- Mobile selected marker bottom sheet -->
        <div v-if="selectedMarker && isMobile" class="border-t bg-white shadow-lg">
            <div class="p-4">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <div
                                class="h-4 w-4 rounded-full border-2 border-white shadow-md"
                                :style="{ backgroundColor: getCategoryColor(activeCategory) }"
                            />
                            <h3 class="font-semibold text-gray-900">{{ selectedMarker.label }}</h3>
                        </div>
                        <p v-if="selectedMarker.description" class="mt-1 text-sm text-gray-600">{{ selectedMarker.description }}</p>
                        <p v-if="selectedMarker.timestamp" class="mt-1 text-xs text-gray-500">{{ selectedMarker.timestamp }}</p>
                    </div>
                    <button @click="selectedMarker = null" class="ml-4 rounded-full p-1 hover:bg-gray-100">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="mt-3 flex gap-2">
                    <button class="flex-1 rounded-lg bg-[var(--my-green)] px-3 py-2 text-sm font-medium text-white">Directions</button>
                    <button class="rounded-lg border border-gray-300 px-3 py-2 text-sm">Share</button>
                </div>
            </div>
        </div>

        <!-- Mobile List View Modal -->
        <MobileListView
            v-if="showMobileList"
            :category="activeCategory"
            :markers="currentMarkers"
            :category-labels="categoryLabels"
            @select-marker="handleMobileSelectMarker"
            @close="showMobileList = false"
        />
    </div>
</template>

<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import MobileListView from './components/MobileListView.vue';

// Fix default marker issue in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom colored icons for different categories
const createColoredIcon = (color) =>
    L.divIcon({
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        className: 'custom-marker',
    });

const categoryIcons = {
    events: createColoredIcon('#8B5CF6'), // Purple
    checkins: createColoredIcon('#10B981'), // Green
    food: createColoredIcon('#F59E0B'), // Amber
    places: createColoredIcon('#EF4444'), // Red
};

// Sample data
const markersData = reactive({
    events: [
        {
            id: 'event-1',
            position: [-15.3875, 28.3228],
            label: 'Music Festival 🎶',
            description: 'Annual music festival featuring local and international artists',
            timestamp: '2025-09-15',
        },
        {
            id: 'event-2',
            position: [-15.4, 28.33],
            label: 'Tech Meetup 💻',
            description: 'Monthly gathering for developers and tech enthusiasts',
            timestamp: '2025-08-30',
        },
        {
            id: 'event-3',
            position: [-15.385, 28.328],
            label: 'Art Exhibition 🎨',
            description: 'Contemporary art showcase',
            timestamp: '2025-09-01',
        },
        {
            id: 'event-4',
            position: [-15.392, 28.335],
            label: 'Food Market 🏪',
            description: "Weekly farmer's market",
            timestamp: 'Every Saturday',
        },
        {
            id: 'event-5',
            position: [-15.386, 28.33],
            label: 'Workshop 🔧',
            description: 'DIY workshop for beginners',
            timestamp: '2025-09-10',
        },
    ],
    checkins: [
        {
            id: 'checkin-1',
            position: [-15.39, 28.325],
            label: 'John checked in 📍',
            description: 'Recent visitor activity',
            timestamp: '2 hours ago',
        },
        {
            id: 'checkin-2',
            position: [-15.388, 28.327],
            label: 'Sarah checked in 📍',
            description: 'Recent visitor activity',
            timestamp: '5 hours ago',
        },
        {
            id: 'checkin-3',
            position: [-15.391, 28.329],
            label: 'Mike checked in 📍',
            description: 'Recent visitor activity',
            timestamp: '1 day ago',
        },
        {
            id: 'checkin-4',
            position: [-15.387, 28.324],
            label: 'Anna checked in 📍',
            description: 'Recent visitor activity',
            timestamp: '3 hours ago',
        },
    ],
    food: [
        {
            id: 'food-1',
            position: [-15.395, 28.31],
            label: 'Best Pizza 🍕',
            description: 'Authentic wood-fired pizza with fresh ingredients',
            timestamp: 'Open now',
        },
        {
            id: 'food-2',
            position: [-15.38, 28.32],
            label: 'Local Cafe ☕',
            description: 'Specialty coffee and homemade pastries',
            timestamp: 'Open until 6 PM',
        },
        {
            id: 'food-3',
            position: [-15.393, 28.315],
            label: 'Street Food Hub 🌮',
            description: 'Variety of local street food vendors',
            timestamp: 'Open evenings',
        },
        {
            id: 'food-4',
            position: [-15.387, 28.318],
            label: 'Fine Dining 🍽️',
            description: 'Upscale restaurant with international cuisine',
            timestamp: 'Reservations recommended',
        },
        {
            id: 'food-5',
            position: [-15.396, 28.312],
            label: 'Burger Joint 🍔',
            description: 'Gourmet burgers and craft beer',
            timestamp: 'Open until midnight',
        },
    ],
    places: [
        {
            id: 'place-1',
            position: [-15.389, 28.34],
            label: 'National Museum 🏛️',
            description: 'Explore local history and cultural artifacts',
            timestamp: 'Mon-Sat 9AM-5PM',
        },
        {
            id: 'place-2',
            position: [-15.37, 28.315],
            label: 'Park 🌳',
            description: 'Beautiful green space perfect for relaxation',
            timestamp: 'Always open',
        },
        {
            id: 'place-3',
            position: [-15.396, 28.342],
            label: 'Shopping Center 🛍️',
            description: 'Modern shopping complex with various stores',
            timestamp: 'Daily 9AM-9PM',
        },
        {
            id: 'place-4',
            position: [-15.375, 28.308],
            label: 'Cultural Center 🎭',
            description: 'Hub for arts and cultural activities',
            timestamp: 'Check schedule',
        },
        {
            id: 'place-5',
            position: [-15.384, 28.338],
            label: 'Library 📚',
            description: 'Public library with study spaces',
            timestamp: 'Mon-Fri 8AM-8PM',
        },
    ],
});

const categoryLabels = {
    events: 'Events',
    checkins: 'Check-ins',
    food: 'Food & Drink',
    places: 'Places',
};

const categories = ['events', 'checkins', 'food', 'places'];

// Reactive state
const activeCategory = ref('events');
const selectedMarker = ref(null);
const showMobileList = ref(false);
const isMobile = ref(false);
const mapContainer = ref(null);

// Map instance and layers
let map = null;
let clusterGroup = null;
let regularMarkers = [];

// Computed properties
const currentMarkers = computed(() => markersData[activeCategory.value]);
const markerCount = computed(() => Object.values(markersData).flat().length);

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

// Mobile detection
const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
};

// Initialize map
const initializeMap = async () => {
    await nextTick();

    if (!mapContainer.value) return;

    map = L.map(mapContainer.value, {
        center: [-15.3875, 28.3228],
        zoom: 13,
        zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Update markers for initial category
    updateMapMarkers();
};

// Update map view when category changes
const updateMapView = () => {
    if (!map) return;

    const markers = currentMarkers.value;
    if (markers.length > 0) {
        const group = new L.FeatureGroup(markers.map((marker) => L.marker(marker.position)));
        map.fitBounds(group.getBounds(), { padding: [20, 20] });
    }
};

// Create cluster layer
const updateMapMarkers = () => {
    if (!map) return;

    // Clean up existing markers/clusters
    if (clusterGroup) {
        map.removeLayer(clusterGroup);
        clusterGroup = null;
    }

    regularMarkers.forEach((marker) => {
        map.removeLayer(marker);
    });
    regularMarkers = [];

    const markers = currentMarkers.value;
    const usesClustering = typeof L.MarkerClusterGroup !== 'undefined';

    if (usesClustering) {
        // Create new cluster group with custom styling
        clusterGroup = new L.MarkerClusterGroup({
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            iconCreateFunction: function (cluster) {
                const count = cluster.getChildCount();
                const color = getCategoryColor(activeCategory.value);

                return L.divIcon({
                    html: `<div style="
            background-color: ${color}; 
            color: white; 
            border-radius: 50%; 
            width: 35px; 
            height: 35px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-weight: bold; 
            font-size: 12px;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">${count}</div>`,
                    className: 'custom-cluster-icon',
                    iconSize: L.point(35, 35, true),
                });
            },
        });

        // Add markers to cluster group
        markers.forEach((marker) => {
            const leafletMarker = L.marker(marker.position, {
                icon: categoryIcons[activeCategory.value],
            });

            leafletMarker.bindPopup(`
        <div style="min-width: 200px;">
          <h4 style="margin: 0 0 8px 0; font-weight: 600;">${marker.label}</h4>
          ${marker.description ? `<p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${marker.description}</p>` : ''}
          ${marker.timestamp ? `<p style="margin: 0; font-size: 12px; color: #999;">${marker.timestamp}</p>` : ''}
        </div>
      `);

            leafletMarker.on('click', () => {
                selectedMarker.value = marker;
            });

            clusterGroup.addLayer(leafletMarker);
        });

        map.addLayer(clusterGroup);
    } else {
        // Fallback: Add regular markers without clustering
        console.info('Using regular markers (clustering not available)');

        markers.forEach((marker) => {
            const leafletMarker = L.marker(marker.position, {
                icon: categoryIcons[activeCategory.value],
            });

            leafletMarker.bindPopup(`
        <div style="min-width: 200px;">
          <h4 style="margin: 0 0 8px 0; font-weight: 600;">${marker.label}</h4>
          ${marker.description ? `<p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${marker.description}</p>` : ''}
          ${marker.timestamp ? `<p style="margin: 0; font-size: 12px; color: #999;">${marker.timestamp}</p>` : ''}
        </div>
      `);

            leafletMarker.on('click', () => {
                selectedMarker.value = marker;
            });

            map.addLayer(leafletMarker);
            regularMarkers.push(leafletMarker);
        });
    }
};

// Handle mobile marker selection
const handleMobileSelectMarker = (marker) => {
    selectedMarker.value = marker;
    showMobileList.value = false;
};

// Watchers
watch(activeCategory, () => {
    updateMapMarkers();
    updateMapView();
});

// Lifecycle hooks
onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    initializeMap();
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
    if (map) {
        map.remove();
    }
});
</script>

<style scoped>
:deep(.leaflet-container) {
    height: 100%;
    width: 100%;
}

:deep(.custom-marker) {
    background: transparent;
    border: none;
}

:deep(.custom-cluster-icon) {
    background: transparent;
    border: none;
}
</style>
