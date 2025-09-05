<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

const step = ref(1)

const form = ref({
  name: '',
  location: '',
  profile_picture: null,
})

const submit = () => {
  router.post(route('onboarding.saveUserProfile'), form.value)
}

const next = () => step.value++
const back = () => step.value--
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold text-center mb-4">Complete Your Profile</h1>

    <!-- Step 1: Name -->
    <div v-if="step === 1">
      <label class="block mb-2">Name</label>
      <input v-model="form.name" type="text" class="w-full border rounded p-2" />
      <button @click="next" class="mt-4 bg-green-600 text-white px-4 py-2 rounded">Next</button>
    </div>

    <!-- Step 2: Location -->
    <div v-if="step === 2">
      <label class="block mb-2">Location (optional)</label>
      <input v-model="form.location" type="text" class="w-full border rounded p-2" />
      <div class="mt-4 flex justify-between">
        <button @click="back" class="px-4 py-2 border rounded">Back</button>
        <button @click="next" class="bg-green-600 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>

    <!-- Step 3: Profile Picture -->
    <div v-if="step === 3">
      <label class="block mb-2">Profile Picture (optional)</label>
      <input type="file" @change="e => form.profile_picture = e.target.files[0]" />
      <div class="mt-4 flex justify-between">
        <button @click="back" class="px-4 py-2 border rounded">Back</button>
        <button @click="submit" class="bg-green-600 text-white px-4 py-2 rounded">Finish</button>
      </div>
    </div>
  </div>
</template>
