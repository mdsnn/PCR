import 'leaflet/dist/leaflet.css';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import SplashScreen from './components/SplashScreen'; // Import your splash screen component

const appName = import.meta.env.VITE_APP_NAME || 'POTBELLY';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const MainApp = () => {
            const [splashDone, setSplashDone] = useState(false);

            return (
                <>
                    {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
                    {splashDone && <App {...props} />}
                </>
            );
        };

        root.render(<MainApp />);
    },
    progress: {
        color: '#4B5563',
    },
});
