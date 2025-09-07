<script setup>
import { router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';

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

// Store types
const storeTypes = [
    { value: 'farm', label: 'Farm Store', icon: '🌾' },
    { value: 'poultry', label: 'Poultry', icon: '🐔' },
    { value: 'dairy', label: 'Dairy Farm', icon: '🥛' },
    { value: 'livestock', label: 'Livestock', icon: '🐄' },
    { value: 'bakery', label: 'Bakery', icon: '🍞' },
    { value: 'grocery', label: 'Food Grocer', icon: '🛒' },
    { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { value: 'coffee', label: 'Coffee Shop', icon: '☕' },
    { value: 'butcher', label: 'Butcher Shop', icon: '🥩' },
    { value: 'clothing', label: 'Clothing Store', icon: '👕' },
    { value: 'electronics', label: 'Electronics', icon: '📱' },
    { value: 'pharmacy', label: 'Pharmacy', icon: '💊' },
];

// Geolocation state
const isGettingLocation = ref(false);
const locationError = ref('');

// Progress calculation
const progress = computed(() => (currentStep.value / totalSteps) * 100);

// Step validation
const canProceed = computed(() => {
    switch (currentStep.value) {
        case 1: return name.value.trim().length >= 2;
        case 2: return type.value.length > 0;
        case 3: return location.value.trim().length >= 3;
        case 4: return true; // Logo is optional
        default: return false;
    }
});

// Navigation
function nextStep() {
    if (currentStep.value < totalSteps && canProceed.value) {
        currentStep.value++;
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

// Logo handling
function handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) {
        alert('Please select an image file under 2MB');
        return;
    }

    logo.value = file;
    const reader = new FileReader();
    reader.onload = (e) => logoPreview.value = e.target.result;
    reader.readAsDataURL(file);
}

function removeLogo() {
    logo.value = null;
    logoPreview.value = '';
}

// Geolocation
function getUserLocation() {
    if (!navigator.geolocation) return;

    isGettingLocation.value = true;
    locationError.value = '';

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            latitude.value = position.coords.latitude;
            longitude.value = position.coords.longitude;
            isGettingLocation.value = false;
            
            try {
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude.value}&longitude=${longitude.value}&localityLanguage=en`);
                const data = await response.json();
                location.value = data.city && data.countryName 
                    ? `${data.city}, ${data.countryName}` 
                    : `${latitude.value.toFixed(4)}, ${longitude.value.toFixed(4)}`;
            } catch {
                location.value = `${latitude.value.toFixed(4)}, ${longitude.value.toFixed(4)}`;
            }
        },
        (error) => {
            isGettingLocation.value = false;
            locationError.value = 'Could not get location. Please enter manually.';
        }
    );
}

// Form submission
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
        onSuccess: () => alert('Store setup completed!'),
        onError: () => alert('Error setting up store'),
    });
}

const stepTitles = [
    'What\'s your store name?',
    'What type of store is it?',
    'Where is your store located?',
    'Add your store logo (optional)'
];
</script>

<template>
    <div class="min-h-screen bg-gray-50 px-4 py-8 flex items-center justify-center">
        <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Progress Header -->
            <div class="bg-emerald-50 px-6 py-4 border-b">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">Set Up Your Store</h1>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm text-gray-600">Step {{ currentStep }} of {{ totalSteps }}</span>
                    <span class="text-sm font-medium text-emerald-600">{{ Math.round(progress) }}%</span>
                </div>
                
                <!-- Progress bar -->
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        class="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        :style="{ width: progress + '%' }"
                    ></div>
                </div>
            </div>

            <!-- Form Content -->
            <div class="p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ stepTitles[currentStep - 1] }}</h2>

                <!-- Step 1: Store Name -->
                <div v-if="currentStep === 1" class="space-y-4">
                    <input
                        v-model="name"
                        type="text"
                        placeholder="Enter your store name"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        @keyup.enter="canProceed && nextStep()"
                    />
                    <p class="text-sm text-gray-500">
                        {{ name.length < 2 ? 'Name must be at least 2 characters' : 'Looks good!' }}
                    </p>
                </div>

                <!-- Step 2: Store Type -->
                <div v-if="currentStep === 2" class="space-y-4">
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <button
                            v-for="storeType in storeTypes"
                            :key="storeType.value"
                            @click="type = storeType.value"
                            :class="[
                                'p-4 border-2 rounded-lg text-left transition-colors',
                                type === storeType.value 
                                    ? 'border-emerald-500 bg-emerald-50' 
                                    : 'border-gray-200 hover:border-gray-300'
                            ]"
                        >
                            <div class="text-2xl mb-2">{{ storeType.icon }}</div>
                            <div class="text-sm font-medium">{{ storeType.label }}</div>
                        </button>
                    </div>
                </div>

                <!-- Step 3: Location -->
                <div v-if="currentStep === 3" class="space-y-4">
                    <input
                        v-model="location"
                        type="text"
                        placeholder="Enter your store address or city"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    
                    <button
                        @click="getUserLocation"
                        :disabled="isGettingLocation"
                        class="flex items-center px-4 py-2 border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 disabled:opacity-50"
                    >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        </svg>
                        {{ isGettingLocation ? 'Getting Location...' : 'Use Current Location' }}
                    </button>
                    
                    <p v-if="locationError" class="text-sm text-red-600">{{ locationError }}</p>
                    <p v-if="latitude && longitude" class="text-sm text-green-600">
                        Location captured: {{ location }}
                    </p>
                </div>

                <!-- Step 4: Logo -->
                <div v-if="currentStep === 4" class="space-y-4">
                    <div v-if="!logoPreview" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <input
                            ref="logoInput"
                            type="file"
                            accept="image/*"
                            @change="handleLogoUpload"
                            class="hidden"
                        />
                        <button
                            @click="$refs.logoInput.click()"
                            class="flex flex-col items-center"
                        >
                            <svg class="w-12 h-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p class="text-gray-600">Click to upload logo</p>
                            <p class="text-sm text-gray-400">PNG, JPG up to 2MB</p>
                        </button>
                    </div>
                    
                    <div v-if="logoPreview" class="relative">
                        <img :src="logoPreview" alt="Logo preview" class="w-32 h-32 object-contain mx-auto border rounded-lg" />
                        <button
                            @click="removeLogo"
                            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <!-- Navigation -->
                <div class="flex justify-between mt-8">
                    <button
                        v-if="currentStep > 1"
                        @click="prevStep"
                        class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        Back
                    </button>
                    
                    <div class="ml-auto">
                        <button
                            v-if="currentStep < totalSteps"
                            @click="nextStep"
                            :disabled="!canProceed"
                            class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                        </button>
                        
                        <button
                            v-if="currentStep === totalSteps"
                            @click="submit"
                            class="px-8 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold"
                        >
                            Complete Setup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>