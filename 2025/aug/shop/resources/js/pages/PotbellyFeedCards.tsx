import { Calendar, CheckCircle, Clock, Heart, MapPin, MessageCircle, MoreHorizontal, Play, Share, ShoppingCart, Store, User } from 'lucide-react';
import { useState } from 'react';

const FeedCard = ({ children, className = '' }) => (
    <div className={`rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ avatar, name, username, time, type, location }) => (
    <div className="mb-4 flex items-start space-x-4">
        <div className={`h-12 w-12 rounded-full ${avatar} flex items-center justify-center`}>
            {type === 'store' && <Store className="h-6 w-6 text-white" />}
            {type === 'user' && <User className="h-6 w-6 text-white" />}
        </div>
        <div className="flex-1">
            <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{name}</h3>
                {username && <span className="text-sm text-gray-500">@{username}</span>}
                <span className="text-gray-400">·</span>
                <span className="text-sm text-gray-500">{time}</span>
            </div>
            {location && (
                <div className="mt-1 flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{location}</span>
                </div>
            )}
        </div>
        <button className="rounded-full p-2 hover:bg-gray-50">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </button>
    </div>
);

const CardActions = ({ likes = 0, comments = 0, shares = 0 }) => (
    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <button className="flex items-center space-x-2 text-gray-500 transition-colors hover:text-red-500">
            <Heart className="h-5 w-5" />
            <span className="text-sm">{likes}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 transition-colors hover:text-blue-500">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{comments}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 transition-colors hover:text-green-500">
            <Share className="h-5 w-5" />
            <span className="text-sm">{shares}</span>
        </button>
    </div>
);

// Store Product Card
const StoreProductCard = () => (
    <FeedCard>
        <CardHeader
            avatar="bg-gradient-to-r from-blue-500 to-purple-500"
            name="Fresh Valley Market"
            username="freshvalley"
            time="1h"
            type="store"
            location="Kabulonga, Lusaka"
        />

        <div className="mb-4 overflow-hidden rounded-xl">
            <img
                src="https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=400&h=300&fit=crop"
                alt="Organic Tomatoes"
                className="h-64 w-full object-cover"
            />
        </div>

        <div className="space-y-3">
            <div>
                <h3 className="text-lg font-semibold text-gray-900">Fresh Organic Tomatoes</h3>
                <p className="text-gray-600">Premium quality tomatoes, locally grown and pesticide-free</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">K25.00</span>
                    <span className="text-sm text-gray-500 line-through">K30.00</span>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">17% OFF</span>
                </div>
                <button className="flex items-center space-x-2 rounded-xl bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">#Organic</span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">#LocalFresh</span>
            </div>
        </div>

        <CardActions likes={24} comments={5} shares={3} />
    </FeedCard>
);

// Store Recipe Video Card
const StoreRecipeVideoCard = () => (
    <FeedCard>
        <CardHeader
            avatar="bg-gradient-to-r from-red-500 to-orange-500"
            name="Mama's Kitchen"
            username="mamaskitchen"
            time="3h"
            type="store"
            location="Town Center, Lusaka"
        />

        <div className="relative mb-4 overflow-hidden rounded-xl">
            <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
                alt="Cooking Video"
                className="h-64 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button className="rounded-full bg-white/90 p-4 text-red-500 transition-colors hover:bg-white">
                    <Play className="ml-1 h-8 w-8" />
                </button>
            </div>
            <div className="absolute bottom-4 left-4 rounded bg-black/70 px-2 py-1 text-xs text-white">5:23</div>
        </div>

        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">How to Make Perfect Nshima</h3>
            <p className="text-gray-600">Traditional Zambian recipe with modern techniques for the perfect texture</p>

            <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">#Recipe</span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700">#Traditional</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">#Cooking</span>
            </div>
        </div>

        <CardActions likes={156} comments={23} shares={45} />
    </FeedCard>
);

// User Food Photo Card
const UserFoodPhotoCard = () => (
    <FeedCard>
        <CardHeader
            avatar="bg-gradient-to-r from-green-400 to-blue-500"
            name="Sarah Mwanza"
            username="sarahmw"
            time="30m"
            type="user"
            location="Woodlands, Lusaka"
        />

        <div className="mb-4 overflow-hidden rounded-xl">
            <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
                alt="Delicious meal"
                className="h-64 w-full object-cover"
            />
        </div>

        <div className="space-y-3">
            <p className="leading-relaxed text-gray-800">
                Sunday dinner with the family! 🍽️ Nothing beats homemade ifisashi with kapenta and fresh vegetables from the garden 🌱
            </p>

            <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">#SundayDinner</span>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700">#Homemade</span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">#Family</span>
            </div>
        </div>

        <CardActions likes={42} comments={8} shares={2} />
    </FeedCard>
);

// Purchase Broadcast Card
const PurchaseBroadcastCard = () => (
    <FeedCard className="border-green-200 bg-green-50/50">
        <CardHeader avatar="bg-gradient-to-r from-purple-500 to-pink-500" name="Mike Banda" username="mikeb" time="15m" type="user" />

        <div className="space-y-3 rounded-xl border border-green-200 bg-white p-4">
            <div className="flex items-center space-x-2 text-green-700">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-semibold">Purchase Complete</span>
            </div>

            <div className="flex items-center space-x-4">
                <img
                    src="https://images.unsplash.com/photo-1608270586620-248524c67de9?w=80&h=80&fit=crop"
                    alt="Heineken"
                    className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">6-Pack Heineken Beer</h4>
                    <p className="text-sm text-gray-600">
                        from <strong>City Liquor Store</strong>
                    </p>
                    <p className="text-lg font-bold text-green-600">K120.00</p>
                </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>Cairo Road, Lusaka</span>
            </div>
        </div>

        <CardActions likes={12} comments={3} shares={1} />
    </FeedCard>
);

// Event Attendance Card
const EventAttendanceCard = () => (
    <FeedCard className="border-blue-200 bg-blue-50/50">
        <CardHeader avatar="bg-gradient-to-r from-yellow-500 to-red-500" name="Jane Phiri" username="janep" time="2h" type="user" />

        <div className="space-y-3 rounded-xl border border-blue-200 bg-white p-4">
            <div className="flex items-center space-x-2 text-blue-700">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Attending Event</span>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900">Jane's Weekend Braai 🔥</h4>
                <p className="text-sm text-gray-600">Join us for an amazing weekend braai with great food and music!</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Saturday, 2:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Chelstone, Lusaka</span>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">23 people attending</span>
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-r from-green-400 to-blue-500"></div>
                    ))}
                </div>
            </div>
        </div>

        <CardActions likes={34} comments={12} shares={8} />
    </FeedCard>
);

// Check-in Card
const CheckInCard = () => (
    <FeedCard className="border-purple-200 bg-purple-50/50">
        <CardHeader avatar="bg-gradient-to-r from-indigo-500 to-purple-500" name="David Mulenga" username="davidm" time="just now" type="user" />

        <div className="space-y-3 rounded-xl border border-purple-200 bg-white p-4">
            <div className="flex items-center space-x-2 text-purple-700">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">Checked In</span>
            </div>

            <div>
                <h4 className="font-semibold text-gray-900">Manda Hill Shopping Mall</h4>
                <p className="text-sm text-gray-600">Great shopping experience! Found everything I needed 🛍️</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>2:45 PM</span>
                </div>
                <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Verified Location</span>
                </div>
            </div>
        </div>

        <CardActions likes={8} comments={2} shares={0} />
    </FeedCard>
);

// User Recipe Video Card
const UserRecipeVideoCard = () => (
    <FeedCard>
        <CardHeader
            avatar="bg-gradient-to-r from-pink-500 to-red-500"
            name="Grace Sakala"
            username="graces"
            time="1d"
            type="user"
            location="Matero, Lusaka"
        />

        <div className="relative mb-4 overflow-hidden rounded-xl">
            <img
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop"
                alt="Cooking Video"
                className="h-64 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button className="rounded-full bg-white/90 p-4 text-red-500 transition-colors hover:bg-white">
                    <Play className="ml-1 h-8 w-8" />
                </button>
            </div>
            <div className="absolute bottom-4 left-4 rounded bg-black/70 px-2 py-1 text-xs text-white">3:45</div>
        </div>

        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Quick Kapenta Curry Recipe</h3>
            <p className="text-gray-600">My grandmother's secret recipe! Perfect for busy weeknights 👵🏿✨</p>

            <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">#Recipe</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">#QuickMeal</span>
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">#Kapenta</span>
            </div>
        </div>

        <CardActions likes={89} comments={15} shares={23} />
    </FeedCard>
);

const PotbellyFeedCards = () => {
    const [currentCard, setCurrentCard] = useState(0);

    const cards = [
        { component: <StoreProductCard />, title: 'Store Product Card' },
        { component: <StoreRecipeVideoCard />, title: 'Store Recipe Video Card' },
        { component: <UserFoodPhotoCard />, title: 'User Food Photo Card' },
        { component: <UserRecipeVideoCard />, title: 'User Recipe Video Card' },
        { component: <PurchaseBroadcastCard />, title: 'Purchase Broadcast Card' },
        { component: <EventAttendanceCard />, title: 'Event Attendance Card' },
        { component: <CheckInCard />, title: 'Check-in Card' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4">
            <div className="mx-auto max-w-2xl space-y-6">
                {/* Header */}
                <div className="space-y-2 text-center">
                    <h1 className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-3xl font-bold text-transparent">
                        POTBELLY Feed Cards
                    </h1>
                    <p className="text-gray-600">Interactive preview of all feed card types</p>
                </div>

                {/* Card Navigation */}
                <div className="flex flex-wrap justify-center gap-2">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentCard(index)}
                            className={`rounded-full px-3 py-1 text-sm transition-colors ${
                                currentCard === index ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-green-50'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* Current Card Display */}
                <div className="space-y-4">
                    <h2 className="text-center text-xl font-semibold text-gray-800">{cards[currentCard].title}</h2>
                    {cards[currentCard].component}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={() => setCurrentCard((prev) => (prev > 0 ? prev - 1 : cards.length - 1))}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentCard((prev) => (prev < cards.length - 1 ? prev + 1 : 0))}
                        className="rounded-xl bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
                    >
                        Next
                    </button>
                </div>

                {/* All Cards Preview */}
                <div className="pt-8">
                    <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">All Feed Cards</h2>
                    <div className="space-y-6">
                        {cards.map((card, index) => (
                            <div key={index} className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
                                {card.component}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PotbellyFeedCards;
