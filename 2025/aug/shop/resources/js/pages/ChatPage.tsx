import { Bell, Home, Map, MessageCircle, MoreHorizontal, Plus, Search, ShoppingCart, Send, Phone, Video } from 'lucide-react';

const ChatsPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-green-50">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-gray-200/60 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <h1 className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-2xl font-bold text-transparent">POTBELLY</h1>

                    {/* Discovery Bar */}
                    <div className="mx-6 hidden max-w-lg flex-1 md:flex">
                        <div className="relative w-full">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="relative rounded-full p-2 transition-colors hover:bg-green-50">
                            <Bell className="h-5 w-5 text-gray-600" />
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                3
                            </span>
                        </button>
                        <div className="h-8 w-8 cursor-pointer rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="mx-auto flex max-w-7xl flex-1">
                {/* Left Sidebar */}
                <aside className="hidden w-64 p-4 lg:block">
                    <nav className="sticky top-20 space-y-3">
                        <a
                            href="#"
                            className="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                        >
                            <Home className="h-6 w-6" />
                            <span>Home</span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                        >
                            <Map className="h-6 w-6" />
                            <span>Mapview</span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            <span>Cart</span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center space-x-3 rounded-xl bg-green-500 px-4 py-3 text-lg font-medium text-white transition-all hover:bg-green-600"
                        >
                            <MessageCircle className="h-6 w-6" />
                            <span>Chats</span>
                        </a>
                        <button className="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-green-600">
                            Post
                        </button>
                    </nav>
                </aside>

                {/* Chat List */}
                <aside className="w-full lg:w-80 p-4 lg:border-r lg:border-gray-200/60">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
                            <button className="rounded-full bg-green-500 p-2 text-white transition-all hover:scale-105 hover:bg-green-600">
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Chat Items */}
                        <div className="space-y-2">
                            {/* Active Chat */}
                            <div className="rounded-2xl bg-green-50 border-2 border-green-200 p-4 cursor-pointer transition-all hover:bg-green-100">
                                <div className="flex items-start space-x-3">
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900">Kalundu Fresh Market</h3>
                                            <span className="text-xs text-gray-500">2m</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">Your order is ready for pickup! 🛒</p>
                                        <span className="inline-block mt-1 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">2</span>
                                    </div>
                                </div>
                            </div>

                            {/* Other Chats */}
                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 cursor-pointer transition-all hover:bg-gray-50">
                                <div className="flex items-start space-x-3">
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900">Anna's Food Truck</h3>
                                            <span className="text-xs text-gray-500">1h</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">Thank you for your order! 🍞</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 cursor-pointer transition-all hover:bg-gray-50">
                                <div className="flex items-start space-x-3">
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900">UNC Joe Veggies</h3>
                                            <span className="text-xs text-gray-500">3h</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">Fresh organic spinach available now!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 cursor-pointer transition-all hover:bg-gray-50">
                                <div className="flex items-start space-x-3">
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900">BrewMe Coffee</h3>
                                            <span className="text-xs text-gray-500">1d</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">Your coffee is brewing ☕</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 cursor-pointer transition-all hover:bg-gray-50">
                                <div className="flex items-start space-x-3">
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900">Ben Barbeque</h3>
                                            <span className="text-xs text-gray-500">2d</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">Weekend special menu available!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 cursor-pointer transition-all hover:bg-gray-50">
                                <div className="flex items-start space-x-3">
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900">Chilenje Sports Bar</h3>
                                            <span className="text-xs text-gray-500">3d</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">Thanks for joining us last night! 🍺</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Chat Content */}
                <main className="hidden lg:flex flex-1 flex-col">
                    {/* Chat Header */}
                    <div className="border-b border-gray-200/60 bg-white/90 p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Kalundu Fresh Market</h3>
                                    <p className="text-sm text-green-600">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="rounded-full p-2 text-gray-400 hover:bg-green-50 hover:text-green-600">
                                    <Phone className="h-5 w-5" />
                                </button>
                                <button className="rounded-full p-2 text-gray-400 hover:bg-green-50 hover:text-green-600">
                                    <Video className="h-5 w-5" />
                                </button>
                                <button className="rounded-full p-2 text-gray-400 hover:bg-gray-50">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {/* Received Message */}
                        <div className="flex items-start space-x-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                            <div className="max-w-xs rounded-2xl bg-white p-3 shadow-sm">
                                <p className="text-sm">Hello! Your fresh tomatoes are ready for pickup. We're open until 6 PM today.</p>
                                <span className="text-xs text-gray-500">2:15 PM</span>
                            </div>
                        </div>

                        {/* Sent Message */}
                        <div className="flex items-start justify-end space-x-3">
                            <div className="max-w-xs rounded-2xl bg-green-500 p-3 text-white">
                                <p className="text-sm">Perfect! I'll be there in 20 minutes. Can you also add some onions to my order?</p>
                                <span className="text-xs text-green-100">2:16 PM</span>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                        </div>

                        {/* Received Message */}
                        <div className="flex items-start space-x-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                            <div className="max-w-xs rounded-2xl bg-white p-3 shadow-sm">
                                <p className="text-sm">Absolutely! I've added 1kg of fresh onions to your order. Total is now K30. See you soon! 🧅</p>
                                <span className="text-xs text-gray-500">2:18 PM</span>
                            </div>
                        </div>

                        {/* System Message */}
                        <div className="flex justify-center">
                            <div className="rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-500">
                                Order updated • Total: K30.00
                            </div>
                        </div>

                        {/* Sent Message */}
                        <div className="flex items-start justify-end space-x-3">
                            <div className="max-w-xs rounded-2xl bg-green-500 p-3 text-white">
                                <p className="text-sm">Great! Thanks for the quick service. See you in a bit! 👍</p>
                                <span className="text-xs text-green-100">2:20 PM</span>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                        </div>

                        {/* Received Message with Image placeholder */}
                        <div className="flex items-start space-x-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                            <div className="max-w-xs space-y-2">
                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                    <div className="h-32 w-full rounded-lg bg-gradient-to-r from-green-200 to-orange-200 flex items-center justify-center">
                                        <span className="text-sm text-gray-600">📸 Your order ready!</span>
                                    </div>
                                </div>
                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                    <p className="text-sm">Here's your order all packed and ready! 🛒✨</p>
                                    <span className="text-xs text-gray-500">2:45 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-200/60 bg-white/90 p-4 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 px-4 pr-12 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-green-500 p-2 text-white transition-all hover:scale-105 hover:bg-green-600">
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t border-gray-200/60 bg-white/90 py-2 shadow-lg backdrop-blur-md lg:hidden">
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <Home className="h-5 w-5" />
                    <span className="mt-1 text-xs">Home</span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <Search className="h-5 w-5" />
                    <span className="mt-1 text-xs">Discover</span>
                </a>
                <a href="#" className="relative flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="mt-1 text-xs">Cart</span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-green-600">
                    <MessageCircle className="h-5 w-5" />
                    <span className="mt-1 text-xs font-medium">Chats</span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <Map className="h-5 w-5" />
                    <span className="mt-1 text-xs">MapView</span>
                </a>
            </nav>

            {/* Floating Post Button (Mobile) */}
            <button className="fixed right-4 bottom-20 z-20 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-green-600 lg:hidden">
                <Plus className="mx-auto h-6 w-6" />
            </button>
        </div>
    );
};

export default ChatsPage;