import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

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

type Category = 'events' | 'checkins' | 'food' | 'places';

const markersData: Record<Category, { position: [number, number]; label: string }[]> = {
    events: [
        { position: [-15.3875, 28.3228], label: 'Music Festival 🎶' },
        { position: [-15.4, 28.33], label: 'Tech Meetup 💻' },
    ],
    checkins: [{ position: [-15.39, 28.325], label: 'John checked in 📍' }],
    food: [
        { position: [-15.395, 28.31], label: 'Best Pizza 🍕' },
        { position: [-15.38, 28.32], label: 'Local Cafe ☕' },
    ],
    places: [
        { position: [-15.389, 28.34], label: 'National Museum 🏛️' },
        { position: [-15.37, 28.315], label: 'Park 🌳' },
    ],
};

export default function MapPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('events');

    return (
        <div className="flex h-screen w-full flex-col">
            {/* Filter bar */}
            <div className="z-10 flex gap-2 bg-white p-2 shadow-md">
                {(['events', 'checkins', 'food', 'places'] as Category[]).map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            activeCategory === cat ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Map */}
            <div className="flex-1">
                <MapContainer center={[-15.3875, 28.3228]} zoom={13} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    />

                    {markersData[activeCategory].map((marker, i) => (
                        <Marker key={i} position={marker.position}>
                            <Popup>{marker.label}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
