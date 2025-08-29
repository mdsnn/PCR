import { Bell, Hash, Heart, Home, MessageCircle, MessageSquare, MoreHorizontal, Plus, Search, Share, User, UserPlus } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-green-50">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-gray-200/60 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <h1 className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-2xl font-bold text-transparent">POTBELLY</h1>
                    </div>

                    {/* Search Bar */}
                    <div className="mx-8 hidden max-w-md flex-1 md:flex">
                        <div className="relative w-full">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search POTBELLY..."
                                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Header Actions */}
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
                    <nav className="sticky top-20">
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center space-x-3 rounded-full bg-green-500 px-4 py-3 text-lg font-medium text-white transition-all duration-200 hover:bg-green-600"
                                >
                                    <Home className="h-6 w-6" />
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center space-x-3 rounded-full px-4 py-3 text-lg text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
                                >
                                    <Hash className="h-6 w-6" />
                                    <span>MapView</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center space-x-3 rounded-full px-4 py-3 text-lg text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
                                >
                                    <Bell className="h-6 w-6" />
                                    <span>Cart</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center space-x-3 rounded-full px-4 py-3 text-lg text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
                                >
                                    <MessageCircle className="h-6 w-6" />
                                    <span>Messages</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center space-x-3 rounded-full px-4 py-3 text-lg text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
                                >
                                    <User className="h-6 w-6" />
                                    <span>Subscriptions</span>
                                </a>
                            </li>
                        </ul>

                        {/* Post Button */}
                        <button className="mt-6 w-full transform rounded-full bg-green-500 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-600 hover:shadow-xl">
                            Post
                        </button>
                    </nav>
                </aside>

                {/* Main Content Column */}
                <main className="flex-1 p-4 lg:border-r lg:border-gray-200/60">
                    {/* Create Post */}

                    {/* Posts Feed */}
                    <div className="space-y-4">
                        {/* Post 1 */}
                        <div className="rounded-xl border border-gray-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md">
                            <div className="flex items-start space-x-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-gray-900">John Doe</h3>
                                        <span className="text-gray-500">@johndoe</span>
                                        <span className="text-gray-400">·</span>
                                        <span className="text-sm text-gray-500">2h</span>
                                    </div>
                                    <p className="mt-2 leading-relaxed text-gray-800">
                                        Just had the most amazing experience at the local farmers market! 🌱 Supporting local growers and getting the
                                        freshest ingredients. There's something special about knowing where your food comes from.
                                    </p>
                                    <div className="mt-4 flex max-w-md items-center justify-between text-gray-500">
                                        <button className="group flex items-center space-x-2 transition-colors hover:text-green-500">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-green-50">
                                                <MessageSquare className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm">12</span>
                                        </button>
                                        <button className="group flex items-center space-x-2 transition-colors hover:text-red-500">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-red-50">
                                                <Heart className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm">48</span>
                                        </button>
                                        <button className="group flex items-center space-x-2 transition-colors hover:text-green-500">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-green-50">
                                                <Share className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm">7</span>
                                        </button>
                                        <button className="group transition-colors hover:text-gray-700">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-gray-50">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Post 2 */}
                        <div className="rounded-xl border border-gray-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md">
                            <div className="flex items-start space-x-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"></div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-gray-900">Sarah Chen</h3>
                                        <span className="text-gray-500">@sarahc</span>
                                        <span className="text-gray-400">·</span>
                                        <span className="text-sm text-gray-500">4h</span>
                                    </div>
                                    <p className="mt-2 leading-relaxed text-gray-800">
                                        Building something exciting! 🚀 Can't wait to share what we've been working on. The future of social media is
                                        going to be incredible.
                                    </p>
                                    <div className="mt-4 flex max-w-md items-center justify-between text-gray-500">
                                        <button className="group flex items-center space-x-2 transition-colors hover:text-green-500">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-green-50">
                                                <MessageSquare className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm">8</span>
                                        </button>
                                        <button className="group flex items-center space-x-2 transition-colors hover:text-red-500">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-red-50">
                                                <Heart className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm">156</span>
                                        </button>
                                        <button className="group flex items-center space-x-2 transition-colors hover:text-green-500">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-green-50">
                                                <Share className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm">23</span>
                                        </button>
                                        <button className="group transition-colors hover:text-gray-700">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-gray-50">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Post 3 */}
                        <div className="rounded-xl border border-gray-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md">
                            <div className="flex items-start space-x-3">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-gray-900">Mike Rodriguez</h3>
                                        <span className="text-gray-500">@mike_r</span>
                                        <span className="text-gray-400">·</span>
                                        <span className="text-sm text-gray-500">6h</span>
                                    </div>
                                    <p className="mt-2 leading-relaxed text-gray-800">
                                        Coffee thoughts ☕️: Why do the best conversations happen in the most unexpected places? Had an amazing chat
                                        with a stranger at the bus stop today about life, dreams, and everything in between.
                                    </p>
                                    <div className="mt-4 flex max-w-md items-center justify-between text-gray-500">
                                        <button className="group flex items-center space-x-2 transition-colors hover:text-green-500">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-green-50">
                                                <MessageSquare className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm">24</span>
                                        </button>
                                        <button className="group flex items-center space-x-2 transition-colors hover:text-red-500">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-red-50">
                                                <Heart className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm">89</span>
                                        </button>
                                        <button className="group flex items-center space-x-2 transition-colors hover:text-green-500">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-green-50">
                                                <Share className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm">15</span>
                                        </button>
                                        <button className="group transition-colors hover:text-gray-700">
                                            <div className="rounded-full p-2 transition-colors group-hover:bg-gray-50">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </div>
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
                        {/* Who to Follow */}
                        <div className="rounded-xl border border-gray-200/60 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                            <div className="mb-4 flex items-center space-x-2">
                                <UserPlus className="h-5 w-5 text-green-500" />
                                <h3 className="text-lg font-semibold text-gray-900">Who to follow</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-pink-600"></div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Emma Watson</div>
                                            <div className="text-sm text-gray-500">@emmaw</div>
                                        </div>
                                    </div>
                                    <button className="rounded-full border border-green-500 px-4 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
                                        Follow
                                    </button>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Alex Kim</div>
                                            <div className="text-sm text-gray-500">@alexk</div>
                                        </div>
                                    </div>
                                    <button className="rounded-full border border-green-500 px-4 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
                                        Follow
                                    </button>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"></div>
                                        <div>
                                            <div className="font-semibold text-gray-900">Maya Patel</div>
                                            <div className="text-sm text-gray-500">@mayap</div>
                                        </div>
                                    </div>
                                    <button className="rounded-full border border-green-500 px-4 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-50">
                                        Follow
                                    </button>
                                </li>
                            </ul>
                            <button className="mt-3 text-sm font-medium text-green-600 hover:text-green-700">Show more</button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Bottom Navigation (Mobile) */}
            <nav className="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t border-gray-200/60 bg-white/90 py-2 shadow-lg backdrop-blur-md lg:hidden">
                <a href="#" className="flex flex-col items-center p-2 text-green-600">
                    <Home className="h-5 w-5" />
                    <span className="mt-1 text-xs font-medium">Home</span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 transition-colors hover:text-green-600">
                    <Search className="h-5 w-5" />
                    <span className="mt-1 text-xs">Explore</span>
                </a>
                <a href="#" className="relative flex flex-col items-center p-2 text-gray-500 transition-colors hover:text-green-600">
                    <Bell className="h-5 w-5" />
                    <span className="mt-1 text-xs">MapView</span>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        3
                    </span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 transition-colors hover:text-green-600">
                    <MessageCircle className="h-5 w-5" />
                    <span className="mt-1 text-xs">Messages</span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 transition-colors hover:text-green-600">
                    <User className="h-5 w-5" />
                    <span className="mt-1 text-xs">Cart</span>
                </a>
            </nav>

            {/* Floating Action Button (Mobile) */}
            <button className="fixed right-4 bottom-20 z-20 h-14 w-14 transform rounded-full bg-green-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-600 hover:shadow-xl lg:hidden">
                <Plus className="mx-auto h-6 w-6" />
            </button>
        </div>
    );
};

export default HomePage;
