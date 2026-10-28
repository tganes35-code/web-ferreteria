import { Head } from '@inertiajs/react';
import { Trash2, ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../../Contexts/CartContext';
import Navbar from '../../Components/Navbar';

const whatsapp = '573152987887';
const fallback = '/images/realistic/electricas.jpg';

function money(value) {
    return `$${Number(value).toLocaleString('es-CO')}`;
}

export default function CartIndex() {
    const { items, change, remove, openCart } = useCart();

    const rawSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = rawSubtotal;

    return (
        <>
            <Head title="Carrito de Compras | Ferretería La Rebaja">
                <meta name="description" content="Revisa tu carrito de compras y finaliza tu pedido de herramientas y materiales." />
            </Head>

            <Navbar activePage="cart" />

            <main className="min-h-screen bg-[#F8F9FA] pb-16 font-body">

                {/* HEADER */}
                <div className="bg-[#111111] text-white py-10 px-4 border-b border-zinc-800">
                    <div className="mx-auto max-w-[1300px]">
                        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                            <a href="/" className="hover:text-[#F5B400] transition-colors">Inicio</a>
                            <span>/</span>
                            <span className="text-zinc-300 font-semibold">Carrito</span>
                        </div>
                        <h1 className="font-heading font-extrabold text-4xl md:text-5xl uppercase text-white">
                            TU CARRITO DE <span className="text-[#F5B400]">COMPRAS</span>
                        </h1>
                    </div>
                </div>

                <div className="mx-auto max-w-[1300px] px-4 md:px-8 pt-8 space-y-6">

                    {items.length ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                            {/* TABLA CARRITO */}
                            <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left font-body text-xs">
                                        <thead className="bg-[#F8F9FA] border-b border-gray-200 text-gray-700 font-heading font-bold uppercase tracking-wider">
                                            <tr>
                                                <th className="py-3.5 px-4">Producto</th>
                                                <th className="py-3.5 px-4 text-center">Precio</th>
                                                <th className="py-3.5 px-4 text-center">Cantidad</th>
                                                <th className="py-3.5 px-4 text-center">Subtotal</th>
                                                <th className="py-3.5 px-4 text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 font-medium text-gray-900">
                                            {items.map((item) => (
                                                <tr key={item.productId} className="hover:bg-gray-50/60 transition-colors">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-14 w-14 bg-[#F8F9FA] rounded-lg border border-gray-200 p-1 flex items-center justify-center shrink-0">
                                                                <img
                                                                    src={item.image || fallback}
                                                                    alt={item.name}
                                                                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                                                                />
                                                            </div>
                                                            <span className="font-semibold text-xs text-gray-900 line-clamp-2">{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center whitespace-nowrap font-price font-bold text-gray-800">{money(item.price)}</td>
                                                    <td className="py-4 px-4 text-center">
                                                        <div className="inline-flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                                                            <button type="button" onClick={() => change(item.productId, -1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors">
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="px-3 py-1 font-bold text-xs">{item.quantity}</span>
                                                            <button type="button" onClick={() => change(item.productId, 1)} disabled={item.quantity >= item.stock} className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors">
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-center whitespace-nowrap font-price font-bold text-[#C81010]">{money(item.price * item.quantity)}</td>
                                                    <td className="py-4 px-4 text-center">
                                                        <button type="button" onClick={() => remove(item.productId)} aria-label="Eliminar" className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 bg-[#F8F9FA] border-t border-gray-200">
                                    <a href="/catalogo" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-body font-bold text-xs uppercase text-gray-700 hover:bg-gray-100 transition-colors shadow-sm">
                                        <ArrowLeft size={15} /> SEGUIR COMPRANDO
                                    </a>
                                </div>
                            </div>

                            {/* RESUMEN PEDIDO */}
                            <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4 font-body">
                                <h3 className="font-heading font-extrabold text-base uppercase text-gray-900 border-b border-gray-200 pb-3">Resumen del pedido</h3>
                                <div className="space-y-2.5 text-xs text-gray-600 font-medium">
                                    <div className="flex items-center justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-price font-bold text-gray-900">{money(rawSubtotal)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Envío</span>
                                        <span className="font-semibold text-emerald-600">A acordar</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex items-baseline justify-between">
                                        <span className="font-heading font-bold text-sm text-gray-900 uppercase">TOTAL</span>
                                        <b className="font-price font-extrabold text-2xl text-[#C81010]">{money(total)}</b>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={openCart}
                                    className="w-full bg-[#F5B400] text-black py-3.5 rounded-xl font-body font-bold text-xs uppercase tracking-wider hover:bg-[#D99F00] active:scale-95 transition-all shadow flex items-center justify-center gap-2"
                                >
                                    FINALIZAR PEDIDO
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm font-body space-y-4">
                            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                                <ShoppingCart size={32} />
                            </div>
                            <h3 className="font-heading font-bold text-xl uppercase text-gray-900">Tu carrito está vacío</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">Agrega herramientas y materiales para continuar.</p>
                            <a href="/catalogo" className="inline-flex items-center gap-2 rounded-xl bg-[#C81010] px-6 py-3 font-body font-bold text-xs uppercase text-white hover:bg-[#A00C0C] transition-colors shadow-md">
                                Explorar productos
                            </a>
                        </div>
                    )}
                </div>
            </main>

        </>
    );
}
