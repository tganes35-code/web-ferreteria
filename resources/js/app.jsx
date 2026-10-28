import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { CartProvider } from './Contexts/CartContext';
import { FavoritesProvider } from './Contexts/FavoritesContext';
import StoreCart from './Components/StoreCart';

createInertiaApp({
    title: (title) => `${title} | Ferretería La Rebaja`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <FavoritesProvider>
                <CartProvider>
                    <App {...props} />
                    <StoreCart />
                </CartProvider>
            </FavoritesProvider>
        );
    },
});
