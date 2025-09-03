<template>
    <div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-green-50">
        <!-- Header -->
        <header class="sticky top-0 z-10 border-b border-gray-200/60 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
            <div class="mx-auto flex max-w-7xl items-center justify-between">
                <h1 class="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-2xl font-bold text-transparent">POTBELLY</h1>

                <!-- Discovery Bar -->
                <div class="mx-6 hidden max-w-lg flex-1 md:flex">
                    <div class="relative w-full">
                        <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search conversations..."
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
                        href="/home"
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
                        class="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                    >
                        <ShoppingCart class="h-6 w-6" />
                        <span>Cart</span>
                    </Link>
                    <Link
                        href="/chats"
                        class="flex items-center space-x-3 rounded-xl bg-green-500 px-4 py-3 text-lg font-medium text-white transition-all hover:bg-green-600"
                    >
                        <MessageCircle class="h-6 w-6" />
                        <span>Chats</span>
                    </Link>
                    <button
                        @click="createPost"
                        class="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-green-600"
                    >
                        Post
                    </button>
                </nav>
            </aside>

            <!-- Chat List -->
            <aside class="w-full p-4 lg:w-80 lg:border-r lg:border-gray-200/60">
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-bold text-gray-900">Messages</h2>
                        <button
                            @click="startNewChat"
                            class="rounded-full bg-green-500 p-2 text-white transition-all hover:scale-105 hover:bg-green-600"
                        >
                            <Plus class="h-4 w-4" />
                        </button>
                    </div>

                    <!-- Chat Items -->
                    <div class="space-y-2">
                        <!-- Active Chat -->
                        <div
                            @click="selectChat(chats[0])"
                            :class="[
                                'cursor-pointer rounded-2xl p-4 transition-all',
                                selectedChat?.id === chats[0]?.id
                                    ? 'border-2 border-green-200 bg-green-50 hover:bg-green-100'
                                    : 'border border-gray-200 bg-white/80 hover:bg-gray-50',
                            ]"
                        >
                            <div class="flex items-start space-x-3">
                                <div class="relative">
                                    <div class="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                    <div class="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <div class="flex items-center justify-between">
                                        <h3 class="font-semibold text-gray-900">Kalundu Fresh Market</h3>
                                        <span class="text-xs text-gray-500">2m</span>
                                    </div>
                                    <p class="truncate text-sm text-gray-600">Your order is ready for pickup! 🛒</p>
                                    <span class="mt-1 inline-block rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">2</span>
                                </div>
                            </div>
                        </div>

                        <!-- Other Chats -->
                        <div
                            v-for="chat in otherChats"
                            :key="chat.id"
                            @click="selectChat(chat)"
                            :class="[
                                'cursor-pointer rounded-2xl p-4 transition-all',
                                selectedChat?.id === chat.id
                                    ? 'border-2 border-green-200 bg-green-50 hover:bg-green-100'
                                    : 'border border-gray-200 bg-white/80 hover:bg-gray-50',
                            ]"
                        >
                            <div class="flex items-start space-x-3">
                                <div class="relative">
                                    <div :class="['h-12 w-12 rounded-full', chat.avatar]"></div>
                                    <div
                                        v-if="chat.online"
                                        class="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"
                                    ></div>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <div class="flex items-center justify-between">
                                        <h3 class="font-semibold text-gray-900">{{ chat.name }}</h3>
                                        <span class="text-xs text-gray-500">{{ chat.time }}</span>
                                    </div>
                                    <p class="truncate text-sm text-gray-600">{{ chat.lastMessage }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Chat Content -->
            <main class="hidden flex-1 flex-col lg:flex">
                <!-- Chat Header -->
                <div v-if="selectedChat" class="border-b border-gray-200/60 bg-white/90 p-4 backdrop-blur-sm">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="relative">
                                <div class="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                <div class="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900">{{ selectedChat.name }}</h3>
                                <p class="text-sm text-green-600">Online</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button @click="makeCall" class="rounded-full p-2 text-gray-400 hover:bg-green-50 hover:text-green-600">
                                <Phone class="h-5 w-5" />
                            </button>
                            <button @click="makeVideoCall" class="rounded-full p-2 text-gray-400 hover:bg-green-50 hover:text-green-600">
                                <Video class="h-5 w-5" />
                            </button>
                            <button @click="showMoreOptions" class="rounded-full p-2 text-gray-400 hover:bg-gray-50">
                                <MoreHorizontal class="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Messages -->
                <div v-if="selectedChat" class="flex-1 space-y-4 overflow-y-auto p-4" ref="messagesContainer">
                    <!-- Message components -->
                    <div
                        v-for="message in messages"
                        :key="message.id"
                        :class="message.sent ? 'flex items-start justify-end space-x-3' : 'flex items-start space-x-3'"
                    >
                        <div v-if="!message.sent" class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>

                        <div v-if="message.type === 'system'" class="flex w-full justify-center">
                            <div class="rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-500">
                                {{ message.text }}
                            </div>
                        </div>

                        <div v-else-if="message.image" class="max-w-xs space-y-2">
                            <div class="rounded-2xl bg-white p-3 shadow-sm">
                                <div class="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-r from-green-200 to-orange-200">
                                    <span class="text-sm text-gray-600">{{ message.image }}</span>
                                </div>
                            </div>
                            <div class="rounded-2xl bg-white p-3 shadow-sm">
                                <p class="text-sm">{{ message.text }}</p>
                                <span class="text-xs text-gray-500">{{ message.time }}</span>
                            </div>
                        </div>

                        <div v-else :class="['max-w-xs rounded-2xl p-3', message.sent ? 'bg-green-500 text-white' : 'bg-white shadow-sm']">
                            <p class="text-sm">{{ message.text }}</p>
                            <span :class="['text-xs', message.sent ? 'text-green-100' : 'text-gray-500']">{{ message.time }}</span>
                        </div>

                        <div v-if="message.sent" class="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                    </div>
                </div>

                <!-- Empty state -->
                <div v-else class="flex flex-1 items-center justify-center text-gray-500">
                    <div class="text-center">
                        <MessageCircle class="mx-auto mb-4 h-16 w-16 text-gray-300" />
                        <p class="text-lg">Select a conversation to start messaging</p>
                    </div>
                </div>

                <!-- Message Input -->
                <div v-if="selectedChat" class="border-t border-gray-200/60 bg-white/90 p-4 backdrop-blur-sm">
                    <div class="flex items-center space-x-3">
                        <div class="relative flex-1">
                            <input
                                v-model="newMessage"
                                @keypress.enter="sendMessage"
                                type="text"
                                placeholder="Type a message..."
                                class="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-3 pr-12 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                            />
                            <button
                                @click="sendMessage"
                                class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-green-500 p-2 text-white transition-all hover:scale-105 hover:bg-green-600"
                            >
                                <Send class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <!-- Mobile Bottom Nav -->
        <nav
            class="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t border-gray-200/60 bg-white/90 py-2 shadow-lg backdrop-blur-md lg:hidden"
        >
            <Link href="/home" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <Home class="h-5 w-5" />
                <span cslass="mt-1 text-xs">Home</span>
            </Link>
            <Link href="/discover" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <Search class="h-5 w-5" />
                <span class="mt-1 text-xs">Discover</span>
            </Link>
            <Link href="/cart" class="relative flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <ShoppingCart class="h-5 w-5" />
                <span class="mt-1 text-xs">Cart</span>
            </Link>
            <Link href="/chats" class="flex flex-col items-center p-2 text-green-600">
                <MessageCircle class="h-5 w-5" />
                <span class="mt-1 text-xs font-medium">Chats</span>
            </Link>
            <Link href="/mapview" class="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                <Map class="h-5 w-5" />
                <span class="mt-1 text-xs">MapView</span>
            </Link>
        </nav>

        <!-- Floating Post Button (Mobile) -->
        <button
            @click="createPost"
            class="fixed right-4 bottom-20 z-20 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-green-600 lg:hidden"
        >
            <Plus class="mx-auto h-6 w-6" />
        </button>
    </div>
</template>

<script>
import { Link } from '@inertiajs/vue3';
import { Bell, Home, Map, MessageCircle, MoreHorizontal, Phone, Plus, Search, Send, ShoppingCart, Video } from 'lucide-vue-next';
import { computed, nextTick, ref } from 'vue';

export default {
    name: 'ChatsPage',
    components: {
        Link,
        Bell,
        Home,
        Map,
        MessageCircle,
        MoreHorizontal,
        Plus,
        Search,
        ShoppingCart,
        Send,
        Phone,
        Video,
    },
    props: {
        // Add any props passed from your Laravel controller
        initialChats: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const searchQuery = ref('');
        const newMessage = ref('');
        const selectedChat = ref(null);
        const messagesContainer = ref(null);

        // Sample chat data - replace with your actual data structure
        const chats = ref([
            {
                id: 1,
                name: 'Kalundu Fresh Market',
                lastMessage: 'Your order is ready for pickup! 🛒',
                time: '2m',
                online: true,
                avatar: 'bg-gradient-to-r from-blue-400 to-purple-500',
                unreadCount: 2,
            },
            {
                id: 2,
                name: "Anna's Food Truck",
                lastMessage: 'Thank you for your order! 🍞',
                time: '1h',
                online: false,
                avatar: 'bg-gradient-to-r from-orange-400 to-red-500',
            },
            {
                id: 3,
                name: 'UNC Joe Veggies',
                lastMessage: 'Fresh organic spinach available now!',
                time: '3h',
                online: true,
                avatar: 'bg-gradient-to-r from-green-400 to-blue-500',
            },
            {
                id: 4,
                name: 'BrewMe Coffee',
                lastMessage: 'Your coffee is brewing ☕',
                time: '1d',
                online: false,
                avatar: 'bg-gradient-to-r from-purple-400 to-pink-500',
            },
            {
                id: 5,
                name: 'Ben Barbeque',
                lastMessage: 'Weekend special menu available!',
                time: '2d',
                online: false,
                avatar: 'bg-gradient-to-r from-yellow-400 to-orange-500',
            },
            {
                id: 6,
                name: 'Chilenje Sports Bar',
                lastMessage: 'Thanks for joining us last night! 🍺',
                time: '3d',
                online: false,
                avatar: 'bg-gradient-to-r from-indigo-400 to-blue-500',
            },
        ]);

        const otherChats = computed(() => chats.value.slice(1));

        // Sample messages - replace with your actual message data
        const messages = ref([
            {
                id: 1,
                text: "Hello! Your fresh tomatoes are ready for pickup. We're open until 6 PM today.",
                time: '2:15 PM',
                sent: false,
            },
            {
                id: 2,
                text: "Perfect! I'll be there in 20 minutes. Can you also add some onions to my order?",
                time: '2:16 PM',
                sent: true,
            },
            {
                id: 3,
                text: "Absolutely! I've added 1kg of fresh onions to your order. Total is now K30. See you soon! 🧅",
                time: '2:18 PM',
                sent: false,
            },
            {
                id: 4,
                type: 'system',
                text: 'Order updated • Total: K30.00',
            },
            {
                id: 5,
                text: 'Great! Thanks for the quick service. See you in a bit! 👍',
                time: '2:20 PM',
                sent: true,
            },
            {
                id: 6,
                text: "Here's your order all packed and ready! 🛒✨",
                time: '2:45 PM',
                sent: false,
                image: '📸 Your order ready!',
            },
        ]);

        // Methods
        const selectChat = (chat) => {
            selectedChat.value = chat;
            // Here you would typically load messages for the selected chat
            // loadMessagesForChat(chat.id)
        };

        const sendMessage = () => {
            if (!newMessage.value.trim()) return;

            const message = {
                id: Date.now(),
                text: newMessage.value,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sent: true,
            };

            messages.value.push(message);
            newMessage.value = '';

            // Scroll to bottom
            nextTick(() => {
                if (messagesContainer.value) {
                    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
                }
            });

            // Here you would send the message to your backend
            // sendMessageToServer(message, selectedChat.value.id)
        };

        const startNewChat = () => {
            // Implement new chat functionality
            console.log('Starting new chat...');
        };

        const createPost = () => {
            // Implement post creation functionality
            console.log('Creating new post...');
        };

        const makeCall = () => {
            // Implement voice call functionality
            console.log('Making voice call...');
        };

        const makeVideoCall = () => {
            // Implement video call functionality
            console.log('Making video call...');
        };

        const showMoreOptions = () => {
            // Implement more options functionality
            console.log('Showing more options...');
        };

        // Auto-select first chat on mount
        selectedChat.value = chats.value[0];

        return {
            searchQuery,
            newMessage,
            selectedChat,
            messagesContainer,
            chats,
            otherChats,
            messages,
            selectChat,
            sendMessage,
            startNewChat,
            createPost,
            makeCall,
            makeVideoCall,
            showMoreOptions,
        };
    },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
