import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import 'leaflet/dist/leaflet.css';
import type { DefineComponent } from 'vue';
import '../css/app.css';

import L from 'leaflet';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { createApp, h, ref } from 'vue';
import SplashScreen from './components/SplashScreen.vue'; // Import your splash screen component

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: iconShadow,
});

import { ZiggyVue } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'POTBELLY';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({
            setup() {
                const splashDone = ref(false);

                const handleSplashComplete = () => {
                    splashDone.value = true;
                };

                return () => {
                    if (!splashDone.value) {
                        return h(SplashScreen, {
                            onComplete: handleSplashComplete,
                        });
                    }

                    return h(App, props);
                };
            },
        });

        app.use(plugin).use(ZiggyVue).mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
