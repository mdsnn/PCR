<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Menu Overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 lg:hidden"
      @click="sidebarOpen = false"
    >
      <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
    </div>

    <!-- Sidebar -->
    <div :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <div class="flex flex-col h-full">
        <!-- Logo and Store Info -->
        <div class="flex-shrink-0 px-4 py-6 border-b border-gray-200">
          <div class="flex items-center">
            <div class="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Store class="h-6 w-6 text-white" />
            </div>
            <div class="ml-3">
              <h1 class="text-lg font-semibold text-gray-900">{{ storeInfo.name }}</h1>
              <p class="text-sm text-gray-500">{{ storeInfo.type }}</p>
            </div>
          </div>
          <div class="mt-3 flex items-center text-sm text-gray-500">
            <MapPin class="h-4 w-4 mr-1" />
            <span class="truncate">{{ storeInfo.location }}</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="setActiveSection(item.id)"
            :class="[
              'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
              activeSection === item.id
                ? 'bg-green-100 text-green-700 border-r-2 border-green-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            ]"
          >
            <component :is="item.icon" class="mr-3 h-5 w-5 flex-shrink-0" />
            <span class="truncate">{{ item.label }}</span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lg:ml-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div class="px-4 sm:px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <!-- Mobile menu button -->
              <button 
                @click="sidebarOpen = !sidebarOpen"
                class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                <Menu class="h-6 w-6" />
              </button>
              <h1 class="ml-2 lg:ml-0 text-xl sm:text-2xl font-bold text-gray-900 truncate">{{ currentPageTitle }}</h1>
            </div>
            
            <div class="flex items-center space-x-2 sm:space-x-4">
              <!-- Search - Hidden on mobile, shown on larger screens -->
              <div class="relative hidden sm:block">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  v-model="searchQuery"
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500 w-32 sm:w-48"
                />
              </div>

              <!-- Mobile search button -->
              <button 
                @click="showMobileSearch = !showMobileSearch"
                class="sm:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                <Search class="h-5 w-5" />
              </button>

              <!-- Notifications -->
              <button class="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell class="h-5 w-5" />
                <span 
                  v-if="notifications > 0" 
                  class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {{ notifications }}
                </span>
              </button>

              <!-- Profile -->
              <div class="flex items-center space-x-3">
                <div class="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-white">SD</span>
                </div>
                <div class="hidden sm:block">
                  <p class="text-sm font-medium text-gray-900">Sweet Delights</p>
                  <p class="text-xs text-gray-500">Bakery Owner</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Search Bar -->
          <div v-if="showMobileSearch" class="mt-4 sm:hidden">
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                v-model="searchQuery"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="px-4 sm:px-6 py-6 sm:py-8">
        <!-- Dashboard Content -->
        <div v-if="activeSection === 'dashboard'" class="space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-600 truncate">Total Orders</p>
                  <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ stats.totalOrders.toLocaleString() }}</p>
                </div>
                <div class="ml-4 h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag class="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
              <div class="mt-4 flex items-center">
                <TrendingUp class="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span class="text-sm text-green-600 font-medium truncate">+12% from last month</span>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-600 truncate">Revenue</p>
                  <p class="text-xl sm:text-2xl font-bold text-gray-900">${{ stats.totalRevenue.toLocaleString() }}</p>
                </div>
                <div class="ml-4 h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign class="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
              <div class="mt-4 flex items-center">
                <TrendingUp class="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span class="text-sm text-green-600 font-medium truncate">+8% from last month</span>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-600 truncate">Customers</p>
                  <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ stats.totalCustomers.toLocaleString() }}</p>
                </div>
                <div class="ml-4 h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users class="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
              <div class="mt-4 flex items-center">
                <TrendingUp class="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span class="text-sm text-green-600 font-medium truncate">+15% from last month</span>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <div class="flex items-center justify-between">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-600 truncate">Avg Order Value</p>
                  <p class="text-xl sm:text-2xl font-bold text-gray-900">${{ stats.avgOrderValue }}</p>
                </div>
                <div class="ml-4 h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 class="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
              <div class="mt-4 flex items-center">
                <TrendingDown class="h-4 w-4 text-red-500 mr-1 flex-shrink-0" />
                <span class="text-sm text-red-600 font-medium truncate">-2% from last month</span>
              </div>
            </div>
          </div>

          <!-- Analytics Cards -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Store Performance</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Conversion Rate</span>
                  <span class="text-sm font-medium text-gray-900">{{ stats.conversionRate }}%</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Online Store Sessions</span>
                  <span class="text-sm font-medium text-gray-900">{{ stats.onlineStoreSessions.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Store Rating</span>
                  <div class="flex items-center">
                    <Star class="h-4 w-4 text-yellow-400 fill-current mr-1 flex-shrink-0" />
                    <span class="text-sm font-medium text-gray-900">{{ storeInfo.rating }} ({{ storeInfo.totalReviews }} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
              <div class="space-y-3">
                <div 
                  v-for="(product, index) in topProducts" 
                  :key="index" 
                  class="flex items-center justify-between"
                >
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">{{ product.sold }} sold • ${{ product.revenue }}</p>
                  </div>
                  <div class="ml-2 flex-shrink-0">
                    <TrendingUp v-if="product.trend === 'up'" class="h-4 w-4 text-green-500" />
                    <TrendingDown v-else class="h-4 w-4 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <button class="text-sm text-green-600 hover:text-green-700 font-medium">View all orders</button>
              </div>
            </div>

            <!-- Mobile Order Cards -->
            <div class="sm:hidden">
              <div 
                v-for="(order, index) in recentOrders" 
                :key="index" 
                class="px-4 py-4 border-b border-gray-100 last:border-b-0"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="font-medium text-gray-900">{{ order.id }}</div>
                  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', getStatusColor(order.status)]">
                    {{ order.status }}
                  </span>
                </div>
                <div class="text-sm text-gray-600 mb-1">{{ order.customer }}</div>
                <div class="text-sm text-gray-500 mb-2 truncate">{{ order.items }}</div>
                <div class="flex items-center justify-between text-sm">
                  <span class="font-medium text-gray-900">${{ order.total }}</span>
                  <span class="text-gray-500">{{ order.time }}</span>
                </div>
                <div class="flex items-center justify-end space-x-2 mt-2">
                  <button class="text-gray-400 hover:text-gray-600"><Eye class="h-4 w-4" /></button>
                  <button class="text-gray-400 hover:text-gray-600"><Edit class="h-4 w-4" /></button>
                  <button class="text-gray-400 hover:text-gray-600"><MoreVertical class="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            <!-- Desktop Table -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr 
                    v-for="(order, index) in recentOrders" 
                    :key="index" 
                    class="hover:bg-gray-50"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ order.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.customer }}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <div class="max-w-xs truncate lg:max-w-sm xl:max-w-md">{{ order.items }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${{ order.total }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', getStatusColor(order.status)]">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ order.time }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <div class="flex items-center space-x-2">
                        <button class="hover:text-gray-600"><Eye class="h-4 w-4" /></button>
                        <button class="hover:text-gray-600"><Edit class="h-4 w-4" /></button>
                        <button class="hover:text-gray-600"><MoreVertical class="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Orders Section -->
        <div v-else-if="activeSection === 'orders'" class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Orders Management</h2>
            <div class="flex items-center space-x-3">
              <button class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Filter class="h-4 w-4 mr-2" />
                Filter
              </button>
              <button class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Download class="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <p class="text-gray-600">Order processing and fulfillment interface would go here...</p>
          </div>
        </div>

        <!-- Products Section -->
        <div v-else-if="activeSection === 'products'" class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Products & Inventory</h2>
            <button class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <Plus class="h-4 w-4 mr-2" />
              Add Product
            </button>
          </div>
          <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <p class="text-gray-600">Product catalog management interface would go here...</p>
          </div>
        </div>

        <!-- Other Sections -->
        <div v-else class="space-y-6">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">{{ currentPageTitle }}</h2>
          <div class="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <p class="text-gray-600">{{ currentPageTitle }} interface would go here...</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  Megaphone, 
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  MoreVertical,
  MapPin,
  Store,
  DollarSign,
  Star,
  Filter,
  Download,
  Menu
} from 'lucide-vue-next'

// Define props (data from Laravel controller)
const props = defineProps({
  storeData: {
    type: Object,
    default: () => ({})
  },
  statsData: {
    type: Object,
    default: () => ({})
  },
  ordersData: {
    type: Array,
    default: () => []
  },
  productsData: {
    type: Array,
    default: () => []
  }
})

// Reactive state
const activeSection = ref('dashboard')
const notifications = ref(3)
const searchQuery = ref('')
const sidebarOpen = ref(false)
const showMobileSearch = ref(false)

// Sample data (replace with props when Laravel backend is ready)
const storeInfo = {
  name: "Sweet Delights Bakery",
  type: "Bakery",
  location: "Downtown Food District, City Center",
  rating: 4.8,
  totalReviews: 342
}

const stats = {
  totalOrders: 1247,
  totalRevenue: 15420,
  totalCustomers: 892,
  avgOrderValue: 28.50,
  conversionRate: 3.2,
  onlineStoreSessions: 4521
}

const recentOrders = [
  { id: "#2847", customer: "Sarah Johnson", items: "Birthday Cake, Cupcakes x12", total: 85.50, status: "Processing", time: "2 mins ago" },
  { id: "#2846", customer: "Mike Chen", items: "Bread x2, Croissants x6", total: 24.00, status: "Completed", time: "15 mins ago" },
  { id: "#2845", customer: "Emma Wilson", items: "Wedding Cake (Custom)", total: 350.00, status: "Pending", time: "1 hour ago" },
  { id: "#2844", customer: "David Brown", items: "Donuts x12, Coffee", total: 18.50, status: "Shipped", time: "2 hours ago" }
]

const topProducts = [
  { name: "Chocolate Chip Cookies", sold: 234, revenue: 1170, trend: "up" },
  { name: "Artisan Sourdough Bread", sold: 189, revenue: 945, trend: "up" },
  { name: "Red Velvet Cupcakes", sold: 156, revenue: 624, trend: "down" },
  { name: "Cinnamon Rolls", sold: 143, revenue: 429, trend: "up" }
]

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'products', label: 'Products & Inventory', icon: Package },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { id: 'marketing', label: 'Marketing & SEO', icon: Megaphone },
  { id: 'settings', label: 'Settings', icon: Settings }
]

// Computed properties
const currentPageTitle = computed(() => {
  if (activeSection.value === 'dashboard') return 'Dashboard Overview'
  const item = menuItems.find(item => item.id === activeSection.value)
  return item ? item.label : 'Dashboard'
})

// Methods
const setActiveSection = (section) => {
  activeSection.value = section
  sidebarOpen.value = false // Close sidebar on mobile when selecting a section
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Processing': 
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Completed': 
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Pending': 
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'Shipped': 
      return 'bg-blue-100 text-blue-800 border-blue-200'
    default: 
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>