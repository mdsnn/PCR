<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Progress Bar -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Step {{ progress.current }} of {{ progress.total }}</span>
          <span>{{ progress.percentage }}% Complete</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-300"
            :style="{ width: progress.percentage + '%' }"
          ></div>
        </div>
      </div>

      <!-- Main Card -->
      <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="bg-gradient-to-r from-green-400 to-emerald-400 px-8 py-6 text-white">
          <h1 class="text-3xl font-bold mb-2">Your Food Preferences</h1>
          <p class="text-green-100">Help us understand your dietary needs and taste preferences</p>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 space-y-8">
          <!-- Allergies Section -->
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg class="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Food Allergies
            </h3>
            <p class="text-gray-600 mb-4">Select any food allergies you have (this helps keep you safe!)</p>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <div 
                v-for="allergy in commonAllergies" 
                :key="allergy"
                class="relative"
              >
                <input
                  :id="`allergy-${allergy}`"
                  v-model="form.allergies"
                  :value="allergy"
                  type="checkbox"
                  class="sr-only peer"
                >
                <label
                  :for="`allergy-${allergy}`"
                  class="flex items-center justify-center p-3 text-sm font-medium text-center text-gray-700 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-red-50 hover:border-red-300 peer-checked:bg-red-100 peer-checked:border-red-500 peer-checked:text-red-700 transition-all duration-200"
                >
                  {{ allergy }}
                </label>
              </div>
            </div>
            
            <!-- Custom Allergy Input -->
            <div class="mt-4">
              <div class="flex gap-2">
                <input
                  v-model="customAllergy"
                  type="text"
                  placeholder="Add custom allergy..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  @keydown.enter.prevent="addCustomAllergy"
                >
                <button
                  type="button"
                  @click="addCustomAllergy"
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <!-- Dietary Restrictions -->
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg class="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Dietary Preferences
            </h3>
            <p class="text-gray-600 mb-4">What dietary lifestyle do you follow?</p>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <div 
                v-for="restriction in dietaryOptions" 
                :key="restriction"
                class="relative"
              >
                <input
                  :id="`restriction-${restriction}`"
                  v-model="form.dietary_restrictions"
                  :value="restriction"
                  type="checkbox"
                  class="sr-only peer"
                >
                <label
                  :for="`restriction-${restriction}`"
                  class="flex items-center justify-center p-3 text-sm font-medium text-center text-gray-700 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-300 peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-700 transition-all duration-200"
                >
                  {{ restriction }}
                </label>
              </div>
            </div>
          </div>

          <!-- Favorite Cuisines -->
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg class="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favorite Cuisines
            </h3>
            <p class="text-gray-600 mb-4">Which cuisines do you love most? (Select up to 8)</p>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <div 
                v-for="cuisine in cuisineOptions" 
                :key="cuisine"
                class="relative"
              >
                <input
                  :id="`cuisine-${cuisine}`"
                  v-model="form.favorite_cuisines"
                  :value="cuisine"
                  type="checkbox"
                  :disabled="form.favorite_cuisines.length >= 8 && !form.favorite_cuisines.includes(cuisine)"
                  class="sr-only peer"
                >
                <label
                  :for="`cuisine-${cuisine}`"
                  class="flex items-center justify-center p-3 text-sm font-medium text-center text-gray-700 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-orange-50 hover:border-orange-300 peer-checked:bg-orange-100 peer-checked:border-orange-500 peer-checked:text-orange-700 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed transition-all duration-200"
                >
                  {{ cuisine }}
                </label>
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              Selected: {{ form.favorite_cuisines.length }}/8
            </p>
          </div>

          <!-- Spice Tolerance -->
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg class="w-6 h-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              Spice Tolerance
            </h3>
            <p class="text-gray-600 mb-4">How much heat can you handle?</p>
            
            <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div 
                v-for="(label, value) in spiceOptions" 
                :key="value"
                class="relative"
              >
                <input
                  :id="`spice-${value}`"
                  v-model="form.spice_tolerance"
                  :value="value"
                  type="radio"
                  class="sr-only peer"
                >
                <label
                  :for="`spice-${value}`"
                  class="flex flex-col items-center justify-center p-4 text-sm font-medium text-center text-gray-700 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-red-50 hover:border-red-300 peer-checked:bg-red-100 peer-checked:border-red-500 peer-checked:text-red-700 transition-all duration-200"
                >
                  <div class="text-2xl mb-1">{{ getSpiceEmoji(value) }}</div>
                  {{ label }}
                </label>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-between items-center pt-6 border-t">
            <Link 
              :href="route('onboarding.userProfile')"
              class="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              ← Back
            </Link>
            
            <button
              type="submit"
              :disabled="processing"
              class="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="processing">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>Continue →</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { router } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
  user: Object,
  progress: Object,
  commonAllergies: Array,
  dietaryOptions: Array,
  cuisineOptions: Array,
  spiceOptions: Object,
  errors: Object
})

const processing = ref(false)
const customAllergy = ref('')

const form = reactive({
  allergies: props.user?.allergies || [],
  dietary_restrictions: props.user?.dietary_restrictions || [],
  favorite_cuisines: props.user?.favorite_cuisines || [],
  spice_tolerance: props.user?.spice_tolerance || null
})

const addCustomAllergy = () => {
  if (customAllergy.value.trim() && !form.allergies.includes(customAllergy.value.trim())) {
    form.allergies.push(customAllergy.value.trim())
    customAllergy.value = ''
  }
}

const getSpiceEmoji = (level) => {
  const emojis = {
    'none': '😌',
    'mild': '🌶️',
    'medium': '🌶️🌶️',
    'hot': '🌶️🌶️🌶️',
    'very_hot': '🔥🔥🔥'
  }
  return emojis[level] || '🌶️'
}

const handleSubmit = () => {
  processing.value = true
  
  router.post(route('onboarding.saveDietaryPreferences'), form, {
    onFinish: () => {
      processing.value = false
    }
  })
}
</script>