<script setup>
import { useForm } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const step = ref(1);

const form = useForm({
    name: '',
    type: '',
    latitude: null,
    longitude: null,
    step: 1,
    completed: false,
});

// Progress bar
const steps = [
    { id: 1, name: 'Store Name' },
    { id: 2, name: 'Store Type' },
    { id: 3, name: 'Location' },
];

function nextStep() {
    if (step.value < 3) {
        step.value++;
        form.step = step.value;
        saveProgress();
    }
}

function prevStep() {
    if (step.value > 1) {
        step.value--;
        form.step = step.value;
        saveProgress();
    }
}

// Save step progress to backend
function saveProgress() {
    form.post(route('onboarding.saveStoreStep'), {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => console.log('Step progress saved'),
    });
}

// Final submit
function submit() {
    form.step = 3;
    form.completed = true;
    form.post(route('onboarding.saveStoreStep'));
}

// Example: initialize map with Leaflet
onMounted(() => {
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    let marker;
    map.on('click', function (e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
        form.latitude = e.latlng.lat;
        form.longitude = e.latlng.lng;
    });
});
</script>

<template>
    <div class="mx-auto max-w-2xl">
        <!-- Progress Bar -->
        <div class="mb-6 flex">
            <div v-for="s in steps" :key="s.id" class="flex-1">
                <div :class="['border-b-4 p-2 text-center', step >= s.id ? 'border-green-500 font-bold' : 'border-gray-300']">
                    {{ s.name }}
                </div>
            </div>
        </div>

        <!-- Step 1: Name -->
        <div v-if="step === 1">
            <label class="mb-2 block font-bold">Store Name</label>
            <input v-model="form.name" type="text" class="w-full rounded border p-2" />
            <button @click="nextStep" class="mt-4 rounded bg-green-500 px-4 py-2 text-white">Next</button>
        </div>

        <!-- Step 2: Type -->
        <div v-if="step === 2">
            <label class="mb-2 block font-bold">Store Type</label>
            <input v-model="form.type" type="text" list="store-types" class="w-full rounded border p-2" />
            <datalist id="store-types">
                <option value="farm" />
                <option value="poultry" />
                <option value="bakery" />
                <option value="grocery" />
                <option value="restaurant" />
                <option value="coffee" />
            </datalist>
            <div class="mt-4 flex justify-between">
                <button @click="prevStep" class="rounded bg-gray-300 px-4 py-2">Back</button>
                <button @click="nextStep" class="rounded bg-green-500 px-4 py-2 text-white">Next</button>
            </div>
        </div>

        <!-- Step 3: Location -->
        <div v-if="step === 3">
            <label class="mb-2 block font-bold">Select Location</label>
            <div id="map" class="h-64 w-full rounded border"></div>
            <div class="mt-4 flex justify-between">
                <button @click="prevStep" class="rounded bg-gray-300 px-4 py-2">Back</button>
                <button @click="submit" class="rounded bg-green-500 px-4 py-2 text-white">Finish</button>
            </div>
        </div>
    </div>
</template>
