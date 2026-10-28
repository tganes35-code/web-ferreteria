import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Minus, Plus, Trash2, X, ShoppingBag, ArrowRight, ShieldCheck, MapPin, User, Phone, Mail } from 'lucide-react';


export default function CartDrawer({ items, open, close, change, remove }) {
    const [customer, setCustomer] = useState({ name: '', phone: '', email: '', address: '' });
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);

    const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

    useEffect(() => {
        if (!open) return undefined;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') close();
        };
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, close]);

    const checkout = async (event) => {
        event.preventDefault();
        setSending(true);
        setError('');
        try {
            const response = await fetch('/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                },
                body: JSON.stringify({
                    customer,
                    items: items.map((item) => ({ product_id: item.productId, quantity: item.quantity }))
                })
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(
                    result.message ||
                    Object.values(result.errors || {}).flat().join(' ') ||
                    'No pudimos crear el pedido.'
                );
            }
            window.open(result.whatsapp_url, '_blank', 'noopener,noreferrer');
        } catch (checkoutError) {
            setError(checkoutError.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm" onClick={close} role="presentation">
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-title"
                        onClick={(event) => event.stopPropagation()}
                        className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl border-l border-gray-200 font-body"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between border-b border-zinc-800 bg-[#111111] px-6 py-5 text-white">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5B400]/20 text-[#F5B400]">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <h2 id="cart-title" className="font-heading font-extrabold text-2xl uppercase tracking-wider text-white">
                                        Tu Carrito de Compras
                                    </h2>
                                    <p className="font-body text-xs text-zinc-400">
                                        {items.length} {items.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={close}
                                aria-label="Cerrar carrito"
                                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length ? (
                                items.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="flex gap-4 rounded-xl border border-gray-200 bg-[#F5F5F5] p-3.5 transition-all hover:bg-white hover:shadow-sm"
                                    >
                                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white p-2 border border-gray-200 flex items-center justify-center">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-contain mix-blend-multiply"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <h3 className="font-body font-semibold text-sm text-gray-900 leading-tight">
                                                    {item.name}
                                                </h3>
                                                <p className="font-price font-bold text-base text-[#C81010] mt-1">
                                                    ${Number(item.price).toLocaleString('es-CO')}
                                                </p>
                                            </div>

                                            <div className="mt-2 flex items-center justify-between">
                                                <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => change(item.productId, -1)}
                                                        aria-label={`Disminuir ${item.name}`}
                                                        className="rounded p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-price text-xs font-bold text-gray-800" aria-live="polite">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => change(item.productId, 1)}
                                                        aria-label={`Aumentar ${item.name}`}
                                                        disabled={item.quantity >= item.stock}
                                                        className="rounded p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => remove(item.productId)}
                                                    className="flex items-center gap-1 rounded-lg p-1.5 text-xs text-[#C81010] hover:bg-red-50 transition-colors"
                                                    aria-label={`Eliminar ${item.name}`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center py-12 text-center font-body">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
                                        <ShoppingBag size={32} />
                                    </div>
                                    <h3 className="font-heading font-extrabold text-2xl text-gray-800 uppercase">Tu carrito está vacío</h3>
                                    <p className="mt-1 text-xs text-gray-500 font-medium max-w-xs">
                                        Explora nuestro catálogo y agrega las herramientas que necesites para tus proyectos.
                                    </p>
                                    <a
                                        href="/catalogo"
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#111111] px-5 py-2.5 font-body font-bold text-xs uppercase text-white hover:bg-zinc-800 transition-colors shadow-md"
                                    >
                                        Explorar productos <ArrowRight size={14} />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Order Form & Footer */}
                        {items.length > 0 && (
                            <form onSubmit={checkout} className="border-t border-gray-200 bg-[#F5F5F5] p-6 space-y-3 font-body">
                                <div className="mb-4 rounded-xl bg-white p-3.5 border border-gray-200 shadow-sm space-y-1.5">
                                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                                        <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                                        <span className="font-price font-semibold">${total.toLocaleString('es-CO')}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                                        <span className="flex items-center gap-1"><ShieldCheck size={14} /> Envío en Ibagué</span>
                                        <span>A acordar</span>
                                    </div>
                                    <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
                                        <span className="font-heading font-bold text-xl text-gray-900 uppercase">Total Estimado</span>
                                        <span className="font-price font-bold text-2xl text-[#C81010]">${total.toLocaleString('es-CO')}</span>
                                    </div>
                                </div>

                                <p className="font-body font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">
                                    Datos para la entrega
                                </p>

                                <div className="relative">
                                    <User size={15} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        required
                                        aria-label="Nombre completo"
                                        value={customer.name}
                                        onChange={(event) => setCustomer({ ...customer, name: event.target.value })}
                                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-xs text-gray-900 outline-none focus:border-[#C81010] focus:ring-1 focus:ring-[#C81010] transition-all placeholder-gray-400 font-body"
                                        placeholder="Nombre completo *"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="relative">
                                        <Phone size={15} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            required
                                            type="tel"
                                            aria-label="Teléfono"
                                            value={customer.phone}
                                            onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
                                            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-xs text-gray-900 outline-none focus:border-[#C81010] focus:ring-1 focus:ring-[#C81010] transition-all placeholder-gray-400 font-body"
                                            placeholder="Teléfono *"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail size={15} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="email"
                                            aria-label="Correo electrónico"
                                            value={customer.email}
                                            onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                                            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-xs text-gray-900 outline-none focus:border-[#C81010] focus:ring-1 focus:ring-[#C81010] transition-all placeholder-gray-400 font-body"
                                            placeholder="Email (opcional)"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <MapPin size={15} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        required
                                        aria-label="Dirección de entrega"
                                        value={customer.address}
                                        onChange={(event) => setCustomer({ ...customer, address: event.target.value })}
                                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-xs text-gray-900 outline-none focus:border-[#C81010] focus:ring-1 focus:ring-[#C81010] transition-all placeholder-gray-400 font-body"
                                        placeholder="Dirección de entrega en Ibagué *"
                                    />
                                </div>

                                {error && (
                                    <p role="alert" className="rounded-lg bg-red-50 p-2 text-xs font-semibold text-red-600 border border-red-200">
                                        {error}
                                    </p>
                                )}

                                <button
                                    disabled={sending}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3.5 font-body font-bold text-xs uppercase tracking-wider text-white shadow-lg hover:bg-emerald-600 active:scale-[0.99] disabled:opacity-50 transition-all mt-2"
                                >
                                    <MessageCircle size={18} />
                                    {sending ? 'Procesando pedido...' : 'Confirmar Pedido por WhatsApp'}
                                </button>
                            </form>
                        )}
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
}
