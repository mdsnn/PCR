const HomePage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <h1 className="text-xl font-bold">Your App Logo/Title</h1>
                    {/* Add search bar or other header elements here */}
                </div>
            </header>

            {/* Main Layout */}
            <div className="mx-auto flex max-w-7xl flex-1">
                {/* Left Sidebar (visible on desktop) */}
                <aside className="hidden w-64 border-r border-gray-200 p-4 lg:block">
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-lg hover:text-blue-500">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-lg hover:text-blue-500">
                                    Explore
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-lg hover:text-blue-500">
                                    Notifications
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-lg hover:text-blue-500">
                                    Messages
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-lg hover:text-blue-500">
                                    Profile
                                </a>
                            </li>
                            {/* Add more navigation items */}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content Column */}
                <main className="flex-1 p-4 lg:border-r lg:border-gray-200">
                    <div className="space-y-4">
                        {/* Placeholder for posts/feed */}
                        <div className="rounded-lg border-b border-gray-200 bg-white p-4">Post 1 content...</div>
                        <div className="rounded-lg border-b border-gray-200 bg-white p-4">Post 2 content...</div>
                        {/* Add dynamic content here */}
                    </div>
                </main>

                {/* Right Sidebar (visible on desktop) */}
                <aside className="hidden w-80 p-4 lg:block">
                    <div className="space-y-6">
                        <div className="trends">
                            <h3 className="text-lg font-semibold">Trends</h3>
                            <ul className="mt-2 space-y-2">
                                <li className="rounded p-2 text-sm hover:bg-gray-100">Trend 1</li>
                                <li className="rounded p-2 text-sm hover:bg-gray-100">Trend 2</li>
                                {/* Add trends */}
                            </ul>
                        </div>
                        <div className="who-to-follow">
                            <h3 className="text-lg font-semibold">Who to follow</h3>
                            <ul className="mt-2 space-y-2">
                                <li className="rounded p-2 text-sm hover:bg-gray-100">User 1</li>
                                <li className="rounded p-2 text-sm hover:bg-gray-100">User 2</li>
                                {/* Add suggestions */}
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Bottom Navigation (visible on mobile) */}
            <nav className="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t border-gray-200 bg-white py-2 lg:hidden">
                <a href="#" className="text-sm hover:text-blue-500">
                    Home
                </a>
                <a href="#" className="text-sm hover:text-blue-500">
                    Explore
                </a>
                <a href="#" className="text-sm hover:text-blue-500">
                    Notifications
                </a>
                <a href="#" className="text-sm hover:text-blue-500">
                    Messages
                </a>
                <a href="#" className="text-sm hover:text-blue-500">
                    Profile
                </a>
            </nav>
        </div>
    );
};

export default HomePage;
