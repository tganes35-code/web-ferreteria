import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import Toast from '../Components/Toast';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'ferreteria-la-rebaja-favorites';

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [toast, setToast] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch (err) {
            console.error('Error al guardar favoritos:', err);
        }
    }, [favorites]);

    const showToast = (message) => {
        setToast({ id: Date.now(), message });
        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    const isFavorite = (productId) => {
        return favorites.some((item) => (typeof item === 'object' ? item.id === productId : item === productId));
    };

    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const exists = prev.some((item) => (typeof item === 'object' ? item.id === product.id : item === product.id));
            if (exists) {
                showToast(`Quitado de favoritos: ${product.name}`);
                return prev.filter((item) => (typeof item === 'object' ? item.id !== product.id : item !== product.id));
            } else {
                showToast(`Guardado en favoritos: ${product.name}`);
                return [...prev, product];
            }
        });
    };

    const removeFavorite = (productId) => {
        setFavorites((prev) => prev.filter((item) => (typeof item === 'object' ? item.id !== productId : item !== productId)));
    };

    const value = useMemo(
        () => ({
            favorites,
            isFavorite,
            toggleFavorite,
            removeFavorite,
            count: favorites.length,
        }),
        [favorites]
    );

    return (
        <FavoritesContext.Provider value={value}>
            {children}
            <Toast toast={toast} onClose={() => setToast(null)} />
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
    return context;
}
