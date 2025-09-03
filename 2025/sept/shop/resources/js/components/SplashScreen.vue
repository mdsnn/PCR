<template>
  <div
    v-if="isVisible"
    :class="[
      'fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500',
      fadeOut ? 'opacity-0' : 'opacity-100'
    ]"
  >
    <div class="flex flex-col items-center">
      <div class="animate-pulse">
        <svg 
          width="400" 
          height="100" 
          viewBox="0 0 400 100" 
          xmlns="http://www.w3.org/2000/svg" 
          class="animate-fadeInUp"
        >
          <text
            x="200"
            y="60"
            font-family="Arial, Helvetica, sans-serif"
            font-size="32"
            font-weight="bold"
            fill="#22C55E"
            text-anchor="middle"
            letter-spacing="2px"
          >
            POTBELLY
          </text>
        </svg>
      </div>

      <!-- Loading dots animation -->
      <div class="mt-8 flex space-x-2" role="status" aria-live="polite">
        <div class="h-3 w-3 animate-bounce rounded-full bg-green-500"></div>
        <div class="h-3 w-3 animate-bounce rounded-full bg-green-500 animation-delay-100"></div>
        <div class="h-3 w-3 animate-bounce rounded-full bg-green-500 animation-delay-200"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  onComplete?: () => void
  fadeDelay?: number
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  fadeDelay: 2500,
  duration: 3000
})

const isVisible = ref(true)
const fadeOut = ref(false)

let fadeTimer: number | null = null
let completeTimer: number | null = null

onMounted(() => {
  fadeTimer = setTimeout(() => {
    fadeOut.value = true
  }, props.fadeDelay)

  completeTimer = setTimeout(() => {
    isVisible.value = false
    if (props.onComplete) {
      props.onComplete()
    }
  }, props.duration)
})

onUnmounted(() => {
  if (fadeTimer) {
    clearTimeout(fadeTimer)
  }
  if (completeTimer) {
    clearTimeout(completeTimer)
  }
})
</script>

<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}

.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}
</style>