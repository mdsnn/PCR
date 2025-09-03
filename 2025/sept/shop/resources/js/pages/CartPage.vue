<template>
  <div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-green-50">
    <!-- Header -->
    <header class="sticky top-0 z-10 border-b border-gray-200/60 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <h1 class="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-2xl font-bold text-transparent">
          POTBELLY
        </h1>

        <!-- Discovery Bar -->
        <div class="mx-6 hidden max-w-lg flex-1 md:flex">
          <div class="relative w-full">
            <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Discover fresh markets, stores, and recipes..."
              class="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none"
            />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <button class="relative rounded-full p-2 transition-colors hover:bg-green-50">
            <Bell class="h-5 w-5 text-gray-600" />
            <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </button>
          <div class="h-8 w-8 cursor-pointer rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
        </div>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="mx-auto flex max-w-7xl flex-1">
      <!-- Left Sidebar -->
      <aside class="hidden w-64 p-4 lg:block">
        <nav class="sticky top-20 space-y-3">
          <Link
            href="/"
            class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
          >
            <Home class="h-6 w-6" />
            <span>Home</span>
          </Link>
          <Link
            href="/mapview"
            class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
          >
            <Map class="h-6 w-6" />
            <span>Mapview</span>
          </Link>
          <Link
            href="/cart"
            class="flex items-center space-x-3 rounded-xl bg-green-500 px-4 py-3 text-lg font-medium text-white transition-all hover:bg-green-600"
          >
            <ShoppingCart class="h-6 w-6" />
            <span>Cart</span>
          </Link>
          <Link
            href="/chats"
            class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
          >
            <MessageCircle class="h-6 w-6" />
            <span>Chats</span>
          </Link>
          <button class="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-green-600">
            Post
          </button>
        </nav>
      </aside>

      <!-- Cart Content -->
      <main class="flex-1 p-4 lg:border-r lg:border-gray-200/60">
        <div class="space-y-6">
          <!-- Page Title -->
          <div class="flex items-center justify-between">
            <h2 class="text-3xl font-bold text-gray-900">My Basket</h2>
            <span class="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {{ cartItems.length }} items
            </span>
          </div>

          <!-- Cart Items -->
          <div class="space-y-4">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm hover:shadow-md"
            >
              <div class="flex items-start space-x-4">
                <div
                  class="h-16 w-16 rounded-xl"
                  :class="item.bgClass"
                ></div>
                <div class="flex-1">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="font-semibold text-gray-900">{{ item.name }}</h3>
                      <p class="text-sm text-gray-600">From {{ item.store }}</p>
                      <div class="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin class="h-4 w-4" />
                        <span>{{ item.distance }} away</span>
                      </div>
                    </div>
                    <button 
                      @click="removeItem(item.id)"
                      class="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                  <div class="mt-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <button 
                        @click="decrementQuantity(item.id)"
                        class="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                      >
                        <Minus class="h-4 w-4" />
                      </button>
                      <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                      <button 
                        @click="incrementQuantity(item.id)"
                        class="rounded-full bg-green-100 p-2 text-green-600 hover:bg-green-200"
                      >
                        <Plus class="h-4 w-4" />
                      </button>
                    </div>
                    <span class="text-lg font-semibold text-green-600">K{{ item.price.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Right Sidebar - Order Summary -->
      <aside class="hidden w-80 p-4 lg:block">
        <div class="sticky top-20 space-y-6">
          <!-- Order Summary -->
          <div class="rounded-xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Order Summary</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">K{{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Delivery Fee</span>
                <span class="font-medium">K{{ deliveryFee.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Service Fee</span>
                <span class="font-medium">K{{ serviceFee.toFixed(2) }}</span>
              </div>
              <hr class="border-gray-200" />
              <div class="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span class="text-green-600">K{{ total.toFixed(2) }}</span>
              </div>
            </div>
            <button 
              @click="checkout"
              class="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-green-600"
            >
              Checkout
            </button>
          </div>

          <!-- Delivery Info -->
          <div class="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">🚚 Delivery Info</h3>
            <p class="text-sm text-gray-700">Estimated delivery: 45-60 mins</p>
            <p class="text-sm text-gray-700">Delivery to: Lusaka Central</p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Mobile Bottom Nav -->
    <nav class="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t border-gray-200/60 bg-white/90 py-2 shadow-lg backdrop-blur-md lg:hidden">
      <Link href="/" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
        <Home class="h-5 w-5" />
        <span class="mt-1 text-xs">Home</span>
      </Link>
      <Link href="/discover" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
        <Search class="h-5 w-5" />
        <span class="mt-1 text-xs">Discover</span>
      </Link>
      <Link href="/cart" class="relative flex flex-col items-center p-2 text-green-600">
        <ShoppingCart class="h-5 w-5" />
        <span class="mt-1 text-xs font-medium">Cart</span>
      </Link>
      <Link href="/chats" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
        <MessageCircle class="h-5 w-5" />
        <span class="mt-1 text-xs">Chats</span>
      </Link>
      <Link href="/mapview" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
        <Map class="h-5 w-5" />
        <span class="mt-1 text-xs">MapView</span>
      </Link>
    </nav>

    <!-- Floating Post Button (Mobile) -->
    <button class="fixed right-4 bottom-20 z-20 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-green-600 lg:hidden">
      <Plus class="mx-auto h-6 w-6" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { 
  Bell, 
  Home, 
  Map, 
  MapPin, 
  MessageCircle, 
  Minus, 
  Plus, 
  Search, 
  ShoppingCart, 
  Trash2 
} from 'lucide-vue-next'

// Props (if you need to pass data from Laravel)
const props = defineProps({
  initialCartItems: {
    type: Array,
    default: () => []
  }
})

// Reactive data
const cartItems = ref([
  {
    id: 1,
    name: 'Fresh Tomatoes',
    store: 'Kalundu Fresh Market',
    distance: '1.2km',
    quantity: 2,
    price: 25.00,
    bgClass: 'bg-gradient-to-r from-orange-400 to-red-500'
  },
  {
    id: 2,
    name: 'Organic Spinach',
    store: 'UNC Joe Veggies',
    distance: '2.1km',
    quantity: 1,
    price: 15.00,
    bgClass: 'bg-gradient-to-r from-green-400 to-blue-500'
  },
  {
    id: 3,
    name: 'Fresh Bread',
    store: "Anna's Food Truck",
    distance: '0.8km',
    quantity: 3,
    price: 30.00,
    bgClass: 'bg-gradient-to-r from-yellow-400 to-orange-500'
  }
])

const deliveryFee = ref(5.00)
const serviceFee = ref(2.00)

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const total = computed(() => {
  return subtotal.value + deliveryFee.value + serviceFee.value
})

// Methods
const incrementQuantity = (itemId) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity++
  }
}

const decrementQuantity = (itemId) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item && item.quantity > 1) {
    item.quantity--
  }
}

const removeItem = (itemId) => {
  const index = cartItems.value.findIndex(item => item.id === itemId)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const checkout = () => {
  // Handle checkout logic
  console.log('Proceeding to checkout...')
  // You can use Inertia.visit() to navigate to checkout page
  // Inertia.visit('/checkout')
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>