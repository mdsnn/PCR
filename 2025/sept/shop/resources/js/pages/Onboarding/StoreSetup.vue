<script setup>
import { router } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';

// Form data
const name = ref('');
const type = ref('');
const location = ref('');
const latitude = ref(null);
const longitude = ref(null);

// Multi-step form state
const currentStep = ref(1);
const totalSteps = 3;

// Store types with categories for better UX
const storeTypes = [
    { value: 'farm', label: 'Farm Store', category: 'Agriculture' },
    { value: 'poultry', label: 'Poultry', category: 'Agriculture' },
    { value: 'dairy', label: 'Dairy Farm', category: 'Agriculture' },
    { value: 'livestock', label: 'Livestock', category: 'Agriculture' },
    { value: 'bakery', label: 'Bakery', category: 'Food & Beverage' },
    { value: 'grocery', label: 'Food Grocer', category: 'Food & Beverage' },
    { value: 'restaurant', label: 'Restaurant', category: 'Food & Beverage' },
    { value: 'coffee', label: 'Coffee Shop', category: 'Food & Beverage' },
    { value: 'butcher', label: 'Butcher Shop', category: 'Food & Beverage' },
    { value: 'seafood', label: 'Seafood Market', category: 'Food & Beverage' },
    { value: 'spice', label: 'Spice Shop', category: 'Food & Beverage' },
    { value: 'clothing', label: 'Clothing Store', category: 'Retail' },
    { value: 'electronics', label: 'Electronics', category: 'Retail' },
    { value: 'bookstore', label: 'Bookstore', category: 'Retail' },
    { value: 'pharmacy', label: 'Pharmacy', category: 'Health & Wellness' },
    { value: 'beauty', label: 'Beauty Salon', category: 'Health & Wellness' },
    { value: 'fitness', label: 'Fitness Center', category: 'Health & Wellness' }
];

// Search and filtering for store types
const typeSearch = ref('');
const showTypeDropdown = ref(false);
const filteredStoreTypes = computed(() => {
    if (!typeSearch.value) return storeTypes;
    return storeTypes.filter(store => 
        store.label.toLowerCase().includes(typeSearch.value.toLowerCase()) ||
        store.category.toLowerCase().includes(typeSearch.value.toLowerCase())
    );
});

// Geolocation state
const isGettingLocation = ref(false);
const locationError = ref('');

// Progress calculation
const progress = computed(() => {
    return (currentStep.value / totalSteps) * 100;
});

// Step validation
const canProceedFromStep1 = computed(() => name.value.trim().length > 0);
const canProceedFromStep2 = computed(() => type.value.length > 0);
const canSubmit = computed(() => location.value.trim().length > 0);

function nextStep() {
    if (currentStep.value < totalSteps) {
        currentStep.value++;
        // Auto-focus on location step
        if (currentStep.value === 3) {
            getUserLocation();
        }
    }
}

function prevStep() {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
}

function selectStoreType(storeType) {
    type.value = storeType.value;
    typeSearch.value = storeType.label;
    showTypeDropdown.value = false;
}

function getUserLocation() {
    if (!navigator.geolocation) {
        locationError.value = 'Geolocation is not supported by this browser.';
        return;
    }

    isGettingLocation.value = true;
    locationError.value = '';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            latitude.value = position.coords.latitude;
            longitude.value = position.coords.longitude;
            isGettingLocation.value = false;
            
            // Optional: Reverse geocoding to get address
            reverseGeocode(latitude.value, longitude.value);
        },
        (error) => {
            isGettingLocation.value = false;
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    locationError.value = 'Location access denied. Please enter your location manually.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    locationError.value = 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    locationError.value = 'Location request timed out.';
                    break;
                default:
                    locationError.value = 'An unknown error occurred.';
            }
        }
    );
}

// Simple reverse geocoding using a free API
async function reverseGeocode(lat, lng) {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
        const data = await response.json();
        
        if (data.city && data.countryName) {
            location.value = `${data.city}, ${data.countryName}`;
        } else if (data.locality) {
            location.value = data.locality;
        }
    } catch (error) {
        console.warn('Reverse geocoding failed:', error);
    }
}

function submit() {
    router.post(route('onboarding.saveStore'), {
        name: name.value,
        type: type.value,
        location: location.value,
        latitude: latitude.value,
        longitude: longitude.value,
    });
}

