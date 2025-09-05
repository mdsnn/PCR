<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Progress Bar -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Step {{ progress.current }} of {{ progress.total }}</span>
          <span>{{ progress.percentage }}% Complete</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-orange-400 to-amber-400 h-2 rounded-full transition-all duration-300"
            :style="{ width: progress.percentage + '%' }"
          ></div>
        </div>
      </div>

      <!-- Main Card -->
      <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="bg-gradient-to-r from-orange-400 to-amber-400 px-8 py-6 text-white">
          <h1 class="text-3xl font-bold mb-2">Let's Set Up Your Profile</h1>
          <p class="text-orange-100">Tell us about yourself to personalize your food journey</p>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
          <!-- Profile Picture Upload -->
          <div class="text-center">
            <div class="relative inline-block">
              <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                <img 
                  v-if="form.profile_picture_preview" 
                  :src="form.profile_picture_preview" 
                  alt="Profile preview"
                  class="w-full h-full object-cover"
                >
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <!-- Upload Button -->
              <button 
                type="button"
                @click="$refs.profilePictureInput.click()"
                class="absolute -bottom-1 -right-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow-lg transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            <input 
              ref="profilePictureInput"
              type="file" 
              @change="handleFileUpload"
              accept="image/*"
              class="hidden"
            >
            
            <p class="text-sm text-gray-500 mt-2">
              Click the + button to upload your profile picture
            </p>
          </div>

          <!-- Username -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <div class="relative">
              <span class="absolute left-3 top-3 text-gray-400">@</span>
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="your_username"
                :class="{ 'border-red-500': errors.username }"
              >
            </div>
            <p v-if="errors.username" class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
            <p class="mt-1 text-sm text-gray-500">This will be your unique identifier on the platform</p>
          </div>

          <!-- Bio -->
          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700 mb-2">
              Tell us about yourself
            </label>
            <textarea
              id="bio"
              v-model="form.bio"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
              placeholder="I love exploring new flavors and sharing my culinary adventures..."
              :class="{ 'border-red-500': errors.bio }"
            ></textarea>
            <div class="flex justify-between mt-1">
              <p v-if="errors.bio" class="text-sm text-red-600">{{ errors.bio }}</p>
              <p class="text-sm text-gray-500 ml-auto">{{ form.bio?.length || 0 }}/500 characters</p>
            </div>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
              Where are you located?
            </label>
            <div class="relative">
              <svg class="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                id="location"
                v-model="form.location"
                type="text"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="City, Country"
                :class="{ 'border-red-500': errors.location }"
              >
            </div>
            <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-between items-center pt-6 border-t">
            <Link 
              :href="route('onboarding.start')"
              class="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              ← Back
            </Link>
            
            <button
              type="submit"
              :disabled="processing"
              class="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
  errors: Object
})

const processing = ref(false)

const form = reactive({
  username: props.user?.username || '',
  bio: props.user?.bio || '',
  location: props.user?.location || '',
  profile_picture: null,
  profile_picture_preview: null
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.profile_picture = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      form.profile_picture_preview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = () => {
  processing.value = true
  
  const formData = new FormData()
  formData.append('username', form.username)
  formData.append('bio', form.bio || '')
  formData.append('location', form.location || '')
  
  if (form.profile_picture) {
    formData.append('profile_picture', form.profile_picture)
  }

  router.post(route('onboarding.saveUserProfile'), formData, {
    onFinish: () => {
      processing.value = false
    }
  })
}
</script>