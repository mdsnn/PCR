import { Bell, Home, Map, MessageCircle, MoreHorizontal, Plus, Search, ShoppingCart, Minus, Trash2, MapPin } from 'lucide-react';

const CartPage = () => {
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
                            className="flex items-center space-x-3 rounded-xl bg-green-500 px-4 py-3 text-lg font-medium text-white transition-all hover:bg-green-600"
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

                {/* Cart Content */}
                <main className="flex-1 p-4 lg:border-r lg:border-gray-200/60">
                    <div className="space-y-6">
                        {/* Page Title */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-gray-900">My Cart</h2>
                            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                                5 items
                            </span>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-4">
                            {/* Cart Item 1 */}
                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm hover:shadow-md">
                                <div className="flex items-start space-x-4">
                                    <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-orange-400 to-red-500"></div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Fresh Tomatoes</h3>
                                                <p className="text-sm text-gray-600">From Kalundu Fresh Market</p>
                                                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>1.2km away</span>
                                                </div>
                                            </div>
                                            <button className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">2</span>
                                                <button className="rounded-full bg-green-100 p-2 text-green-600 hover:bg-green-200">
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <span className="text-lg font-semibold text-green-600">K25.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cart Item 2 */}
                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm hover:shadow-md">
                                <div className="flex items-start space-x-4">
                                    <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-green-400 to-blue-500"></div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Organic Spinach</h3>
                                                <p className="text-sm text-gray-600">From UNC Joe Veggies</p>
                                                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>2.1km away</span>
                                                </div>
                                            </div>
                                            <button className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">1</span>
                                                <button className="rounded-full bg-green-100 p-2 text-green-600 hover:bg-green-200">
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <span className="text-lg font-semibold text-green-600">K15.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cart Item 3 */}
                            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm hover:shadow-md">
                                <div className="flex items-start space-x-4">
                                    <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Fresh Bread</h3>
                                                <p className="text-sm text-gray-600">From Anna's Food Truck</p>
                                                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>0.8km away</span>
                                                </div>
                                            </div>
                                            <button className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">3</span>
                                                <button className="rounded-full bg-green-100 p-2 text-green-600 hover:bg-green-200">
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <span className="text-lg font-semibold text-green-600">K30.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Order Summary */}
                <aside className="hidden w-80 p-4 lg:block">
                    <div className="sticky top-20 space-y-6">
                        {/* Order Summary */}
                        <div className="rounded-xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">K70.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Fee</span>
                                    <span className="font-medium">K5.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Service Fee</span>
                                    <span className="font-medium">K2.00</span>
                                </div>
                                <hr className="border-gray-200" />
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span className="text-green-600">K77.00</span>
                                </div>
                            </div>
                            <button className="mt-6 w-full rounded-xl bg-green-500 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-green-600">
                                Checkout
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">🚚 Delivery Info</h3>
                            <p className="text-sm text-gray-700">Estimated delivery: 45-60 mins</p>
                            <p className="text-sm text-gray-700">Delivery to: Lusaka Central</p>
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
                <a href="#" className="relative flex flex-col items-center p-2 text-green-600">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="mt-1 text-xs font-medium">Cart</span>
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

export default CartPage;