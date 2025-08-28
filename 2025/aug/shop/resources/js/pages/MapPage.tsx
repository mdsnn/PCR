import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

// Import Leaflet MarkerCluster CSS and JS from CDN
// Add these to your HTML head or import them:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.css" />
// <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.min.js"></script>

// Fix default marker issue in Leaflet + Webpack/Vite
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom colored icons for different categories
const createColoredIcon = (color: string) =>
    L.divIcon({
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        className: 'custom-marker',
    });

const categoryIcons = {
    events: createColoredIcon('#8B5CF6'), // Purple
    checkins: createColoredIcon('#10B981'), // Green
    food: createColoredIcon('#F59E0B'), // Amber
    places: createColoredIcon('#EF4444'), // Red
};

type Category = 'events' | 'checkins' | 'food' | 'places';

interface MarkerData {
    id: string;
    position: [number, number];
    label: string;
    description?: string;
    timestamp?: string;
}

const markersData: Record<Category, MarkerData[]> = {
    events: [
        {
            id: 'event-1',
            position: [-15.3875, 28.3228],
            label: 'Music Festival 🎶',
            description: 'Annual music festival featuring local and international artists',
            timestamp: '2025-09-15',
        },
        {
            id: 'event-2',
            position: [-15.4, 28.33],
            label: 'Tech Meetup 💻',
            description: 'Monthly gathering for developers and tech enthusiasts',
            timestamp: '2025-08-30',
        },
        {
            id: 'event-3',
            position: [-15.385, 28.328],
            label: 'Art Exhibition 🎨',
            description: 'Contemporary art showcase',
            timestamp: '2025-09-01',
        },
        {
            id: 'event-4',
            position: [-15.392, 28.335],
            label: 'Food Market 🏪',
            description: "Weekly farmer's market",
            timestamp: 'Every Saturday',
        },
        {
            id: 'event-5',
            position: [-15.386, 28.33],
            label: 'Workshop 🔧',
            description: 'DIY workshop for beginners',
            timestamp: '2025-09-10',
        },
    ],
    checkins: [
        {
            id: 'checkin-1',
            position: [-15.39, 28.325],
            label: 'John checked in 📍',
            description: 'Recent visitor activity',
            timestamp: '2 hours ago',
        },
        {
            id: 'checkin-2',
            position: [-15.388, 28.327],
            label: 'Sarah checked in 📍',
            description: 'Recent visitor activity',
            timestamp: '5 hours ago',
        },
        {
            id: 'checkin-3',
            position: [-15.391, 28.329],
            label: 'Mike checked in 📍',
            description: 'Recent visitor activity',
            timestamp: '1 day ago',
        },
        {
            id: 'checkin-4',
            position: [-15.387, 28.324],
            label: 'Anna checked in 📍',
            description: 'Recent visitor activity',
            timestamp: '3 hours ago',
        },
    ],
    food: [
        {
            id: 'food-1',
            position: [-15.395, 28.31],
            label: 'Best Pizza 🍕',
            description: 'Authentic wood-fired pizza with fresh ingredients',
            timestamp: 'Open now',
        },
        {
            id: 'food-2',
            position: [-15.38, 28.32],
            label: 'Local Cafe ☕',
            description: 'Specialty coffee and homemade pastries',
            timestamp: 'Open until 6 PM',
        },
        {
            id: 'food-3',
            position: [-15.393, 28.315],
            label: 'Street Food Hub 🌮',
            description: 'Variety of local street food vendors',
            timestamp: 'Open evenings',
        },
        {
            id: 'food-4',
            position: [-15.387, 28.318],
            label: 'Fine Dining 🍽️',
            description: 'Upscale restaurant with international cuisine',
            timestamp: 'Reservations recommended',
        },
        {
            id: 'food-5',
            position: [-15.396, 28.312],
            label: 'Burger Joint 🍔',
            description: 'Gourmet burgers and craft beer',
            timestamp: 'Open until midnight',
        },
    ],
    places: [
        {
            id: 'place-1',
            position: [-15.389, 28.34],
            label: 'National Museum 🏛️',
            description: 'Explore local history and cultural artifacts',
            timestamp: 'Mon-Sat 9AM-5PM',
        },
        {
            id: 'place-2',
            position: [-15.37, 28.315],
            label: 'Park 🌳',
            description: 'Beautiful green space perfect for relaxation',
            timestamp: 'Always open',
        },
        {
            id: 'place-3',
            position: [-15.396, 28.342],
            label: 'Shopping Center 🛍️',
            description: 'Modern shopping complex with various stores',
            timestamp: 'Daily 9AM-9PM',
        },
        {
            id: 'place-4',
            position: [-15.375, 28.308],
            label: 'Cultural Center 🎭',
            description: 'Hub for arts and cultural activities',
            timestamp: 'Check schedule',
        },
        {
            id: 'place-5',
            position: [-15.384, 28.338],
            label: 'Library 📚',
            description: 'Public library with study spaces',
            timestamp: 'Mon-Fri 8AM-8PM',
        },
    ],
};

