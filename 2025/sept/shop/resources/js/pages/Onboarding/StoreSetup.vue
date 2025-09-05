<script setup>
import { router } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, ref } from 'vue';

// Form data
const name = ref('');
const type = ref('');
const location = ref('');
const latitude = ref(null);
const longitude = ref(null);
const logo = ref(null);
const logoPreview = ref('');

// Multi-step form state
const currentStep = ref(1);
const totalSteps = 4;

// Store types with categories for better UX
const storeTypes = [
    { value: 'farm', label: 'Farm Store', category: 'Agriculture', icon: '🌾' },
    { value: 'poultry', label: 'Poultry', category: 'Agriculture', icon: '🐔' },
    { value: 'dairy', label: 'Dairy Farm', category: 'Agriculture', icon: '🥛' },
    { value: 'livestock', label: 'Livestock', category: 'Agriculture', icon: '🐄' },
    { value: 'bakery', label: 'Bakery', category: 'Food & Beverage', icon: '🍞' },
    { value: 'grocery', label: 'Food Grocer', category: 'Food & Beverage', icon: '🛒' },
    { value: 'restaurant', label: 'Restaurant', category: 'Food & Beverage', icon: '🍽️' },
    { value: 'coffee', label: 'Coffee Shop', category: 'Food & Beverage', icon: '☕' },
    { value: 'butcher', label: 'Butcher Shop', category: 'Food & Beverage', icon: '🥩' },
    { value: 'seafood', label: 'Seafood Market', category: 'Food & Beverage', icon: '🐟' },
    { value: 'spice', label: 'Spice Shop', category: 'Food & Beverage', icon: '🌶️' },
    { value: 'clothing', label: 'Clothing Store', category: 'Retail', icon: '👕' },
    { value: 'electronics', label: 'Electronics', category: 'Retail', icon: '📱' },
    { value: 'bookstore', label: 'Bookstore', category: 'Retail', icon: '📚' },
    { value: 'pharmacy', label: 'Pharmacy', category: 'Health & Wellness', icon: '💊' },
    { value: 'beauty', label: 'Beauty Salon', category: 'Health & Wellness', icon: '💄' },
    { value: 'fitness', label: 'Fitness Center', category: 'Health & Wellness', icon: '💪' },
];

// Search and filtering for store types
const typeSearch = ref('');
const showTypeDropdown = ref(false);
const selectedStoreType = ref(null);

const filteredStoreTypes = computed(() => {
    if (!typeSearch.value) return storeTypes;
    return storeTypes.filter(
        (store) =>
            store.label.toLowerCase().includes(typeSearch.value.toLowerCase()) ||
            store.category.toLowerCase().includes(typeSearch.value.toLowerCase()),
    );
});

// Group store types by category for better display
const groupedStoreTypes = computed(() => {
    const groups = {};
    filteredStoreTypes.value.forEach((store) => {
        if (!groups[store.category]) {
            groups[store.category] = [];
        }
        groups[store.category].push(store);
    });
    return groups;
});

// Geolocation state
const isGettingLocation = ref(false);
const locationError = ref('');
const locationSuccess = ref(false);

// Progress calculation
const progress = computed(() => {
    return (currentStep.value / totalSteps) * 100;
});

// Step validation
const canProceedFromStep1 = computed(() => name.value.trim().length >= 2);
const canProceedFromStep2 = computed(() => type.value.length > 0);
const canProceedFromStep3 = computed(() => location.value.trim().length >= 3);
const canSubmit = computed(() => true); // Logo is optional

// Animation states
const isAnimating = ref(false);

function nextStep() {
    if (currentStep.value < totalSteps && !isAnimating.value) {
        isAnimating.value = true;
        setTimeout(() => {
            currentStep.value++;
            if (currentStep.value === 3) {
                setTimeout(() => getUserLocation(), 300);
            }
            isAnimating.value = false;
        }, 150);
    }
}

function prevStep() {
    if (currentStep.value > 1 && !isAnimating.value) {
        isAnimating.value = true;
        setTimeout(() => {
            currentStep.value--;
            isAnimating.value = false;
        }, 150);
    }
}

function selectStoreType(storeType) {
    type.value = storeType.value;
    selectedStoreType.value = storeType;
    typeSearch.value = storeType.label;
    showTypeDropdown.value = false;
}

