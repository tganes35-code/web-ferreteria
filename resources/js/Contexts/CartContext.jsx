import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import Toast from '../Components/Toast';

const CartContext = createContext(null);
const storageKey = 'ferreteria-la-rebaja-cart-v3';

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
            return [];
        } catch {
            return [];
        }
    });
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items]);

    const showToast = (message) => {
        setToast({ id: Date.now(), message });
        setTimeout(() => {
            setToast((current) => (current?.id === toast?.id ? null : current));
        }, 3500);
    };

    const add = (product) => {
        if (product.stock < 1) return;

        setItems((current) => {
            const existing = current.find((item) => item.productId === product.id);
            if (existing) {
                return current.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: Math.min(item.stock, item.quantity + 1) }
                        : item
                );
            }
            return [
                ...current,
                {
                    productId: product.id,
                    name: product.name,
                    price: product.sale_price ?? product.price,
                    image: product.images?.[0] || '/images/realistic/electricas.jpg',
                    stock: product.stock,
                    quantity: 1
                }
            ];
        });

        showToast(`${product.name} agregado al carrito`);
    };

    const change = (productId, amount) => {
        setItems((current) =>
            current.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: Math.min(item.stock, Math.max(1, item.quantity + amount)) }
                    : item
            )
        );
    };

    const remove = (productId) => {
        setItems((current) => current.filter((item) => item.productId !== productId));
    };

    const value = useMemo(
        () => ({
            items,
            open,
            openCart: () => setOpen(true),
            closeCart: () => setOpen(false),
            add,
            change,
            remove
        }),
        [items, open]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
            <Toast toast={toast} onClose={() => setToast(null)} />
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart debe usarse dentro de CartProvider.');
    return context;
}
