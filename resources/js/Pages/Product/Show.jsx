import { Head } from '@inertiajs/react';
import { ArrowLeft, MessageCircle, ShoppingBag, ShieldCheck, Truck, Award, RefreshCw, Star, CheckCircle, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../Contexts/CartContext';
import Navbar from '../../Components/Navbar';

const whatsapp = '573152987887';
const fallback = '/images/realistic/electricas.jpg';

function money(value) {
    return `$${Number(value).toLocaleString('es-CO')}`;
}

export default function Show({ product, relatedProducts = [] }) {
    const { add } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('descripcion');
    const [selectedImage, setSelectedImage] = useState(0);

    const price = product.sale_price ?? product.price;
    const images = product.images && product.images.length ? product.images : [fallback, fallback, fallback, fallback];

    const related = relatedProducts.length ? relatedProducts : [
        { id: 2, name: 'Esmeril Angular 4 1/2"', price: 189900, slug: 'esmeril-angular-4-1-2-850w-stanley', image: fallback },
        { id: 3, name: 'Rotomartillo SDS Plus', price: 299900, slug: 'rotomartillo-sds-plus-800w-truper', image: fallback },
        { id: 7, name: 'Taladro Atornillador Inalámbrico', price: 459900, slug: 'taladro-atornillador-inalambrico-dewalt', image: fallback }
    ];

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            add(product);
        }
    };

    return (
        <>
            <Head title={`${product.name} | Ferretería La Rebaja`}>
                <meta name="description" content={product.description} />
            </Head>

            <Navbar activePage="catalog" />

            <main className="min-h-screen bg-[#F8F9FA] pb-16 font-body">
                {/* BLACK HEADER BAR */}
                <div className="bg-[#111111] text-white py-3 px-4 md:px-8 border-b border-zinc-800">
                    <div className="mx-auto max-w-[1300px] font-heading font-extrabold text-sm uppercase tracking-wider">
                        DETALLE DEL PRODUCTO
                    </div>
                </div>

                <div className="mx-auto max-w-[1300px] px-4 md:px-8 pt-6">
                    {/* BREADCRUMB */}
                    <div className="mb-6 flex items-center gap-2 text-xs text-gray-500 font-body">
                        <a href="/" className="hover:text-[#C81010]">Inicio</a>
                        <span>/</span>
                        <a href="/catalogo" className="hover:text-[#C81010]">{product.category?.name || 'Herramientas eléctricas'}</a>
                        <span>/</span>
                        <span className="text-gray-900 font-semibold truncate">{product.name}</span>
                    </div>

                    {/* TOP PRODUCT OVERVIEW CARD */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* LEFT: THUMBNAILS + MAIN IMAGE */}
                        <div className="lg:col-span-6 flex gap-4">
                            {/* VERTICAL THUMBNAILS */}
                            <div className="flex flex-col gap-2 shrink-0">
                                {[0, 1, 2, 3].map((idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setSelectedImage(idx)}
                                        className={`h-16 w-16 rounded-lg border p-1 bg-[#F8F9FA] overflow-hidden transition-all ${selectedImage === idx ? 'border-[#C81010] ring-1 ring-[#C81010]' : 'border-gray-200 hover:border-gray-400'}`}
                                    >
                                        <img src={images[idx % images.length]} alt="thumbnail" className="h-full w-full object-contain mix-blend-multiply" />
                                    </button>
                                ))}
                            </div>

                            {/* MAIN FEATURED IMAGE BOX */}
                            <div className="relative flex-1 h-[380px] bg-[#F8F9FA] rounded-xl border border-gray-100 p-6 flex items-center justify-center overflow-hidden">
                                {product.is_offer && (
                                    <span className="absolute top-4 left-4 z-10 bg-[#C81010] text-white font-body text-xs font-bold uppercase px-2.5 py-1 rounded shadow">
                                        OFERTA
                                    </span>
                                )}
                                <img
                                    src={images[selectedImage % images.length]}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform hover:scale-105 duration-300"
                                />
                            </div>
                        </div>

                        {/* RIGHT: DETAILS & ACTIONS */}
                        <div className="lg:col-span-6 flex flex-col justify-between">
                            <div>
                                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 leading-tight">
                                    {product.name}
                                </h1>

                                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                    <span>Marca: <strong className="text-gray-800">{product.brand?.name || 'DeWalt'}</strong></span>
                                    <span>|</span>
                                    <span>SKU: <strong className="text-gray-800">{product.sku || 'DWD024K'}</strong></span>
                                </div>

                                {/* RATING */}
                                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-amber-500">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" className="text-amber-400" />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 font-medium">({product.reviews_count || 24} valoraciones)</span>
                                </div>

                                {/* PRICING BLOCK */}
                                <div className="mt-5 flex items-baseline gap-3">
                                    <b className="font-price font-bold text-3xl text-[#C81010]">
                                        {money(price)}
                                    </b>
                                    {product.sale_price && (
                                        <>
                                            <del className="font-body text-sm text-gray-400 font-normal">
                                                {money(product.price)}
                                            </del>
                                            <span className="bg-red-100 text-[#C81010] text-xs font-bold px-2 py-0.5 rounded">
                                                -{product.discount_percent || 15}%
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* STOCK STATUS BADGE */}
                                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span>En stock - Disponible para envío inmediato</span>
                                </div>

                                {/* QUANTITY SELECTOR & BUY BUTTONS */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-4 py-2 text-xs font-bold text-gray-900">{quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleAddToCart}
                                            className="flex-1 bg-[#C81010] text-white py-3 rounded-lg font-body font-bold text-xs uppercase tracking-wider hover:bg-[#A00C0C] transition-colors shadow flex items-center justify-center gap-2"
                                        >
                                            <ShoppingBag size={16} />
                                            AGREGAR AL CARRITO
                                        </button>
                                    </div>

                                    <a
                                        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hola, quiero comprar el producto ${product.name} por valor de ${money(price)}.`)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full bg-[#F5B400] text-black py-3 rounded-lg font-body font-bold text-xs uppercase tracking-wider hover:bg-[#D99F00] transition-colors shadow flex items-center justify-center gap-2"
                                    >
                                        COMPRAR AHORA
                                    </a>
                                </div>
                            </div>

                            {/* 4 VALUE PROPOSITIONS STRIP */}
                            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-body">
                                <div className="bg-[#F8F9FA] p-2.5 rounded-lg border border-gray-100">
                                    <Truck size={18} className="mx-auto text-[#F5B400] mb-1" />
                                    <h4 className="text-[11px] font-bold text-gray-900">Envíos rápidos</h4>
                                    <p className="text-[10px] text-gray-500">A toda la ciudad</p>
                                </div>
                                <div className="bg-[#F8F9FA] p-2.5 rounded-lg border border-gray-100">
                                    <ShieldCheck size={18} className="mx-auto text-[#F5B400] mb-1" />
                                    <h4 className="text-[11px] font-bold text-gray-900">Pago seguro</h4>
                                    <p className="text-[10px] text-gray-500">100% protegido</p>
                                </div>
                                <div className="bg-[#F8F9FA] p-2.5 rounded-lg border border-gray-100">
                                    <Award size={18} className="mx-auto text-[#F5B400] mb-1" />
                                    <h4 className="text-[11px] font-bold text-gray-900">Garantía</h4>
                                    <p className="text-[10px] text-gray-500">1 año de garantía</p>
                                </div>
                                <div className="bg-[#F8F9FA] p-2.5 rounded-lg border border-gray-100">
                                    <RefreshCw size={18} className="mx-auto text-[#F5B400] mb-1" />
                                    <h4 className="text-[11px] font-bold text-gray-900">Devoluciones</h4>
                                    <p className="text-[10px] text-gray-500">Sin complicaciones</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM TABS & RELATED PRODUCTS ROW */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* LEFT: TABS & CONTENT (8 cols) */}
                        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                            {/* TAB HEADERS */}
                            <div className="flex border-b border-gray-200 text-xs font-bold uppercase tracking-wider gap-6 overflow-x-auto">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('descripcion')}
                                    className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${activeTab === 'descripcion' ? 'border-[#C81010] text-[#C81010]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                                >
                                    Descripción
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('caracteristicas')}
                                    className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${activeTab === 'caracteristicas' ? 'border-[#C81010] text-[#C81010]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                                >
                                    Características
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('especificaciones')}
                                    className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${activeTab === 'especificaciones' ? 'border-[#C81010] text-[#C81010]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                                >
                                    Especificaciones
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('informacion')}
                                    className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${activeTab === 'informacion' ? 'border-[#C81010] text-[#C81010]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                                >
                                    Información adicional
                                </button>
                            </div>

                            {/* TAB CONTENT */}
                            <div className="pt-6 font-body text-xs text-gray-700 leading-relaxed space-y-4">
                                <p>{product.description || 'Taladro percutor de 750W ideal para trabajos de perforación en concreto, madera y metal. Diseño ergonómico y liviano para mayor comodidad en trabajos prolongados.'}</p>

                                <ul className="space-y-2 pt-2">
                                    {(product.features || [
                                        'Potencia: 750W',
                                        'Velocidad: 0-2800 rpm',
                                        'Impactos por minuto: 0-47600 gpm',
                                        'Capacidad en concreto: 13mm',
                                        'Capacidad en acero: 13mm',
                                        'Capacidad en madera: 25mm'
                                    ]).map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-800 font-medium">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#C81010]"></span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT: PRODUCTOS RELACIONADOS (4 cols) */}
                        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
                            <h3 className="font-heading font-bold text-sm uppercase text-gray-900 border-b border-gray-200 pb-3">
                                Productos relacionados
                            </h3>

                            <div className="space-y-4">
                                {related.slice(0, 3).map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 group">
                                        <div className="h-16 w-16 bg-[#F8F9FA] rounded-lg border border-gray-200 p-1 flex items-center justify-center shrink-0">
                                            <img src={item.image || fallback} alt={item.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1">
                                            <a href={`/producto/${item.slug}`} className="font-body font-semibold text-xs text-gray-900 group-hover:text-[#C81010] line-clamp-2 leading-tight">
                                                {item.name}
                                            </a>
                                            <b className="font-price font-bold text-sm text-[#C81010] block mt-1">
                                                {money(item.price)}
                                            </b>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
