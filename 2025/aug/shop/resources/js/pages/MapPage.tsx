import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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

export default function MapPage() {
    return (
        <div className="h-screen w-full">
            <MapContainer
                center={[-15.3875, 28.3228]} // example: Lusaka, Zambia
                zoom={13}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                />
                <Marker position={[-15.3875, 28.3228]}>
                    <Popup>Hello from Lusaka 👋</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