const categoryLabels = {
    events: 'Events',
    checkins: 'Check-ins',
    food: 'Food & Drink',
    places: 'Places',
};

// Component to handle map view updates when category changes
function MapController({ category }: { category: Category }) {
    const map = useMap();

    useEffect(() => {
        const markers = markersData[category];
        if (markers.length > 0) {
            const group = new L.FeatureGroup(markers.map((marker) => L.marker(marker.position)));
            map.fitBounds(group.getBounds(), { padding: [20, 20] });
        }
    }, [category, map]);

    return null;
}

// Custom clustering component using native Leaflet (with fallback)
function ClusterLayer({
    markers,
    category,
    onMarkerClick,
}: {
    markers: MarkerData[];
    category: Category;
    onMarkerClick: (marker: MarkerData) => void;
}) {
    const map = useMap();
    const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
    const regularMarkersRef = useRef<L.Marker[]>([]);

    useEffect(() => {
        // Clean up existing markers/clusters
        if (clusterGroupRef.current) {
            map.removeLayer(clusterGroupRef.current);
            clusterGroupRef.current = null;
        }

        regularMarkersRef.current.forEach((marker) => {
            map.removeLayer(marker);
        });
        regularMarkersRef.current = [];

        // Try to use clustering if available, otherwise fallback to regular markers
        const usesClustering = typeof (L as any).MarkerClusterGroup !== 'undefined';

        if (usesClustering) {
            // Create new cluster group with custom styling
            const clusterGroup = new (L as any).MarkerClusterGroup({
                maxClusterRadius: 50,
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true,
                iconCreateFunction: function (cluster: any) {
                    const count = cluster.getChildCount();
                    const color = getCategoryColor(category);

                    return L.divIcon({
                        html: `<div style="
                            background-color: ${color}; 
                            color: white; 
                            border-radius: 50%; 
                            width: 35px; 
                            height: 35px; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            font-weight: bold; 
                            font-size: 12px;
                            border: 3px solid white;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                        ">${count}</div>`,
                        className: 'custom-cluster-icon',
                        iconSize: L.point(35, 35, true),
                    });
                },
            });

            // Add markers to cluster group
            markers.forEach((marker) => {
                const leafletMarker = L.marker(marker.position, {
                    icon: categoryIcons[category],
                });

                leafletMarker.bindPopup(`
                    <div style="min-width: 200px;">
                        <h4 style="margin: 0 0 8px 0; font-weight: 600;">${marker.label}</h4>
                        ${marker.description ? `<p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${marker.description}</p>` : ''}
                        ${marker.timestamp ? `<p style="margin: 0; font-size: 12px; color: #999;">${marker.timestamp}</p>` : ''}
                    </div>
                `);

                leafletMarker.on('click', () => {
                    onMarkerClick(marker);
                });

                clusterGroup.addLayer(leafletMarker);
            });

            map.addLayer(clusterGroup);
            clusterGroupRef.current = clusterGroup;
        } else {
            // Fallback: Add regular markers without clustering
            console.info('Using regular markers (clustering not available)');

            markers.forEach((marker) => {
                const leafletMarker = L.marker(marker.position, {
                    icon: categoryIcons[category],
                });

                leafletMarker.bindPopup(`
                    <div style="min-width: 200px;">
                        <h4 style="margin: 0 0 8px 0; font-weight: 600;">${marker.label}</h4>
                        ${marker.description ? `<p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${marker.description}</p>` : ''}
                        ${marker.timestamp ? `<p style="margin: 0; font-size: 12px; color: #999;">${marker.timestamp}</p>` : ''}
                    </div>
                `);

                leafletMarker.on('click', () => {
                    onMarkerClick(marker);
                });

                map.addLayer(leafletMarker);
                regularMarkersRef.current.push(leafletMarker);
            });
        }

        // Cleanup function
        return () => {
            if (clusterGroupRef.current) {
                map.removeLayer(clusterGroupRef.current);
            }
            regularMarkersRef.current.forEach((marker) => {
                map.removeLayer(marker);
            });
        };
    }, [markers, category, map, onMarkerClick]);

    return null;
}