// Handle click outside dropdown
function handleClickOutside(event) {
    if (!event.target.closest('.store-type-dropdown')) {
        showTypeDropdown.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            <!-- Progress Bar -->
            <div class="bg-gray-50 px-8 py-6">
                <div class="flex items-center justify-between mb-4">
                    <h1 class="text-2xl font-bold text-gray-900">Set Up Your Store</h1>
                    <span class="text-sm text-gray-500">Step {{ currentStep }} of {{ totalSteps }}</span>
                </div>
                
                <!-- Progress Bar -->
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                        :style="{ width: progress + '%' }"
                    ></div>
                </div>
                
                <!-- Step Labels -->
                <div class="flex justify-between mt-4 text-xs">
                    <span :class="currentStep >= 1 ? 'text-indigo-600 font-medium' : 'text-gray-400'">Store Name</span>
                    <span :class="currentStep >= 2 ? 'text-indigo-600 font-medium' : 'text-gray-400'">Store Type</span>
                    <span :class="currentStep >= 3 ? 'text-indigo-600 font-medium' : 'text-gray-400'">Location</span>
                </div>
            </div>

            <div class="px-8 py-8">
                <!-- Step 1: Store Name -->
                <div v-if="currentStep === 1" class="space-y-6">
                    <div class="text-center">
                        <div class="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">What's your store name?</h2>
                        <p class="text-gray-600">Choose a memorable name that represents your business</p>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <input 
                                v-model="name" 
                                type="text" 
                                placeholder="Enter your store name" 
                                class="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors text-lg"
                                @keyup.enter="canProceedFromStep1 && nextStep()"
                                autofocus
                            />
                        </div>
                        
                        <div class="flex justify-end">
                            <button 
                                @click="nextStep"
                                :disabled="!canProceedFromStep1"
                                class="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Step 2: Store Type -->
                <div v-if="currentStep === 2" class="space-y-6">
                    <div class="text-center">
                        <div class="mx-auto w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">What type of store is it?</h2>
                        <p class="text-gray-600">Select the category that best describes your business</p>
                    </div>

                    <div class="space-y-4">
                        <div class="relative store-type-dropdown">
                            <input 
                                v-model="typeSearch" 
                                type="text" 
                                placeholder="Search for your store type..." 
                                class="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
                                @focus="showTypeDropdown = true"
                                @input="showTypeDropdown = true"
                            />
                            
                            <!-- Dropdown -->
                            <div v-if="showTypeDropdown" class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                <div v-if="filteredStoreTypes.length === 0" class="px-4 py-3 text-gray-500 text-center">
                                    No store types found
                                </div>
                                
                                <div v-for="storeType in filteredStoreTypes" :key="storeType.value">
                                    <button 
                                        @click="selectStoreType(storeType)"
                                        class="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between group transition-colors"
                                    >
                                        <div>
                                            <div class="font-medium text-gray-900">{{ storeType.label }}</div>
                                            <div class="text-sm text-gray-500">{{ storeType.category }}</div>
                                        </div>
                                        <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex justify-between">
                            <button 
                                @click="prevStep"
                                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button 
                                @click="nextStep"
                                :disabled="!canProceedFromStep2"
                                class="px-8 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Step 3: Location -->
                <div v-if="currentStep === 3" class="space-y-6">
                    <div class="text-center">
                        <div class="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">Where is your store located?</h2>
                        <p class="text-gray-600">Help customers find you by sharing your location</p>
                    </div>

                    <div class="space-y-4">
                        <!-- Location Input -->
                        <div>
                            <input 
                                v-model="location" 
                                type="text" 
                                placeholder="Enter your store address or city" 
                                class="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-lg"
                            />
                        </div>

                        <!-- Geolocation Button -->
                        <div class="text-center">
                            <button 
                                @click="getUserLocation"
                                :disabled="isGettingLocation"
                                class="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-600 rounded-xl font-medium hover:bg-green-50 disabled:opacity-50 transition-colors"
                            >
                                <svg v-if="!isGettingLocation" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                </svg>
                                <svg v-else class="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {{ isGettingLocation ? 'Getting Location...' : 'Use My Current Location' }}
                            </button>
                        </div>

                        <!-- Location Error -->
                        <div v-if="locationError" class="text-red-600 text-sm text-center">
                            {{ locationError }}
                        </div>

                        <!-- Coordinates Display -->
                        <div v-if="latitude && longitude" class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div class="flex items-center">
                                <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-green-800 font-medium">Location captured successfully!</span>
                            </div>
                            <p class="text-green-700 text-sm mt-2">
                                Coordinates: {{ latitude.toFixed(6) }}, {{ longitude.toFixed(6) }}
                            </p>
                        </div>
                        
                        <div class="flex justify-between">
                            <button 
                                @click="prevStep"
                                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button 
                                @click="submit"
                                :disabled="!canSubmit"
                                class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Complete Setup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.store-type-dropdown {
    position: relative;
}
</style>