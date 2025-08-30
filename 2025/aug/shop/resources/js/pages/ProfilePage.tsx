import {
    Award,
    Bell,
    Calendar,
    Edit3,
    Heart,
    Home,
    Map,
    MapPin,
    MessageCircle,
    MoreHorizontal,
    Plus,
    Search,
    Settings,
    ShoppingCart,
    Star,
    Users,
} from 'lucide-react';

const ProfilePage = () => {
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

                {/* Profile Content */}
                <main className="flex-1 p-4 lg:border-r lg:border-gray-200/60">
                    <div className="space-y-6">
                        {/* Profile Header */}
                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
                            <div className="flex items-start space-x-6">
                                <div className="relative">
                                    <div className="h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                                    <button className="absolute -right-2 -bottom-2 rounded-full bg-white p-2 shadow-lg transition-all hover:scale-105">
                                        <Edit3 className="h-4 w-4 text-gray-600" />
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                                            <p className="text-gray-600">@johndoe</p>
                                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                                <div className="flex items-center space-x-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>Lusaka, Zambia</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Joined March 2024</span>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-gray-700">
                                                🌱 Food enthusiast | Supporting local farmers and markets | Love discovering fresh, organic produce in
                                                Lusaka
                                            </p>
                                        </div>
                                        <button className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-green-300 hover:bg-gray-50">
                                            <Settings className="mr-2 inline h-4 w-4" />
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-6 grid grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">156</div>
                                    <div className="text-sm text-gray-600">Posts</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">342</div>
                                    <div className="text-sm text-gray-600">Following</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">1.2K</div>
                                    <div className="text-sm text-gray-600">Followers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">4.8</div>
                                    <div className="text-sm text-gray-600">Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Activity Tabs */}
                        <div className="rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm">
                            <div className="flex space-x-1 p-1">
                                <button className="flex-1 rounded-xl bg-green-500 px-4 py-3 text-sm font-medium text-white">My Posts</button>
                                <button className="flex-1 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Reviews</button>
                                <button className="flex-1 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Orders</button>
                                <button className="flex-1 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    Favorites
                                </button>
                            </div>
                        </div>

                        {/* Posts Feed */}
                        <div className="space-y-4">
                            {/* User's Post 1 */}
                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm hover:shadow-md">
                                <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-semibold text-gray-900">John Doe</h3>
                                            <span className="text-sm text-gray-500">@johndoe</span>
                                            <span className="text-gray-400">·</span>
                                            <span className="text-sm text-gray-500">2h</span>
                                        </div>
                                        <p className="mt-2 leading-relaxed text-gray-800">
                                            🌱 Fresh from the <span className="font-medium text-green-600">Lusaka Market</span>: supporting local
                                            farmers while getting the best organic produce! The tomatoes here are incredible! 🍅
                                        </p>
                                        <div className="mt-2 flex space-x-2 text-sm">
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">#FarmersMarket</span>
                                            <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">📍 Lusaka</span>
                                        </div>
                                        <div className="mt-4 flex max-w-md items-center justify-between text-gray-500">
                                            {['👍', '❤️', '🌱', '🍲'].map((emoji, i) => (
                                                <button
                                                    key={i}
                                                    className="flex items-center space-x-2 rounded-full px-3 py-1 transition hover:bg-green-50 hover:text-green-600"
                                                >
                                                    <span>{emoji}</span>
                                                    <span className="text-sm">{12 + i * 3}</span>
                                                </button>
                                            ))}
                                            <button className="rounded-full p-2 hover:bg-gray-50">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User's Post 2 */}
                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm hover:shadow-md">
                                <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-semibold text-gray-900">John Doe</h3>
                                            <span className="text-sm text-gray-500">@johndoe</span>
                                            <span className="text-gray-400">·</span>
                                            <span className="text-sm text-gray-500">1d</span>
                                        </div>
                                        <p className="mt-2 leading-relaxed text-gray-800">
                                            Just tried the most amazing fresh bread from{' '}
                                            <span className="font-medium text-orange-600">Anna's Food Truck</span>! 🍞 The quality and taste are
                                            unmatched. Highly recommend supporting this local business!
                                        </p>
                                        <div className="mt-2 flex space-x-2 text-sm">
                                            <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">#LocalBusiness</span>
                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">#FreshBread</span>
                                        </div>
                                        <div className="mt-4 flex max-w-md items-center justify-between text-gray-500">
                                            {['👍', '❤️', '🍞', '😋'].map((emoji, i) => (
                                                <button
                                                    key={i}
                                                    className="flex items-center space-x-2 rounded-full px-3 py-1 transition hover:bg-green-50 hover:text-green-600"
                                                >
                                                    <span>{emoji}</span>
                                                    <span className="text-sm">{8 + i * 2}</span>
                                                </button>
                                            ))}
                                            <button className="rounded-full p-2 hover:bg-gray-50">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User's Post 3 */}
                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm hover:shadow-md">
                                <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-semibold text-gray-900">John Doe</h3>
                                            <span className="text-sm text-gray-500">@johndoe</span>
                                            <span className="text-gray-400">·</span>
                                            <span className="text-sm text-gray-500">3d</span>
                                        </div>
                                        <p className="mt-2 leading-relaxed text-gray-800">
                                            Weekend farmers market haul! 🛒 Got some incredible organic spinach from
                                            <span className="font-medium text-green-600"> UNC Joe Veggies</span>. Nothing beats fresh, locally-grown
                                            vegetables! #SupportLocal
                                        </p>
                                        <div className="mt-2 flex space-x-2 text-sm">
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">#Organic</span>
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">#SupportLocal</span>
                                        </div>
                                        <div className="mt-4 flex max-w-md items-center justify-between text-gray-500">
                                            {['👍', '❤️', '🌱', '💚'].map((emoji, i) => (
                                                <button
                                                    key={i}
                                                    className="flex items-center space-x-2 rounded-full px-3 py-1 transition hover:bg-green-50 hover:text-green-600"
                                                >
                                                    <span>{emoji}</span>
                                                    <span className="text-sm">{15 + i * 4}</span>
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
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="hidden w-80 p-4 lg:block">
                    <div className="sticky top-20 space-y-6">
                        {/* Achievements */}
                        <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">🏆 Achievements</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 rounded-lg bg-green-50 p-3">
                                    <div className="rounded-full bg-green-500 p-2">
                                        <Star className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Local Supporter</div>
                                        <div className="text-sm text-gray-600">50+ local purchases</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 rounded-lg bg-orange-50 p-3">
                                    <div className="rounded-full bg-orange-500 p-2">
                                        <Award className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Top Reviewer</div>
                                        <div className="text-sm text-gray-600">100+ helpful reviews</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 rounded-lg bg-blue-50 p-3">
                                    <div className="rounded-full bg-blue-500 p-2">
                                        <Users className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Community Builder</div>
                                        <div className="text-sm text-gray-600">1K+ followers</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">📊 Activity</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Posts this month</span>
                                    <span className="font-medium text-green-600">12</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Reviews written</span>
                                    <span className="font-medium text-blue-600">8</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Markets visited</span>
                                    <span className="font-medium text-orange-600">15</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Orders completed</span>
                                    <span className="font-medium text-purple-600">23</span>
                                </div>
                            </div>
                        </div>

                        {/* Favorite Markets */}
                        <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">❤️ Favorites</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>Kalundu Fresh Market</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>Anna's Food Truck</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>UNC Joe Veggies</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-700">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>BrewMe Coffee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
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

export default ProfilePage;