// Mobile List View Component
function MobileListView({
    category,
    onSelectMarker,
    onClose,
}: {
    category: Category;
    onSelectMarker: (marker: MarkerData) => void;
    onClose: () => void;
}) {
    const markers = markersData[category];

    return (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-white p-4">
                <div>
                    <h2 className="text-lg font-semibold">{categoryLabels[category]}</h2>
                    <p className="text-sm text-gray-600">{markers.length} locations</p>
                </div>
                <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Search bar in mobile list */}
            <div className="border-b bg-gray-50 p-4">
                <input
                    type="text"
                    placeholder={`Search ${categoryLabels[category].toLowerCase()}...`}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--my-green)] focus:ring-1 focus:ring-[var(--my-green)] focus:outline-none"
                />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-3 p-4">
                    {markers.map((marker, index) => (
                        <div
                            key={marker.id}
                            onClick={() => {
                                onSelectMarker(marker);
                                onClose();
                            }}
                            className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-[var(--my-green)] hover:shadow-md active:scale-98"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex flex-col items-center">
                                    <div
                                        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-md"
                                        style={{ backgroundColor: getCategoryColor(category) }}
                                    >
                                        {index + 1}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{marker.label}</h3>
                                    {marker.description && <p className="mt-1 text-sm text-gray-600">{marker.description}</p>}
                                    {marker.timestamp && (
                                        <div className="mt-2 flex items-center gap-1">
                                            <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <p className="text-xs text-gray-500">{marker.timestamp}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    <button
                                        className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle directions
                                        }}
                                    >
                                        <svg className="h-3 w-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom action bar */}
            <div className="border-t bg-white p-4">
                <div className="flex gap-2">
                    <button onClick={onClose} className="flex-1 rounded-lg bg-[var(--my-green)] px-4 py-3 text-sm font-medium text-white">
                        Back to Map
                    </button>
                    <button className="rounded-lg border border-gray-300 px-4 py-3">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MapPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('events');
    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
    const [showMobileList, setShowMobileList] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const currentMarkers = markersData[activeCategory];
    const markerCount = Object.values(markersData).flat().length;

    return (
        <div className="flex h-screen w-full flex-col bg-gray-50">
            {/* Enhanced header with stats */}
            <div className="z-10 bg-white p-4 shadow-md">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">Discover Nearby</h1>
                        <p className="text-sm text-gray-600">
                            Showing {currentMarkers.length} {categoryLabels[activeCategory].toLowerCase()} • {markerCount} total locations
                        </p>
                    </div>

                    {/* Desktop search input */}
                    <div className="hidden md:flex">
                        <input
                            type="text"
                            placeholder="Search locations..."
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--my-green)] focus:ring-1 focus:ring-[var(--my-green)] focus:outline-none"
                        />
                    </div>

                    {/* Mobile controls */}
                    <div className="flex gap-2 md:hidden">
                        <button onClick={() => setShowMobileList(true)} className="rounded-lg bg-[var(--my-green)] p-2 text-white" title="List view">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button className="rounded-lg border border-gray-300 bg-white p-2 text-gray-600" title="Search">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Category filters */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {(['events', 'checkins', 'food', 'places'] as Category[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                activeCategory === cat
                                    ? 'bg-[var(--my-green)] text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                            }`}
                        >
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getCategoryColor(cat) }} />
                            <span className="hidden sm:inline">{categoryLabels[cat]}</span>
                            <span className="sm:hidden">{cat}</span>
                            <span className="ml-1 rounded-full bg-black/10 px-2 py-0.5 text-xs">{markersData[cat].length}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop sidebar for selected marker details */}
                {selectedMarker && !isMobile && (
                    <div className="w-80 overflow-y-auto bg-white p-4 shadow-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-4 w-4 rounded-full border-2 border-white shadow-md"
                                        style={{ backgroundColor: getCategoryColor(activeCategory) }}
                                    />
                                    <h3 className="text-lg font-semibold text-gray-900">{selectedMarker.label}</h3>
                                </div>
                                {selectedMarker.description && <p className="mt-2 text-sm text-gray-600">{selectedMarker.description}</p>}
                                {selectedMarker.timestamp && (
                                    <div className="mt-2 flex items-center gap-1">
                                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p className="text-xs text-gray-500">{selectedMarker.timestamp}</p>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setSelectedMarker(null)} className="ml-4 rounded-full p-1 hover:bg-gray-100">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-4 space-y-2">
                            <button className="w-full rounded-lg bg-[var(--my-green)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--my-green)]/90">
                                Get Directions
                            </button>
                            <div className="flex gap-2">
                                <button className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Share
                                </button>
                                <button className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Additional info section */}
                        <div className="mt-6 rounded-lg bg-gray-50 p-3">
                            <h4 className="text-sm font-medium text-gray-900">Location Details</h4>
                            <div className="mt-2 space-y-1 text-xs text-gray-600">
                                <p>Lat: {selectedMarker.position[0].toFixed(6)}</p>
                                <p>Lng: {selectedMarker.position[1].toFixed(6)}</p>
                                <p>Category: {categoryLabels[activeCategory]}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Map container */}
                <div className="relative flex-1">
                    <MapContainer center={[-15.3875, 28.3228]} zoom={13} className="h-full w-full" zoomControl={true}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                        />

                        <MapController category={activeCategory} />

                        {/* Custom clustering layer */}
                        <ClusterLayer markers={currentMarkers} category={activeCategory} onMarkerClick={setSelectedMarker} />
                    </MapContainer>

                    {/* Map overlay controls */}
                    <div className="absolute top-4 left-4 z-10 rounded-lg bg-white p-2 shadow-md">
                        <div className="text-xs text-gray-600">Zoom to see individual markers</div>
                    </div>
                </div>
            </div>

            {/* Mobile selected marker bottom sheet */}
            {selectedMarker && isMobile && (
                <div className="border-t bg-white shadow-lg">
                    <div className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-4 w-4 rounded-full border-2 border-white shadow-md"
                                        style={{ backgroundColor: getCategoryColor(activeCategory) }}
                                    />
                                    <h3 className="font-semibold text-gray-900">{selectedMarker.label}</h3>
                                </div>
                                {selectedMarker.description && <p className="mt-1 text-sm text-gray-600">{selectedMarker.description}</p>}
                                {selectedMarker.timestamp && <p className="mt-1 text-xs text-gray-500">{selectedMarker.timestamp}</p>}
                            </div>
                            <button onClick={() => setSelectedMarker(null)} className="ml-4 rounded-full p-1 hover:bg-gray-100">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-3 flex gap-2">
                            <button className="flex-1 rounded-lg bg-[var(--my-green)] px-3 py-2 text-sm font-medium text-white">Directions</button>
                            <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm">Share</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile List View Modal */}
            {showMobileList && (
                <MobileListView
                    category={activeCategory}
                    onSelectMarker={(marker) => {
                        setSelectedMarker(marker);
                        setShowMobileList(false);
                    }}
                    onClose={() => setShowMobileList(false)}
                />
            )}
        </div>
    );
}

// Helper function for category colors
function getCategoryColor(category: Category): string {
    const colors = {
        events: '#8B5CF6',
        checkins: '#10B981',
        food: '#F59E0B',
        places: '#EF4444',
    };
    return colors[category];
}
