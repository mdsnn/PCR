<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'

const step = ref(1)

const form = useForm({
  name: '',
  type: '',
  latitude: null,
  longitude: null,
})

// Progress bar
const steps = [
  { id: 1, name: 'Store Name' },
  { id: 2, name: 'Store Type' },
  { id: 3, name: 'Location' },
]

function nextStep() {
  if (step.value < 3) step.value++
}
function prevStep() {
  if (step.value > 1) step.value--
}
function submit() {
  form.post('/stores/setup')
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <!-- Progress Bar -->
    <div class="flex mb-6">
      <div v-for="s in steps" :key="s.id" class="flex-1">
        <div :class="['text-center p-2 border-b-4',
          step >= s.id ? 'border-green-500 font-bold' : 'border-gray-300']">
          {{ s.name }}
        </div>
      </div>
    </div>

    <!-- Step 1: Name -->
    <div v-if="step === 1">
      <label class="block mb-2 font-bold">Store Name</label>
      <input v-model="form.name" type="text" class="w-full border p-2 rounded" />
      <button @click="nextStep" class="mt-4 bg-green-500 text-white px-4 py-2 rounded">Next</button>
    </div>

    <!-- Step 2: Type -->
    <div v-if="step === 2">
      <label class="block mb-2 font-bold">Store Type</label>
      <input v-model="form.type" type="text" list="store-types" class="w-full border p-2 rounded" />
      <datalist id="store-types">
        <option value="farm" />
        <option value="poultry" />
        <option value="bakery" />
        <option value="grocery" />
        <option value="restaurant" />
        <option value="coffee" />
      </datalist>
      <div class="flex justify-between mt-4">
        <button @click="prevStep" class="bg-gray-300 px-4 py-2 rounded">Back</button>
        <button @click="nextStep" class="bg-green-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>

    <!-- Step 3: Location -->
    <div v-if="step === 3">
      <label class="block mb-2 font-bold">Select Location</label>
      <div id="map" class="h-64 w-full rounded border"></div>
      <div class="mt-4 flex justify-between">
        <button @click="prevStep" class="bg-gray-300 px-4 py-2 rounded">Back</button>
        <button @click="submit" class="bg-green-500 text-white px-4 py-2 rounded">Finish</button>
      </div>
    </div>
  </div>
</template>
