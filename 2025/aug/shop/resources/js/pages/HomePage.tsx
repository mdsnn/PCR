import {
    Bell,
    Heart,
    Home,
    Map,
    MessageCircle,
    MessageSquare,
    MoreHorizontal,
    Plus,
    Search,
    Share,
    ShoppingCart,
    User,
    UserPlus,
    Layers,
    Compass,
} from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            {/* Floating Header */}
            <header className="fixed top-4 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 px-4">
                <div className="rounded-2xl border border-white/60 bg-white/20 p-4 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold">
                                P
                            </div>
                            <h1 className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-xl font-bold text-transparent">
                                POTBELLY
                            </h1>
                        </div>

                        {/* Floating Search */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Discover amazing content..."
                                    className="w-full rounded-xl border-0 bg-white/60 py-3 pr-4 pl-12 text-sm backdrop-blur-sm focus:bg-white/80 focus:ring-2 focus:ring-green-400/50 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button className="relative rounded-xl bg-white/40 p-3 backdrop-blur-sm transition-all hover:bg-white/60">
                                <Bell className="h-5 w-5 text-gray-700" />
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                    3
                                </span>
                            </button>
                            <div className="h-10 w-10 cursor-pointer rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout - Card-based Dashboard */}
            <div className="pt-24 px-4">
                <div className="mx-auto max-w-7xl">
                    {/* Navigation Cards */}
                    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
                        <div className="group cursor-pointer rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                            <Home className="mb-2 h-6 w-6" />
                            <div className="font-semibold">Home</div>
                        </div>
                        <div className="group cursor-pointer rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/80 hover:shadow-xl">
                            <Map className="mb-2 h-6 w-6 text-gray-700" />
                            <div className="font-semibold text-gray-700">MapView</div>
                        </div>
                        <div className="group cursor-pointer rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/80 hover:shadow-xl">
                            <ShoppingCart className="mb-2 h-6 w-6 text-gray-700" />
                            <div className="font-semibold text-gray-700">Cart</div>
                            <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">3</div>
                        </div>
                        <div className="group cursor-pointer rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/80 hover:shadow-xl">
                            <MessageCircle className="mb-2 h-6 w-6 text-gray-700" />
                            <div className="font-semibold text-gray-700">Messages</div>
                        </div>
                        <div className="group cursor-pointer rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/80 hover:shadow-xl">
                            <User className="mb-2 h-6 w-6 text-gray-700" />
                            <div className="font-semibold text-gray-700">Profile</div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Posts Column - Masonry Style */}
                        <div className="lg:col-span-2">
                            <div className="mb-6 rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600"></div>
                                    <input
                                        type="text"
                                        placeholder="Share what's on your mind..."
                                        className="flex-1 rounded-xl border-0 bg-gray-50/50 py-3 px-4 focus:bg-white focus:ring-2 focus:ring-green-400/50 focus:outline-none"
                                    />
                                    <button className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                                        Post
                                    </button>
                                </div>
                            </div>

                            {/* Masonry-style Posts */}
                            <div className="space-y-6">
                                {/* Post 1 - Large */}
                                <div className="group rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-xl">
                                    <div className="flex items-start space-x-4">
                                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                            J
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-3 flex items-center space-x-2">
                                                <h3 className="font-bold text-gray-900">John Doe</h3>
                                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">@johndoe</span>
                                                <span className="text-sm text-gray-500">2h</span>
                                            </div>
                                            <p className="mb-4 text-gray-800 leading-relaxed">
                                                Just had the most amazing experience at the local farmers market! 🌱 Supporting local growers and getting the
                                                freshest ingredients. There's something special about knowing where your food comes from.
                                            </p>
                                            <div className="flex items-center space-x-6">
                                                <button className="flex items-center space-x-2 rounded-full bg-gray-50 px-4 py-2 transition-all hover:bg-green-50 hover:text-green-600">
                                                    <MessageSquare className="h-4 w-4" />
                                                    <span className="text-sm font-medium">12</span>
                                                </button>
                                                <button className="flex items-center space-x-2 rounded-full bg-gray-50 px-4 py-2 transition-all hover:bg-red-50 hover:text-red-500">
                                                    <Heart className="h-4 w-4" />
                                                    <span className="text-sm font-medium">48</span>
                                                </button>
                                                <button className="flex items-center space-x-2 rounded-full bg-gray-50 px-4 py-2 transition-all hover:bg-blue-50 hover:text-blue-600">
                                                    <Share className="h-4 w-4" />
                                                    <span className="text-sm font-medium">7</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Post 2 - Compact */}
                                <div className="group rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 shadow-lg transition-all hover:shadow-xl">
                                    <div className="flex items-center space-x-4 mb-3">
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                                            S
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Sarah Chen</h3>
                                            <span className="text-sm text-gray-600">@sarahc • 4h</span>
                                        </div>
                                    </div>
                                    <p className="mb-4 text-gray-800">
                                        Building something exciting! 🚀 Can't wait to share what we've been working on.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center text-sm text-gray-600">
                                                <MessageSquare className="mr-1 h-4 w-4" />
                                                8
                                            </span>
                                            <span className="flex items-center text-sm text-red-500">
                                                <Heart className="mr-1 h-4 w-4" />
                                                156
                                            </span>
                                        </div>
                                        <button className="rounded-full bg-white/60 p-2 transition-colors hover:bg-white">
                                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                {/* Post 3 - Medium with visual emphasis */}
                                <div className="group overflow-hidden rounded-2xl bg-white/70 shadow-lg backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-xl">
                                    <div className="h-2 bg-gradient-to-r from-orange-400 to-yellow-500"></div>
                                    <div className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                                                M
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-3 flex items-center space-x-2">
                                                    <h3 className="font-bold text-gray-900">Mike Rodriguez</h3>
                                                    <span className="text-sm text-gray-500">@mike_r • 6h</span>
                                                </div>
                                                <p className="mb-4 text-gray-800">
                                                    Coffee thoughts ☕️: Why do the best conversations happen in the most unexpected places?
                                                </p>
                                                <div className="flex items-center space-x-6">
                                                    <button className="text-gray-500 hover:text-green-600 transition-colors">
                                                        <MessageSquare className="h-5 w-5" />
                                                    </button>
                                                    <button className="text-gray-500 hover:text-red-500 transition-colors">
                                                        <Heart className="h-5 w-5" />
                                                    </button>
                                                    <button className="text-gray-500 hover:text-blue-600 transition-colors">
                                                        <Share className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Widget Style */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-lg">
                                <h3 className="mb-4 text-lg font-bold">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="rounded-xl bg-white/20 p-3 text-center backdrop-blur-sm transition-all hover:bg-white/30">
                                        <Compass className="mx-auto mb-1 h-5 w-5" />
                                        <div className="text-xs">Explore</div>
                                    </button>
                                    <button className="rounded-xl bg-white/20 p-3 text-center backdrop-blur-sm transition-all hover:bg-white/30">
                                        <Layers className="mx-auto mb-1 h-5 w-5" />
                                        <div className="text-xs">Collections</div>
                                    </button>
                                </div>
                            </div>

                            {/* People to Follow */}
                            <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm">
                                <div className="mb-4 flex items-center space-x-2">
                                    <UserPlus className="h-5 w-5 text-green-500" />
                                    <h3 className="font-bold text-gray-900">Discover People</h3>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: "Emma Watson", handle: "@emmaw", color: "from-pink-400 to-pink-600" },
                                        { name: "Alex Kim", handle: "@alexk", color: "from-indigo-400 to-indigo-600" },
                                        { name: "Maya Patel", handle: "@mayap", color: "from-teal-400 to-teal-600" },
                                    ].map((person, i) => (
                                        <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50/50 p-3">
                                            <div className="flex items-center space-x-3">
                                                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${person.color} flex items-center justify-center text-white font-bold`}>
                                                    {person.name[0]}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{person.name}</div>
                                                    <div className="text-sm text-gray-500">{person.handle}</div>
                                                </div>
                                            </div>
                                            <button className="rounded-lg bg-green-500 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-green-600">
                                                Follow
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Trending Topics */}
                            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-lg">
                                <h3 className="mb-4 font-bold text-gray-900">Trending Now</h3>
                                <div className="space-y-3">
                                    {["#LocalFarmers", "#TechStartup", "#CoffeeThoughts"].map((tag, i) => (
                                        <div key={i} className="rounded-xl bg-white/60 p-3 transition-all hover:bg-white/80 cursor-pointer">
                                            <div className="font-medium text-blue-600">{tag}</div>
                                            <div className="text-sm text-gray-500">{Math.floor(Math.random() * 1000) + 100} posts</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <button className="fixed bottom-8 right-8 z-50 h-16 w-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-3xl lg:hidden">
                <Plus className="mx-auto h-6 w-6" />
            </button>

            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
                <div className="mx-4 mb-4 rounded-2xl border border-white/60 bg-white/20 p-2 shadow-xl backdrop-blur-xl">
                    <div className="flex justify-around">
                        {[
                            { icon: Home, label: "Home", active: true },
                            { icon: Search, label: "Search" },
                            { icon: Map, label: "Map" },
                            { icon: MessageCircle, label: "Messages" },
                            { icon: User, label: "Profile" },
                        ].map((item, i) => (
                            <button key={i} className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                                item.active 
                                    ? "bg-green-500 text-white" 
                                    : "text-gray-600 hover:bg-white/60 hover:text-green-600"
                            }`}>
                                <item.icon className="h-5 w-5" />
                                <span className="mt-1 text-xs font-medium">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HomePage;