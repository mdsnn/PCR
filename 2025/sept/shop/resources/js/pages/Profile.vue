<template>
    <div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-green-50">
        <!-- Header -->
        <header class="sticky top-0 z-10 border-b border-gray-200/60 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
            <div class="mx-auto flex max-w-7xl items-center justify-between">
                <h1 class="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-2xl font-bold text-transparent">POTBELLY</h1>

                <!-- Discovery Bar -->
                <div class="mx-6 hidden max-w-lg flex-1 md:flex">
                    <div class="relative w-full">
                        <SearchIcon class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Discover fresh markets, stores, and recipes..."
                            class="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                            v-model="searchQuery"
                        />
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center space-x-4">
                    <button class="relative rounded-full p-2 transition-colors hover:bg-green-50" @click="showNotifications">
                        <BellIcon class="h-5 w-5 text-gray-600" />
                        <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            3
                        </span>
                    </button>
                    <div class="h-8 w-8 cursor-pointer rounded-full bg-gradient-to-r from-green-400 to-green-600" @click="showProfile"></div>
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
                        <HomeIcon class="h-6 w-6" />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/map"
                        class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                    >
                        <MapIcon class="h-6 w-6" />
                        <span>Mapview</span>
                    </Link>
                    <Link
                        href="/cart"
                        class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                    >
                        <ShoppingCartIcon class="h-6 w-6" />
                        <span>Cart</span>
                    </Link>
                    <Link
                        href="/chats"
                        class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                    >
                        <MessageCircleIcon class="h-6 w-6" />
                        <span>Chats</span>
                    </Link>
                    <button
                        class="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-green-600"
                        @click="openPostModal"
                    >
                        Post
                    </button>
                </nav>
            </aside>

            <!-- Profile Content -->
            <main class="flex-1 p-4 lg:border-r lg:border-gray-200/60">
                <div class="space-y-6">
                    <!-- Profile Header -->
                    <div class="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
                        <div class="flex items-start space-x-6">
                            <div class="relative">
                                <div class="h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                                <button
                                    class="absolute -right-2 -bottom-2 rounded-full bg-white p-2 shadow-lg transition-all hover:scale-105"
                                    @click="editProfilePicture"
                                >
                                    <Edit3Icon class="h-4 w-4 text-gray-600" />
                                </button>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-start justify-between">
                                    <div>
                                        <h2 class="text-2xl font-bold text-gray-900">{{ user.name }}</h2>
                                        <p class="text-gray-600">@{{ user.username }}</p>
                                        <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                            <div class="flex items-center space-x-1">
                                                <MapPinIcon class="h-4 w-4" />
                                                <span>{{ user.location }}</span>
                                            </div>
                                            <div class="flex items-center space-x-1">
                                                <CalendarIcon class="h-4 w-4" />
                                                <span>Joined {{ user.joinedDate }}</span>
                                            </div>
                                        </div>
                                        <p class="mt-3 text-gray-700">
                                            {{ user.bio }}
                                        </p>
                                    </div>
                                    <button
                                        class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-green-300 hover:bg-gray-50"
                                        @click="editProfile"
                                    >
                                        <SettingsIcon class="mr-2 inline h-4 w-4" />
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Stats -->
                        <div class="mt-6 grid grid-cols-4 gap-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-900">{{ stats.posts }}</div>
                                <div class="text-sm text-gray-600">Posts</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-900">{{ stats.following }}</div>
                                <div class="text-sm text-gray-600">Following</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-gray-900">{{ stats.followers }}</div>
                                <div class="text-sm text-gray-600">Followers</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-600">{{ stats.views }}</div>
                                <div class="text-sm text-gray-600">Views (72h)</div>
                            </div>
                        </div>
                    </div>

                    <!-- Activity Tabs -->
                    <div class="rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm">
                        <div class="flex space-x-1 p-1">
                            <button
                                v-for="tab in tabs"
                                :key="tab.id"
                                :class="[
                                    'flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                                    activeTab === tab.id ? 'bg-green-500 text-white' : 'text-gray-500 hover:text-gray-700',
                                ]"
                                @click="activeTab = tab.id"
                            >
                                {{ tab.name }}
                            </button>
                        </div>
                    </div>

                    <!-- Posts Feed -->
                    <div class="space-y-4" v-if="activeTab === 'posts'">
                        <div
                            v-for="post in posts"
                            :key="post.id"
                            class="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
                        >
                            <div class="flex items-start space-x-4">
                                <div class="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                                <div class="flex-1">
                                    <div class="flex items-center space-x-2">
                                        <h3 class="font-semibold text-gray-900">{{ post.author.name }}</h3>
                                        <span class="text-sm text-gray-500">@{{ post.author.username }}</span>
                                        <span class="text-gray-400">·</span>
                                        <span class="text-sm text-gray-500">{{ post.timeAgo }}</span>
                                    </div>
                                    <p class="mt-2 leading-relaxed text-gray-800" v-html="post.content"></p>
                                    <div class="mt-2 flex space-x-2 text-sm">
                                        <span v-for="tag in post.tags" :key="tag.name" :class="['rounded-full px-3 py-1', tag.color]">
                                            {{ tag.name }}
                                        </span>
                                    </div>
                                    <div class="mt-4 flex max-w-md items-center justify-between text-gray-500">
                                        <button
                                            v-for="(reaction, index) in post.reactions"
                                            :key="index"
                                            class="flex items-center space-x-2 rounded-full px-3 py-1 transition hover:bg-green-50 hover:text-green-600"
                                            @click="toggleReaction(post.id, reaction.type)"
                                        >
                                            <span>{{ reaction.emoji }}</span>
                                            <span class="text-sm">{{ reaction.count }}</span>
                                        </button>
                                        <button class="rounded-full p-2 hover:bg-gray-50" @click="showPostOptions(post.id)">
                                            <MoreHorizontalIcon class="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Right Sidebar -->
            <aside class="hidden w-80 p-4 lg:block">
                <div class="sticky top-20 space-y-6">
                    <!-- Achievements -->
                    <div class="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                        <h3 class="mb-3 text-lg font-semibold text-gray-900">🏆 Achievements</h3>
                        <div class="space-y-3">
                            <div
                                v-for="achievement in achievements"
                                :key="achievement.id"
                                :class="['flex items-center space-x-3 rounded-lg p-3', achievement.bgColor]"
                            >
                                <div :class="['rounded-full p-2', achievement.iconBg]">
                                    <component :is="achievement.icon" class="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <div class="font-medium text-gray-900">{{ achievement.title }}</div>
                                    <div class="text-sm text-gray-600">{{ achievement.description }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                        <h3 class="mb-3 text-lg font-semibold text-gray-900">📊 Activity</h3>
                        <div class="space-y-3 text-sm">
                            <div v-for="activity in activities" :key="activity.label" class="flex items-center justify-between">
                                <span class="text-gray-600">{{ activity.label }}</span>
                                <span :class="['font-medium', activity.color]">{{ activity.value }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Favorite Markets -->
                    <div class="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                        <h3 class="mb-3 text-lg font-semibold text-gray-900">❤️ Favorites</h3>
                        <div class="space-y-2 text-sm">
                            <div v-for="favorite in favorites" :key="favorite" class="flex items-center space-x-2 text-gray-700">
                                <HeartIcon class="h-4 w-4 text-red-500" />
                                <span>{{ favorite }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>

        <!-- Mobile Bottom Nav -->
        <nav
            class="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t border-gray-200/60 bg-white/90 py-2 shadow-lg backdrop-blur-md lg:hidden"
        >
            <Link href="/" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <HomeIcon class="h-5 w-5" />
                <span class="mt-1 text-xs">Home</span>
            </Link>
            <button class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <SearchIcon class="h-5 w-5" />
                <span class="mt-1 text-xs">Discover</span>
            </button>
            <Link href="/cart" class="relative flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <ShoppingCartIcon class="h-5 w-5" />
                <span class="mt-1 text-xs">Cart</span>
            </Link>
            <Link href="/chats" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <MessageCircleIcon class="h-5 w-5" />
                <span class="mt-1 text-xs">Chats</span>
            </Link>
            <Link href="/map" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <MapIcon class="h-5 w-5" />
                <span class="mt-1 text-xs">MapView</span>
            </Link>
        </nav>

        <!-- Floating Post Button (Mobile) -->
        <button
            class="fixed right-4 bottom-20 z-20 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-green-600 lg:hidden"
            @click="openPostModal"
        >
            <PlusIcon class="mx-auto h-6 w-6" />
        </button>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import {
    Award as AwardIcon,
    Bell as BellIcon,
    Calendar as CalendarIcon,
    Edit3 as Edit3Icon,
    Heart as HeartIcon,
    Home as HomeIcon,
    Map as MapIcon,
    MapPin as MapPinIcon,
    MessageCircle as MessageCircleIcon,
    MoreHorizontal as MoreHorizontalIcon,
    Plus as PlusIcon,
    Search as SearchIcon,
    Settings as SettingsIcon,
    ShoppingCart as ShoppingCartIcon,
    Star as StarIcon,
    Users as UsersIcon,
} from 'lucide-vue-next';
import { reactive, ref } from 'vue';

// Props from Laravel controller
const props = defineProps({
    user: Object,
    posts: Array,
    stats: Object,
    achievements: Array,
    activities: Array,
    favorites: Array,
});

// Reactive data
const searchQuery = ref('');
const activeTab = ref('posts');

const tabs = [
    { id: 'posts', name: 'My Posts' },
    { id: 'reviews', name: 'Reviews' },
    { id: 'orders', name: 'Orders' },
    { id: 'favorites', name: 'Favorites' },
];

// Default data structure for when props aren't provided
const user = reactive(
    props.user || {
        name: 'John Doe',
        username: 'johndoe',
        location: 'Lusaka, Zambia',
        joinedDate: 'March 2024',
        bio: '🌱 Food enthusiast | Supporting local farmers and markets | Love discovering fresh, organic produce in Lusaka',
    },
);

const stats = reactive(
    props.stats || {
        posts: 156,
        following: 342,
        followers: '1.2K',
        views: 109,
    },
);

const posts = reactive(
    props.posts || [
        {
            id: 1,
            author: { name: 'John Doe', username: 'johndoe' },
            timeAgo: '2h',
            content:
                '🌱 Fresh from the <span class="font-medium text-green-600">Lusaka Market</span>: supporting local farmers while getting the best organic produce! The tomatoes here are incredible! 🍅',
            tags: [
                { name: '#FarmersMarket', color: 'bg-green-100 text-green-700' },
                { name: '📍 Lusaka', color: 'bg-orange-100 text-orange-700' },
            ],
            reactions: [
                { emoji: '👍', count: 12, type: 'like' },
                { emoji: '❤️', count: 15, type: 'love' },
                { emoji: '🌱', count: 18, type: 'plant' },
                { emoji: '🍲', count: 21, type: 'food' },
            ],
        },
        {
            id: 2,
            author: { name: 'John Doe', username: 'johndoe' },
            timeAgo: '1d',
            content:
                'Just tried the most amazing fresh bread from <span class="font-medium text-orange-600">Anna\'s Food Truck</span>! 🍞 The quality and taste are unmatched. Highly recommend supporting this local business!',
            tags: [
                { name: '#LocalBusiness', color: 'bg-orange-100 text-orange-700' },
                { name: '#FreshBread', color: 'bg-yellow-100 text-yellow-700' },
            ],
            reactions: [
                { emoji: '👍', count: 8, type: 'like' },
                { emoji: '❤️', count: 10, type: 'love' },
                { emoji: '🍞', count: 12, type: 'bread' },
                { emoji: '😋', count: 14, type: 'yummy' },
            ],
        },
        {
            id: 3,
            author: { name: 'John Doe', username: 'johndoe' },
            timeAgo: '3d',
            content:
                'Weekend farmers market haul! 🛒 Got some incredible organic spinach from <span class="font-medium text-green-600">UNC Joe Veggies</span>. Nothing beats fresh, locally-grown vegetables! #SupportLocal',
            tags: [
                { name: '#Organic', color: 'bg-green-100 text-green-700' },
                { name: '#SupportLocal', color: 'bg-green-100 text-green-700' },
            ],
            reactions: [
                { emoji: '👍', count: 15, type: 'like' },
                { emoji: '❤️', count: 19, type: 'love' },
                { emoji: '🌱', count: 23, type: 'plant' },
                { emoji: '💚', count: 27, type: 'green_heart' },
            ],
        },
    ],
);

const achievements = reactive(
    props.achievements || [
        {
            id: 1,
            title: 'Local Supporter',
            description: '50+ local purchases',
            icon: StarIcon,
            bgColor: 'bg-green-50',
            iconBg: 'bg-green-500',
        },
        {
            id: 2,
            title: 'Top Reviewer',
            description: '100+ helpful reviews',
            icon: AwardIcon,
            bgColor: 'bg-orange-50',
            iconBg: 'bg-orange-500',
        },
        {
            id: 3,
            title: 'Community Builder',
            description: '1K+ followers',
            icon: UsersIcon,
            bgColor: 'bg-blue-50',
            iconBg: 'bg-blue-500',
        },
    ],
);

const activities = reactive(
    props.activities || [
        { label: 'Posts this month', value: '12', color: 'text-green-600' },
        { label: 'Reviews written', value: '8', color: 'text-blue-600' },
        { label: 'Markets visited', value: '15', color: 'text-orange-600' },
        { label: 'Orders completed', value: '23', color: 'text-purple-600' },
    ],
);

const favorites = reactive(props.favorites || ['Kalundu Fresh Market', "Anna's Food Truck", 'UNC Joe Veggies', 'BrewMe Coffee']);

// Methods
const showNotifications = () => {
    // Handle notifications
    console.log('Show notifications');
};

const showProfile = () => {
    // Handle profile click
    console.log('Show profile menu');
};

const openPostModal = () => {
    // Handle opening post modal
    console.log('Open post modal');
};

const editProfilePicture = () => {
    // Handle edit profile picture
    console.log('Edit profile picture');
};

const editProfile = () => {
    // Handle edit profile
    console.log('Edit profile');
};

const toggleReaction = (postId, reactionType) => {
    // Handle reaction toggle
    console.log(`Toggle reaction ${reactionType} for post ${postId}`);
};

const showPostOptions = (postId) => {
    // Handle post options
    console.log(`Show options for post ${postId}`);
};
</script>
