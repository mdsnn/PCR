<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

const step = ref(1)

const form = ref({
  allergies: [],
  dietary_restrictions: [],
})

const commonAllergies = $page.props.commonAllergies
const dietaryOptions = $page.props.dietaryOptions

const submit = () => {
  router.post(route('onboarding.saveDietaryPreferences'), form.value)
}

const toggleItem = (list, item) => {
  const i = form.value[list].indexOf(item)
  if (i > -1) form.value[list].splice(i, 1)
  else form.value[list].push(item)
}
</script>

<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-2xl font-bold text-center mb-4">Your Preferences</h1>

    <!-- Step 1: Allergies -->
    <div v-if="step === 1">
      <p class="mb-2">Any allergies? (optional)</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in commonAllergies"
          :key="item"
          @click="toggleItem('allergies', item)"
          :class="['px-3 py-1 rounded-full border', form.allergies.includes(item) ? 'bg-green-600 text-white' : '']"
        >
          {{ item }}
        </button>
      </div>
      <button @click="step++" class="mt-4 bg-green-600 text-white px-4 py-2 rounded">Next</button>
    </div>

    <!-- Step 2: Dietary Restrictions -->
    <div v-if="step === 2">
      <p class="mb-2">Dietary preferences (optional)</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in dietaryOptions"
          :key="item"
          @click="toggleItem('dietary_restrictions', item)"
          :class="['px-3 py-1 rounded-full border', form.dietary_restrictions.includes(item) ? 'bg-green-600 text-white' : '']"
        >
          {{ item }}
        </button>
      </div>
      <div class="mt-4 flex justify-between">
        <button @click="step--" class="px-4 py-2 border rounded">Back</button>
        <button @click="submit" class="bg-green-600 text-white px-4 py-2 rounded">Finish</button>
      </div>
    </div>
  </div>
</template>
