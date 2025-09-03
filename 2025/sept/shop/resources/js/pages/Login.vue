<template>
  <div>
    <Head title="Login" />

    <!-- Background gradient -->
    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-500 to-green-700 px-4 py-12 sm:px-6 lg:px-8">
      <!-- Floating circles -->
      <div
        v-for="(circle, index) in circles"
        :key="index"
        class="absolute rounded-full bg-white/10 backdrop-blur-xl floating-circle"
        :style="{
          width: circle.size + 'px',
          height: circle.size + 'px',
          top: circle.top,
          left: circle.left,
          right: circle.right,
          bottom: circle.bottom,
          animationDelay: circle.delay + 's'
        }"
      />

      <!-- Card -->
      <div class="relative z-10 w-full max-w-md login-card">
        <div class="rounded-2xl bg-white/20 p-8 shadow-2xl backdrop-blur-lg">
          <h2 class="mb-6 text-center text-3xl font-extrabold text-white">POTBELLY</h2>

          <!-- Success Message -->
          <div
            v-if="$page.props.flash?.success"
            class="mb-4 rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-700"
          >
            {{ $page.props.flash.success }}
          </div>

          <form class="space-y-5" @submit.prevent="handleSubmit">
            <!-- Email -->
            <div>
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                placeholder="Email address"
                required
                class="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-200 focus:border-green-400 focus:ring-green-400 focus:outline-none"
              />
              <p v-if="form.errors.email" class="mt-1 text-sm text-red-300">
                {{ form.errors.email }}
              </p>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="form.processing || !isValidEmail"
              class="submit-button flex w-full justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-medium text-white shadow-lg hover:from-green-600 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{ form.processing ? 'Sending Login Link...' : 'Send Login Link' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { Head, useForm } from '@inertiajs/vue3'
import { route } from 'ziggy-js'

// Form setup
const form = useForm({
  email: ''
})

// Floating circles data
const circles = [
  { size: 200, top: '20%', left: '10%', delay: 0 },
  { size: 300, top: '60%', right: '15%', delay: 2 },
  { size: 150, bottom: '15%', left: '25%', delay: 4 }
]

// Email validation
const isValidEmail = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
})

// Form submission
const handleSubmit = () => {
  form.post(route('magic-link.send'))
}
</script>

<style scoped>
/* Floating circles animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-30px) scale(1.05);
    opacity: 1;
  }
}

.floating-circle {
  animation: float 6s ease-in-out infinite;
}

/* Login card entrance animation */
@keyframes slideInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.login-card {
  animation: slideInUp 0.8s ease-out;
}

/* Button tap animation */
.submit-button:active {
  transform: scale(0.95);
}

.submit-button {
  transition: transform 0.1s ease;
}
</style>