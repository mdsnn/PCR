import { Bell, Home, Map, MessageCircle, MoreHorizontal, Plus, Search, ShoppingCart } from 'lucide-react';

const HomePage = () => {
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
                                placeholder="Discover fresh markets, stores, and recipes..."
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
                            className="flex items-center space-x-3 rounded-xl bg-green-500 px-4 py-3 text-lg font-medium text-white transition-all hover:bg-green-600"
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
                            className="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 transition-all hover:bg-green-50 hover:text-green-600"
                        >
                            <MessageCircle className="h-6 w-6" />
                            <span>Chats</span>
                        </a>
                        <button className="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-green-600">
                            Post
                        </button>
                    </nav>
                </aside>

                {/* Feed */}
                <main className="flex-1 p-4 lg:border-r lg:border-gray-200/60">
                    <div className="space-y-5">
                        {/* Example Post */}
                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm hover:shadow-md">
                            <div className="flex items-start space-x-4">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-green-500"></div>
                                <div className="flex-1">
                                    {/* Author + meta */}
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-gray-900">John Doe</h3>
                                        <span className="text-sm text-gray-500">@johndoe</span>
                                        <span className="text-gray-400">·</span>
                                        <span className="text-sm text-gray-500">2h</span>
                                    </div>
                                    {/* Content */}
                                    <p className="mt-2 leading-relaxed text-gray-800">
                                        🌱 Fresh from the <span className="font-medium text-green-600">Lusaka Market</span>: supporting local farmers
                                        while getting the best organic produce!
                                    </p>
                                    {/* Tags + Location */}
                                    <div className="mt-2 flex space-x-2 text-sm">
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">#FarmersMarket</span>
                                        <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">📍 Lusaka</span>
                                    </div>
                                    {/* Reactions */}
                                    <div className="mt-4 flex max-w-md items-center justify-between text-gray-500">
                                        {['👍', '❤️', '🌱', '🍲'].map((emoji, i) => (
                                            <button
                                                key={i}
                                                className="flex items-center space-x-2 rounded-full px-3 py-1 transition hover:bg-green-50 hover:text-green-600"
                                            >
                                                <span>{emoji}</span>
                                                <span className="text-sm">12</span>
                                            </button>
                                        ))}
                                        <button className="rounded-full p-2 hover:bg-gray-50">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="hidden w-80 p-4 lg:block">
                    <div className="sticky top-20 space-y-6">
                        {/* Trending Markets */}
                        <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">🌍 Popular Stores</h3>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li>#KalunduFreshMilk</li>
                                <li>#ChilenjeSportsBar</li>
                                <li>#BrewMeCoffee</li>
                                <li>#UNCJoeVeggies</li>
                                <li>#AnnasFoodTruck</li>
                            </ul>
                        </div>
                        {/* Recipe of the Day */}
                        <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">🍲 Trending</h3>
                            <p className="text-sm text-gray-700">Mubitas Chilanga mulilo (1.3km away)</p>
                            <p className="text-sm text-gray-700">Taonga Bridal Shower (5km away)</p>
                            <p className="text-sm text-gray-700">Ben Barbeque (1.8km away)</p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t border-gray-200/60 bg-white/90 py-2 shadow-lg backdrop-blur-md lg:hidden">
                <a href="#" className="flex flex-col items-center p-2 text-green-600">
                    <Home className="h-5 w-5" />
                    <span className="mt-1 text-xs font-medium">Home</span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <Search className="h-5 w-5" />
                    <span className="mt-1 text-xs">Discover</span>
                </a>
                <a href="#" className="relative flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="mt-1 text-xs">Cart</span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <MessageCircle className="h-5 w-5" />
                    <span className="mt-1 text-xs">Chats</span>
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

export default HomePage;