// Logo handling functions
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('Please select an image file', 'error');
            return;
        }

        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
            showNotification('Image size must be less than 2MB', 'error');
            return;
        }

        logo.value = file;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            logoPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function removeLogo() {
    logo.value = null;
    logoPreview.value = '';
    const fileInput = document.querySelector('#logo-upload');
    if (fileInput) fileInput.value = '';
}

function getUserLocation() {
    if (!navigator.geolocation) {
        locationError.value = 'Geolocation is not supported by this browser.';
        return;
    }

    isGettingLocation.value = true;
    locationError.value = '';
    locationSuccess.value = false;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            latitude.value = position.coords.latitude;
            longitude.value = position.coords.longitude;
            isGettingLocation.value = false;
            locationSuccess.value = true;
            reverseGeocode(latitude.value, longitude.value);
        },
        (error) => {
            isGettingLocation.value = false;
            locationSuccess.value = false;
            switch (error.code) {
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
        },
    );
}

async function reverseGeocode(lat, lng) {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
        const data = await response.json();

        if (data.city && data.countryName) {
            location.value = `${data.city}, ${data.countryName}`;
        } else if (data.locality) {
            location.value = data.locality;
        } else {
            location.value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
    } catch (error) {
        console.warn('Reverse geocoding failed:', error);
        location.value = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
}

// Notification system
const notification = ref({ show: false, message: '', type: 'success' });

function showNotification(message, type = 'success') {
    notification.value = { show: true, message, type };
    setTimeout(() => {
        notification.value.show = false;
    }, 3000);
}

function submit() {
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('type', type.value);
    formData.append('location', location.value);
    if (latitude.value) formData.append('latitude', latitude.value);
    if (longitude.value) formData.append('longitude', longitude.value);
    if (logo.value) formData.append('logo', logo.value);

    router.post(route('onboarding.saveStore'), formData, {
        forceFormData: true,
        onSuccess: () => showNotification('Store setup completed successfully!'),
        onError: () => showNotification('There was an error setting up your store.', 'error'),
    });
}

function handleClickOutside(event) {
    if (!event.target.closest('.store-type-dropdown')) {
        showTypeDropdown.value = false;
    }
}

// Keyboard navigation
function handleKeydown(event) {
    if (event.key === 'Escape') {
        showTypeDropdown.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-8">
        <!-- Notification Toast -->
        <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform opacity-0 translate-y-2"
            enter-to-class="transform opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 translate-y-2"
        >
            <div
                v-if="notification.show"
                :class="[
                    'fixed top-4 right-4 z-50 rounded-xl border px-6 py-4 shadow-lg',
                    notification.type === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-green-200 bg-green-50 text-green-800',
                ]"
            >
                <div class="flex items-center">
                    <svg v-if="notification.type === 'success'" class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <svg v-else class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    {{ notification.message }}
                </div>
            </div>
        </Transition>

        <div class="w-full max-w-2xl">
            <div class="overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-sm">
                <!-- Progress Header -->
                <div class="border-b border-emerald-100/50 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-8 py-6">
                    <div class="mb-6 flex items-center justify-between">
                        <div>
                            <h1 class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent">
                                Set Up Your Store
                            </h1>
                            <p class="mt-1 text-gray-600">Create your business profile in just a few steps</p>
                        </div>
                        <div class="text-right">
                            <span class="block text-sm text-gray-500">Step {{ currentStep }} of {{ totalSteps }}</span>
                            <span class="text-xs font-medium text-emerald-600">{{ Math.round(progress) }}% complete</span>
                        </div>
                    </div>

                    <!-- Enhanced Progress Bar -->
                    <div class="relative">
                        <div class="h-3 w-full overflow-hidden rounded-full bg-gray-200/60">
                            <div
                                class="relative h-3 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700 ease-out"
                                :style="{ width: progress + '%' }"
                            >
                                <div class="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                            </div>
                        </div>

                        <!-- Step indicators -->
                        <div class="mt-4 flex justify-between">
                            <div v-for="step in totalSteps" :key="step" class="flex flex-col items-center">
                                <div
                                    :class="[
                                        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300',
                                        currentStep >= step
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                                            : 'bg-gray-200 text-gray-400',
                                    ]"
                                >
                                    <svg v-if="currentStep > step" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <span v-else>{{ step }}</span>
                                </div>
                                <span
                                    :class="[
                                        'mt-2 text-xs font-medium transition-colors duration-300',
                                        currentStep >= step ? 'text-emerald-600' : 'text-gray-400',
                                    ]"
                                >
                                    {{ ['Store Name', 'Store Type', 'Location', 'Logo'][step - 1] }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Content -->
                <div class="px-8 py-8">
                    <Transition
                        mode="out-in"
                        enter-active-class="transition ease-out duration-300"
                        enter-from-class="transform opacity-0 translate-x-4"
                        enter-to-class="transform opacity-100 translate-x-0"
                        leave-active-class="transition ease-in duration-200"
                        leave-from-class="transform opacity-100 translate-x-0"
                        leave-to-class="transform opacity-0 -translate-x-4"
                    >
                        <!-- Single wrapper div with dynamic key -->
                        <div :key="currentStep">
                            <!-- Step 1: Store Name -->
                            <div v-if="currentStep === 1" key="step1" class="space-y-8">
                                <div class="text-center">
                                    <div
                                        class="mx-auto mb-6 flex h-24 w-24 transform items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 transition-transform duration-300 hover:scale-105"
                                    >
                                        <svg class="h-12 w-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h2 class="mb-3 text-3xl font-bold text-gray-900">What's your store name?</h2>
                                    <p class="text-lg text-gray-600">Choose a memorable name that represents your business</p>
                                </div>

                                <div class="space-y-6">
                                    <div class="relative">
                                        <input
                                            v-model="name"
                                            type="text"
                                            placeholder="Enter your store name"
                                            class="w-full rounded-2xl border-2 border-gray-300 bg-white/50 px-6 py-5 text-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/70 focus:border-emerald-500 focus:outline-none"
                                            @keyup.enter="canProceedFromStep1 && nextStep()"
                                            autofocus
                                        />
                                        <div v-if="name.length > 0" class="absolute top-1/2 right-4 -translate-y-1/2 transform">
                                            <div
                                                :class="[
                                                    'flex h-6 w-6 items-center justify-center rounded-full',
                                                    canProceedFromStep1 ? 'bg-emerald-500' : 'bg-yellow-500',
                                                ]"
                                            >
                                                <svg v-if="canProceedFromStep1" class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                                <svg v-else class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="text-center">
                                        <p class="mb-6 text-sm text-gray-500">
                                            {{ name.length < 2 ? 'Name must be at least 2 characters long' : 'Great! Your store name looks good.' }}
                                        </p>
                                    </div>

                                    <div class="flex justify-end">
                                        <button
                                            @click="nextStep"
                                            :disabled="!canProceedFromStep1 || isAnimating"
                                            class="transform rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                        >
                                            Continue
                                            <svg class="ml-2 inline h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Step 2: Store Type -->
                            <div v-if="currentStep === 2" key="step2" class="space-y-8">
                                <div class="text-center">
                                    <div
                                        class="mx-auto mb-6 flex h-24 w-24 transform items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 transition-transform duration-300 hover:scale-105"
                                    >
                                        <span class="text-3xl">{{ selectedStoreType?.icon || '🏪' }}</span>
                                    </div>
                                    <h2 class="mb-3 text-3xl font-bold text-gray-900">What type of store is it?</h2>
                                    <p class="text-lg text-gray-600">Select the category that best describes your business</p>
                                </div>

                                <div class="space-y-6">
                                    <div class="store-type-dropdown relative">
                                        <div class="relative">
                                            <input
                                                v-model="typeSearch"
                                                type="text"
                                                placeholder="Search for your store type..."
                                                class="w-full rounded-2xl border-2 border-gray-300 bg-white/50 px-6 py-5 pr-12 text-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/70 focus:border-emerald-500 focus:outline-none"
                                                @focus="showTypeDropdown = true"
                                                @input="showTypeDropdown = true"
                                            />
                                            <svg
                                                class="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 transform text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                ></path>
                                            </svg>
                                        </div>

                                        <!-- Enhanced Dropdown -->
                                        <Transition
                                            enter-active-class="transition ease-out duration-200"
                                            enter-from-class="transform opacity-0 scale-95"
                                            enter-to-class="transform opacity-100 scale-100"
                                            leave-active-class="transition ease-in duration-150"
                                            leave-from-class="transform opacity-100 scale-100"
                                            leave-to-class="transform opacity-0 scale-95"
                                        >
                                            <div
                                                v-if="showTypeDropdown"
                                                class="absolute z-10 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-gray-200/60 bg-white/95 shadow-2xl backdrop-blur-md"
                                            >
                                                <div v-if="Object.keys(groupedStoreTypes).length === 0" class="px-6 py-4 text-center text-gray-500">
                                                    No store types found
                                                </div>

                                                <div
                                                    v-for="(stores, category) in groupedStoreTypes"
                                                    :key="category"
                                                    class="border-b border-gray-100/60 last:border-b-0"
                                                >
                                                    <div class="sticky top-0 bg-gray-50/60 px-4 py-2">
                                                        <h3 class="text-sm font-semibold text-gray-700">{{ category }}</h3>
                                                    </div>
                                                    <div v-for="storeType in stores" :key="storeType.value">
                                                        <button
                                                            @click="selectStoreType(storeType)"
                                                            class="group flex w-full items-center justify-between px-4 py-4 text-left transition-all duration-200 hover:translate-x-1 hover:bg-emerald-50/80"
                                                        >
                                                            <div class="flex items-center">
                                                                <span class="mr-3 text-2xl">{{ storeType.icon }}</span>
                                                                <div>
                                                                    <div class="font-medium text-gray-900">{{ storeType.label }}</div>
                                                                </div>
                                                            </div>
                                                            <svg
                                                                class="h-5 w-5 text-gray-400 transition-colors group-hover:text-emerald-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M9 5l7 7-7 7"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Transition>
                                    </div>

                                    <!-- Selected type display -->
                                    <div v-if="selectedStoreType" class="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-4">
                                        <div class="flex items-center">
                                            <span class="mr-3 text-2xl">{{ selectedStoreType.icon }}</span>
                                            <div>
                                                <div class="font-semibold text-emerald-900">{{ selectedStoreType.label }}</div>
                                                <div class="text-sm text-emerald-700">{{ selectedStoreType.category }}</div>
                                            </div>
                                            <svg class="ml-auto h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="flex justify-between">
                                        <button
                                            @click="prevStep"
                                            :disabled="isAnimating"
                                            class="rounded-2xl border-2 border-gray-300 px-6 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <svg class="mr-2 inline h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                                                ></path>
                                            </svg>
                                            Back
                                        </button>
                                        <button
                                            @click="nextStep"
                                            :disabled="!canProceedFromStep2 || isAnimating"
                                            class="transform rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                        >
                                            Continue
                                            <svg class="ml-2 inline h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Step 3: Location -->
                            <div v-if="currentStep === 3" key="step3" class="space-y-8">
                                <div class="text-center">
                                    <div
                                        class="mx-auto mb-6 flex h-24 w-24 transform items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 transition-transform duration-300 hover:scale-105"
                                    >
                                        <svg class="h-12 w-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            ></path>
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h2 class="mb-3 text-3xl font-bold text-gray-900">Where is your store located?</h2>
                                    <p class="text-lg text-gray-600">Help customers find you by sharing your location</p>
                                </div>

                                <div class="space-y-6">
                                    <!-- Location Input -->
                                    <div class="relative">
                                        <input
                                            v-model="location"
                                            type="text"
                                            placeholder="Enter your store address or city"
                                            class="w-full rounded-2xl border-2 border-gray-300 bg-white/50 px-6 py-5 text-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/70 focus:border-emerald-500 focus:outline-none"
                                        />
                                        <div v-if="location.length > 0" class="absolute top-1/2 right-4 -translate-y-1/2 transform">
                                            <div
                                                :class="[
                                                    'flex h-6 w-6 items-center justify-center rounded-full',
                                                    canProceedFromStep3 ? 'bg-emerald-500' : 'bg-yellow-500',
                                                ]"
                                            >
                                                <svg v-if="canProceedFromStep3" class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                                <svg v-else class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Geolocation Button -->
                                    <div class="text-center">
                                        <button
                                            @click="getUserLocation"
                                            :disabled="isGettingLocation"
                                            class="inline-flex transform items-center rounded-2xl border-2 border-emerald-500 px-8 py-4 font-semibold text-emerald-600 transition-all duration-300 hover:scale-105 hover:bg-emerald-50 disabled:opacity-50 disabled:hover:scale-100"
                                        >
                                            <svg v-if="!isGettingLocation" class="mr-3 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                ></path>
                                            </svg>
                                            <div v-else class="relative mr-3 h-6 w-6">
                                                <div class="h-6 w-6 animate-spin rounded-full border-b-2 border-emerald-600"></div>
                                            </div>
                                            {{ isGettingLocation ? 'Getting Location...' : 'Use My Current Location' }}
                                        </button>
                                    </div>

                                    <!-- Location Status Messages -->
                                    <Transition
                                        enter-active-class="transition ease-out duration-300"
                                        enter-from-class="transform opacity-0 translate-y-2"
                                        enter-to-class="transform opacity-100 translate-y-0"
                                        leave-active-class="transition ease-in duration-200"
                                        leave-from-class="transform opacity-100 translate-y-0"
                                        leave-to-class="transform opacity-0 translate-y-2"
                                    >
                                        <div
                                            v-if="locationError"
                                            class="rounded-2xl border border-red-200/60 bg-red-50/80 p-4 text-center backdrop-blur-sm"
                                        >
                                            <div class="mb-2 flex items-center justify-center">
                                                <svg class="mr-2 h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                                <span class="font-semibold text-red-800">Location Error</span>
                                            </div>
                                            <p class="text-red-700">{{ locationError }}</p>
                                        </div>
                                    </Transition>

                                    <Transition
                                        enter-active-class="transition ease-out duration-300"
                                        enter-from-class="transform opacity-0 translate-y-2"
                                        enter-to-class="transform opacity-100 translate-y-0"
                                        leave-active-class="transition ease-in duration-200"
                                        leave-from-class="transform opacity-100 translate-y-0"
                                        leave-to-class="transform opacity-0 translate-y-2"
                                    >
                                        <div
                                            v-if="locationSuccess && latitude && longitude"
                                            class="rounded-2xl border border-emerald-200/60 bg-emerald-50/80 p-6 backdrop-blur-sm"
                                        >
                                            <div class="mb-3 flex items-center justify-center">
                                                <div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
                                                    <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 class="text-lg font-bold text-emerald-900">Location captured successfully!</h3>
                                                    <p class="text-emerald-700">We've found your precise location</p>
                                                </div>
                                            </div>
                                            <div class="rounded-xl bg-white/60 p-4 text-center">
                                                <p class="font-medium text-emerald-800">{{ location }}</p>
                                                <p class="mt-1 text-sm text-emerald-600">{{ latitude.toFixed(6) }}, {{ longitude.toFixed(6) }}</p>
                                            </div>
                                        </div>
                                    </Transition>

                                    <div class="flex justify-between">
                                        <button
                                            @click="prevStep"
                                            :disabled="isAnimating"
                                            class="rounded-2xl border-2 border-gray-300 px-6 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <svg class="mr-2 inline h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                                                ></path>
                                            </svg>
                                            Back
                                        </button>
                                        <button
                                            @click="nextStep"
                                            :disabled="!canProceedFromStep3 || isAnimating"
                                            class="transform rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                        >
                                            Continue
                                            <svg class="ml-2 inline h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Step 4: Logo -->
                            <div v-if="currentStep === 4" key="step4" class="space-y-8">
                                <div class="text-center">
                                    <div
                                        class="mx-auto mb-6 flex h-24 w-24 transform items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 transition-transform duration-300 hover:scale-105"
                                    >
                                        <svg class="h-12 w-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h2 class="mb-3 text-3xl font-bold text-gray-900">Add your store logo</h2>
                                    <p class="text-lg text-gray-600">
                                        Upload a logo to help customers recognize your brand
                                        <span class="font-medium text-emerald-600">(optional)</span>
                                    </p>
                                </div>

                                <div class="space-y-8">
                                    <!-- Logo Upload Area -->
                                    <div class="flex justify-center">
                                        <div class="w-full max-w-md">
                                            <div
                                                v-if="!logoPreview"
                                                class="group cursor-pointer rounded-3xl border-3 border-dashed border-gray-300 bg-gradient-to-br from-gray-50/50 to-gray-100/50 p-12 text-center transition-all duration-300 hover:border-emerald-400 hover:from-emerald-50/50 hover:to-teal-50/50"
                                                @click="$refs.logoInput.click()"
                                                @dragover.prevent="$event.currentTarget.classList.add('border-emerald-500', 'bg-emerald-50')"
                                                @dragleave.prevent="$event.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50')"
                                                @drop.prevent="handleLogoDrop"
                                            >
                                                <div class="transform transition-transform duration-300 group-hover:scale-110">
                                                    <svg
                                                        class="mx-auto h-16 w-16 text-gray-400 transition-colors group-hover:text-emerald-500"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div class="mt-6">
                                                    <p class="text-lg font-semibold text-gray-700 transition-colors group-hover:text-emerald-700">
                                                        Click to upload or drag and drop
                                                    </p>
                                                    <p class="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 2MB</p>
                                                </div>
                                            </div>

                                            <!-- Logo Preview -->
                                            <Transition
                                                enter-active-class="transition ease-out duration-300"
                                                enter-from-class="transform opacity-0 scale-95"
                                                enter-to-class="transform opacity-100 scale-100"
                                                leave-active-class="transition ease-in duration-200"
                                                leave-from-class="transform opacity-100 scale-100"
                                                leave-to-class="transform opacity-0 scale-95"
                                            >
                                                <div v-if="logoPreview" class="group relative">
                                                    <div
                                                        class="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100"
                                                    >
                                                        <img
                                                            :src="logoPreview"
                                                            alt="Logo preview"
                                                            class="max-h-full max-w-full rounded-2xl object-contain shadow-lg"
                                                        />
                                                        <div
                                                            class="absolute inset-0 rounded-3xl bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
                                                        ></div>
                                                    </div>

                                                    <!-- Remove and Change buttons -->
                                                    <div class="absolute -top-3 -right-3 flex space-x-2">
                                                        <button
                                                            @click="removeLogo"
                                                            class="flex h-10 w-10 transform items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-600 hover:shadow-xl"
                                                            title="Remove logo"
                                                        >
                                                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            @click="$refs.logoInput.click()"
                                                            class="flex h-10 w-10 transform items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:shadow-xl"
                                                            title="Change logo"
                                                        >
                                                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div class="mt-4 text-center">
                                                        <p class="text-sm text-gray-600">
                                                            <span class="font-medium text-emerald-600">Great choice!</span> Your logo looks perfect.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Transition>

                                            <input
                                                ref="logoInput"
                                                id="logo-upload"
                                                type="file"
                                                accept="image/*"
                                                @change="handleLogoUpload"
                                                class="hidden"
                                            />
                                        </div>
                                    </div>

                                    <!-- Skip option -->
                                    <div class="text-center">
                                        <p class="mb-2 text-sm text-gray-500">You can always add a logo later in your store settings</p>
                                    </div>

                                    <div class="flex justify-between">
                                        <button
                                            @click="prevStep"
                                            :disabled="isAnimating"
                                            class="rounded-2xl border-2 border-gray-300 px-6 py-4 font-semibold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <svg class="mr-2 inline h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                                                ></path>
                                            </svg>
                                            Back
                                        </button>
                                        <button
                                            @click="submit"
                                            :disabled="!canSubmit"
                                            class="transform rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                        >
                                            <svg class="mr-3 inline h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Complete Setup
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.store-type-dropdown {
    position: relative;
}

/* Custom scrollbar for dropdown */
.store-type-dropdown ::-webkit-scrollbar {
    width: 6px;
}

.store-type-dropdown ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.store-type-dropdown ::-webkit-scrollbar-thumb {
    background: rgba(16, 185, 129, 0.3);
    border-radius: 10px;
}

.store-type-dropdown ::-webkit-scrollbar-thumb:hover {
    background: rgba(16, 185, 129, 0.5);
}

/* Glassmorphism effect */
.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}

.backdrop-blur-md {
    backdrop-filter: blur(8px);
}

/* Enhanced animations */
@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

/* Border styles */
.border-3 {
    border-width: 3px;
}
</style>
