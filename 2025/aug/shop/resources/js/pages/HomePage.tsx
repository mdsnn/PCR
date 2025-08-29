import { Bell, Home, Map, MessageCircle, MoreHorizontal, Plus, Search, ShoppingCart } from 'lucide-react';

const posts = [
    {
        id: 1,
        author: 'John Doe',
        handle: '@johndoe',
        time: '2h',
        img: 'https://source.unsplash.com/400x500/?vegetables',
        text: '🌱 Fresh organic veggies straight from Lusaka Market!',
        tags: ['#FarmersMarket', '📍 Lusaka'],
        reactions: { thumbsUp: 12, heart: 48, sprout: 30, stew: 7 },
    },
    {
        id: 2,
        author: 'Sarah Chen',
        handle: '@sarahc',
        time: '4h',
        img: 'https://source.unsplash.com/400x600/?coffee',
        text: '☕️ Perfect morning coffee + conversation.',
        tags: ['#CoffeeChat', '📍 Downtown'],
        reactions: { thumbsUp: 18, heart: 76, sprout: 12, stew: 3 },
    },
    {
        id: 3,
        author: 'Mike Rodriguez',
        handle: '@mike_r',
        time: '6h',
        img: 'https://source.unsplash.com/400x400/?fruit',
        text: '🍎 Just grabbed fresh apples from the orchard.',
        tags: ['#FreshFruit', '📍 Local Orchard'],
        reactions: { thumbsUp: 9, heart: 22, sprout: 5, stew: 2 },
    },
];

// Create a mapping from reaction keys to emojis
const reactionEmojis = {
    thumbsUp: '👍',
    heart: '❤️',
    sprout: '🌱',
    stew: '🍲',
};

const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-green-50">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-gray-200/60 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <h1 className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-2xl font-bold text-transparent">POTBELLY</h1>

                    {/* Search / Discover */}
                    <div className="mx-6 hidden max-w-lg flex-1 md:flex">
                        <div className="relative w-full">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Discover food, markets & recipes..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="relative rounded-full p-2 hover:bg-green-50" aria-label="Notifications">
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
                {/* Sidebar Left */}
                <aside className="hidden w-64 p-4 lg:block">
                    <nav className="sticky top-20 space-y-3">
                        <a
                            href="#"
                            className="flex items-center space-x-3 rounded-xl bg-green-500 px-4 py-3 text-lg font-medium text-white hover:bg-green-600"
                        >
                            <Home className="h-6 w-6" />
                            <span>Home</span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 hover:bg-green-50 hover:text-green-600"
                        >
                            <Map className="h-6 w-6" />
                            <span>Markets</span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 hover:bg-green-50 hover:text-green-600"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            <span>Cart</span>
                        </a>
                        <a
                            href="#"
                            className="flex items-center space-x-3 rounded-xl px-4 py-3 text-lg text-gray-700 hover:bg-green-50 hover:text-green-600"
                        >
                            <MessageCircle className="h-6 w-6" />
                            <span>Chats</span>
                        </a>
                    </nav>
                </aside>

                {/* Masonry Feed */}
                <main className="flex-1 p-4 lg:border-r lg:border-gray-200/60">
                    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="mb-4 break-inside-avoid rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm hover:shadow-md"
                            >
                                <img src={post.img} alt="post" className="h-auto w-full rounded-t-2xl object-cover" loading="lazy" />
                                <div className="p-4">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                                        <span className="text-sm text-gray-500">{post.handle}</span>
                                        <span className="text-gray-400">·</span>
                                        <span className="text-sm text-gray-500">{post.time}</span>
                                    </div>
                                    <p className="mt-2 text-gray-800">{post.text}</p>
                                    <div className="mt-2 flex flex-wrap gap-2 text-sm">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-3 flex justify-between text-sm text-gray-500">
                                        {Object.entries(post.reactions).map(([key, count]) => (
                                            <button
                                                key={key}
                                                className="flex items-center space-x-1 rounded-full px-2 py-1 hover:bg-green-50 hover:text-green-600"
                                            >
                                                <span>{reactionEmojis[key as keyof typeof reactionEmojis]}</span>
                                                <span>{count}</span>
                                            </button>
                                        ))}
                                        <button className="rounded-full p-1 hover:bg-gray-50" aria-label="More options">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Sidebar Right */}
                <aside className="hidden w-80 p-4 lg:block">
                    <div className="sticky top-20 space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">🌍 Trending</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>#FarmersMarket</li>
                                <li>#CoffeeChat</li>
                                <li>#OrganicLovers</li>
                            </ul>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">🍲 Recipe Tip</h3>
                            <p className="text-sm text-gray-700">Grilled Veggie Bowl with sesame dressing 🌿</p>
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
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="mt-1 text-xs">Cart</span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <MessageCircle className="h-5 w-5" />
                    <span className="mt-1 text-xs">Chats</span>
                </a>
                <a href="#" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
                    <Map className="h-5 w-5" />
                    <span className="mt-1 text-xs">Markets</span>
                </a>
            </nav>

            {/* Floating Action Button */}
            <button
                className="fixed right-4 bottom-20 z-20 h-14 w-14 rounded-full bg-green-500 text-white shadow-lg hover:scale-105 hover:bg-green-600 lg:hidden"
                aria-label="Create new post"
            >
                <Plus className="mx-auto h-6 w-6" />
            </button>
        </div>
    );
};

export default HomePage;
