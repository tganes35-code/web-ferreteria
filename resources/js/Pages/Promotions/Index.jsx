import { Head } from '@inertiajs/react';
import { ChevronRight, ShoppingBag, Star, Clock } from 'lucide-react';
import { useCart } from '../../Contexts/CartContext';
import Navbar from '../../Components/Navbar';
import CartDrawer from '../../Components/CartDrawer';

const fallback = '/images/realistic/electricas.jpg';

function money(value) {
    return `$${Number(value).toLocaleString('es-CO')}`;
}

export default function Index({ products = [] }) {
    const { add } = useCart();

    const offerProducts = products.length ? products : [
        { id: 1, name: 'Taladro Percutor 1/2" 750W DeWalt', slug: 'taladro-percutor-1-2-750w-dewalt', price: 329900, sale_price: 279900, discount_percent: 15, rating: 4.8, reviews_count: 24, images: [fallback], stock: 15, is_offer: true },
        { id: 2, name: 'Esmeril Angular 4 1/2" 850W Stanley', slug: 'esmeril-angular-4-1-2-850w-stanley', price: 229900, sale_price: 189900, discount_percent: 17, rating: 4.5, reviews_count: 12, images: [fallback], stock: 12, is_offer: true },
    ];

    return (
        <>
            <Head title="Promociones y Ofertas | Ferretería La Rebaja">
                <meta name="description" content="Aprovecha grandes descuentos en herramientas y materiales de construcción en Ibagué." />
            </Head>

            <Navbar activePage="promotions" />

            <main className="min-h-screen bg-[#F8F9FA] pb-12 font-body">
                {/* BLACK HEADER BAR */}
                <div className="bg-[#111111] text-white py-3 px-4 md:px-8 border-b border-zinc-800">
                    <div className="mx-auto max-w-[1300px] font-heading font-extrabold text-sm uppercase tracking-wider">
                        5. PROMOCIONES
                    </div>
                </div>

                <div className="mx-auto max-w-[1300px] px-4 md:px-8 pt-6">
                    {/* TITLE & SUBTITLE */}
                    <div className="mb-6">
                        <h1 className="font-heading font-extrabold text-3xl md:text-4xl uppercase tracking-tight text-gray-900">
                            OFERTAS Y PROMOCIONES
                        </h1>
                        <p className="text-xs text-gray-600 mt-1 font-medium">
                            Encuentra grandes oportunidades para tus proyectos.
                        </p>
                    </div>

                    {/* RED PROMO BANNER WITH COUNTDOWN */}
                    <div className="bg-gradient-to-r from-[#900A0A] via-[#C81010] to-[#700808] rounded-2xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden mb-10 border border-red-900">
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 relative z-10">
                            {/* LEFT PROMO INFO */}
                            <div className="lg:col-span-7 space-y-4">
                                <span className="bg-black/40 text-[#F5B400] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                                    OFERTAS DE LA SEMANA
                                </span>
                                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase leading-none italic">
                                    OFERTAS DE LA SEMANA
                                </h2>
                                <p className="font-heading font-bold text-xl sm:text-2xl text-[#F5B400] uppercase tracking-wide">
                                    Hasta 30% de descuento
                                </p>
                                <div>
                                    <a
                                        href="#catalogo-ofertas"
                                        className="inline-flex items-center gap-2 rounded bg-[#F5B400] px-6 py-3 font-body font-bold text-xs uppercase text-black hover:bg-yellow-400 transition-all shadow-lg"
                                    >
                                        <span>VER OFERTAS</span>
                                        <ChevronRight size={16} />
                                    </a>
                                </div>
                            </div>

                            {/* RIGHT TIMER & ICON BADGE */}
                            <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-4">
                                <div className="hidden sm:flex h-24 w-24 items-center justify-center rounded-full bg-red-600/40 border-4 border-amber-400 text-white font-price font-bold text-5xl shadow-inner">
                                    %
                                </div>

                                {/* COUNTDOWN BOX */}
                                <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-red-800 text-center w-full max-w-sm">
                                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-2">
                                        TERMINA EN:
                                    </span>
                                    <div className="grid grid-cols-4 gap-2 font-price font-bold text-lg sm:text-xl text-white">
                                        <div className="bg-zinc-900/90 rounded p-1.5 border border-zinc-700">
                                            <span>02</span>
                                            <span className="block text-[9px] font-normal text-gray-400">DÍAS</span>
                                        </div>
                                        <div className="bg-zinc-900/90 rounded p-1.5 border border-zinc-700">
                                            <span>14</span>
                                            <span className="block text-[9px] font-normal text-gray-400">HORAS</span>
                                        </div>
                                        <div className="bg-zinc-900/90 rounded p-1.5 border border-zinc-700">
                                            <span>35</span>
                                            <span className="block text-[9px] font-normal text-gray-400">MIN</span>
                                        </div>
                                        <div className="bg-zinc-900/90 rounded p-1.5 border border-zinc-700">
                                            <span>20</span>
                                            <span className="block text-[9px] font-normal text-gray-400">SEG</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DISCOUNTED PRODUCTS GRID */}
                    <div id="catalogo-ofertas" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {offerProducts.map((product) => (
                            <article
                                key={product.id}
                                className="group bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-[#F5B400] transition-all flex flex-col justify-between relative"
                            >
                                <span className="absolute top-3 left-3 z-10 bg-[#C81010] text-white font-body text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                                    OFERTA
                                </span>

                                <div>
                                    <a href={`/producto/${product.slug}`} className="block">
                                        <div className="h-44 w-full flex items-center justify-center p-3 mb-3 bg-[#F8F9FA] rounded-xl">
                                            <img
                                                src={product.images?.[0] || fallback}
                                                alt={product.name}
                                                className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                        <h3 className="font-body font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 min-h-[38px] group-hover:text-[#C81010] transition-colors leading-tight">
                                            {product.name}
                                        </h3>
                                    </a>

                                    <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill="currentColor" className="text-amber-400" />
                                            ))}
                                        </div>
                                        <span className="text-gray-400 font-normal ml-1">({product.reviews_count || 24})</span>
                                    </div>

                                    <div className="mt-2 flex items-baseline gap-2">
                                        <b className="font-price font-bold text-xl text-[#C81010]">
                                            {money(product.sale_price || product.price)}
                                        </b>
                                        {product.sale_price && (
                                            <>
                                                <del className="font-body text-xs text-gray-400">
                                                    {money(product.price)}
                                                </del>
                                                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1 rounded">
                                                    -{product.discount_percent || 15}%
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => add(product)}
                                    className="mt-4 w-full rounded bg-[#F5B400] py-2.5 font-body font-bold text-xs uppercase tracking-wider text-black hover:bg-[#D99F00] active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={15} />
                                    Agregar al carrito
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

        </>
    );
}
