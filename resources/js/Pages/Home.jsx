import { Head } from '@inertiajs/react';
import {
    MessageCircle, ShoppingBag, Truck, ShieldCheck, Headphones, RefreshCw,
    Wrench, Zap, Paintbrush, Hammer, Sprout, HardHat, Home as HomeIcon, Layers,
    ChevronRight, ChevronLeft, Award, Tag, Phone, Mail, MapPin, Clock, Star,
    BookOpen, Info, Package, Percent, PhoneCall, ShoppingCart, LayoutGrid
} from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../Contexts/CartContext';
import Navbar from '../Components/Navbar';
import BrandLogo from '../Components/BrandLogo';

const whatsapp = '573152987887';

const FacebookIcon = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const InstagramIcon = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

function money(value) {
    return `$${Number(value).toLocaleString('es-CO')}`;
}

const CATEGORY_ICONS = [Zap, Hammer, Layers, Wrench, Paintbrush, Sprout, HardHat, HomeIcon, Zap, Wrench];

// Paneles de acceso rápido que se muestran en la home
const PANELS = [
    { num: '1', label: 'TODOS LOS PRODUCTOS',  sub: 'Catálogo completo',     href: '/catalogo',    bg: 'from-[#1a1a1a] to-[#2a2a2a]', accent: '#F5B400', Icon: Package },
    { num: '2', label: 'DETALLE DEL PRODUCTO', sub: 'Ver producto destacado', href: '/producto/taladro-percutor-1-2-750w-dewalt', bg: 'from-[#1a1a1a] to-[#2a2a2a]', accent: '#F5B400', Icon: BookOpen },
    { num: '3', label: 'CATEGORÍAS',           sub: 'Explora categorías',    href: '/categorias',  bg: 'from-[#1a1a1a] to-[#2a2a2a]', accent: '#F5B400', Icon: LayoutGrid },
    { num: '4', label: 'CARRITO',              sub: 'Tu carrito de compras', href: '/carrito',     bg: 'from-[#1a1a1a] to-[#2a2a2a]', accent: '#F5B400', Icon: ShoppingCart },
    { num: '5', label: 'PROMOCIONES',          sub: 'Ofertas y descuentos',  href: '/promociones', bg: 'from-[#7a0a0a] to-[#C81010]', accent: '#F5B400', Icon: Percent },
    { num: '6', label: 'NOSOTROS',             sub: 'Conoce la empresa',     href: '/nosotros',    bg: 'from-[#1a1a1a] to-[#2a2a2a]', accent: '#F5B400', Icon: Info },
    { num: '8', label: 'CONTACTO',             sub: 'Escríbenos o llámanos', href: '/contacto',    bg: 'from-[#1a1a1a] to-[#2a2a2a]', accent: '#F5B400', Icon: PhoneCall },
    { num: '9', label: 'CARRITO DE COMPRAS',   sub: 'Ver y finalizar pedido', href: '/carrito',    bg: 'from-[#0a4a0a] to-[#166416]', accent: '#F5B400', Icon: ShoppingBag },
];

export default function Home({ featuredProducts = [], categories = [] }) {
    const { items, add, open, closeCart, change, remove } = useCart();
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterMessage, setNewsletterMessage] = useState('');

    const subscribe = async (event) => {
        event.preventDefault();
        const response = await fetch('/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' },
            body: JSON.stringify({ email: newsletterEmail }),
        });
        const result = await response.json();
        setNewsletterMessage(response.ok ? result.message : (result.message || 'No pudimos registrar tu correo.'));
        if (response.ok) setNewsletterEmail('');
    };

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'HardwareStore',
        name: 'Ferretería La Rebaja',
        telephone: '+573152987887',
        email: 'ferreterialarebaja37@gmail.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Av. 37 No. 10-72, barrio Gaitán',
            addressLocality: 'Ibagué',
            addressRegion: 'Tolima',
            addressCountry: 'CO'
        }
    };

    return (
        <>
            <Head title="Ferretería La Rebaja | Tu Proyecto, Nuestra Pasión">
                <meta name="description" content="Todo en herramientas para construir tus sueños. Envíos rápidos en Ibagué y venta por WhatsApp." />
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            </Head>

            <Navbar activePage="home" />

            <main className="bg-[#F5F5F5] min-h-screen text-[#111111]">

                {/* ═══════════════════════════════════════════════
                    HERO SECTION WITH SIDEBAR CATEGORIES
                ═══════════════════════════════════════════════ */}
                <section id="inicio" className="bg-[#111111] text-white py-0 border-b border-zinc-800">
                    <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12">

                        {/* LEFT SIDEBAR: CATEGORÍAS */}
                        <div className="hidden lg:block lg:col-span-3 bg-[#151515] border-r border-zinc-800 py-3">
                            <ul className="divide-y divide-zinc-800 font-body text-xs font-semibold uppercase">
                                {categories.map((cat, idx) => {
                                    const IconComp = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
                                    return (
                                        <li key={cat.slug}>
                                            <a
                                                href={`/catalogo?category=${cat.slug}`}
                                                className="flex items-center gap-3 px-5 py-2.5 hover:bg-zinc-800 hover:text-[#F5B400] transition-colors"
                                            >
                                                <IconComp size={15} className="text-[#F5B400] shrink-0" />
                                                <span>{cat.name}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="px-5 pt-3 border-t border-zinc-800">
                                <a href="/categorias" className="text-xs font-bold text-[#F5B400] hover:underline flex items-center gap-1">
                                    Ver todas las categorías <ChevronRight size={12} />
                                </a>
                            </div>
                        </div>

                        {/* HERO MAIN BANNER */}
                        <div className="lg:col-span-9 hero-workshop-bg p-8 md:p-14 flex flex-col justify-center min-h-[460px] relative overflow-hidden">
                            <div className="max-w-xl space-y-6 relative z-10">
                                <div className="space-y-1">
                                    <h2 className="font-heading font-extrabold italic text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase leading-none text-white">
                                        TODO EN HERRAMIENTAS
                                    </h2>
                                    <h1 className="font-heading font-extrabold italic text-5xl sm:text-6xl md:text-7xl tracking-wide uppercase leading-none text-[#F5B400]">
                                        PARA CONSTRUIR<br />TUS SUEÑOS
                                    </h1>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 font-heading font-bold text-xs uppercase tracking-wider text-zinc-200">
                                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-zinc-700">
                                        <Award size={16} className="text-[#F5B400]" /> CALIDAD GARANTIZADA
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-zinc-700">
                                        <Tag size={16} className="text-[#F5B400]" /> PRECIOS QUE CONSTRUYEN
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-zinc-700">
                                        <Wrench size={16} className="text-[#F5B400]" /> SOLUCIONES QUE DURAN
                                    </span>
                                </div>

                                <p className="font-body font-medium text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed hidden sm:block">
                                    Encuentra soluciones confiables para construcción, mantenimiento, hogar y jardín en Ibagué.
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="/catalogo"
                                        className="inline-flex items-center gap-2 rounded bg-[#C81010] px-8 py-3.5 font-body font-bold text-xs uppercase tracking-wider text-white shadow-xl hover:bg-[#A00C0C] transition-all active:scale-95"
                                    >
                                        <span>VER PRODUCTOS</span>
                                        <ChevronRight size={18} />
                                    </a>
                                    <a
                                        href="/promociones"
                                        className="inline-flex items-center gap-2 rounded border border-[#F5B400] px-6 py-3.5 font-body font-bold text-xs uppercase tracking-wider text-[#F5B400] hover:bg-[#F5B400] hover:text-black transition-all active:scale-95"
                                    >
                                        <span>VER OFERTAS</span>
                                        <Tag size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    PANELES DE ACCESO RÁPIDO ← NUEVO
                ═══════════════════════════════════════════════ */}
                <section className="mx-auto max-w-[1400px] px-4 py-12">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="section-title-line">NUESTRAS SECCIONES</h2>
                        <span className="text-xs text-gray-500 font-medium">Accede directamente a cada área</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {PANELS.map(({ num, label, sub, href, bg, accent, Icon }) => (
                            <a
                                key={href + num}
                                href={href}
                                className={`group relative rounded-xl bg-gradient-to-br ${bg} text-white p-5 flex flex-col justify-between min-h-[140px] shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-white/10`}
                            >
                                {/* Número de panel */}
                                <span className="absolute top-3 right-4 font-price font-extrabold text-4xl text-white/10 select-none">
                                    {num}
                                </span>

                                {/* Icono */}
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-3"
                                    style={{ backgroundColor: accent + '22', color: accent }}
                                >
                                    <Icon size={22} />
                                </div>

                                {/* Texto */}
                                <div>
                                    <h3 className="font-heading font-extrabold text-sm uppercase leading-tight text-white">
                                        {label}
                                    </h3>
                                    <p className="text-[11px] font-medium mt-0.5" style={{ color: accent }}>
                                        {sub} →
                                    </p>
                                </div>

                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl"
                                    style={{ backgroundColor: accent }}
                                />
                            </a>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    4 VALUE PROPOSITIONS BAR
                ═══════════════════════════════════════════════ */}
                <section id="servicios" className="bg-white py-6 border-b border-gray-200 shadow-sm scroll-mt-20">
                    <div className="mx-auto max-w-[1400px] px-4 grid grid-cols-2 md:grid-cols-4 gap-6 font-body">
                        {[
                            { Icon: Truck,      title: 'ENVÍOS RÁPIDOS',        sub: 'A toda la ciudad' },
                            { Icon: ShieldCheck, title: 'PAGOS SEGUROS',        sub: 'Compra con confianza' },
                            { Icon: Headphones,  title: 'ASESORÍA EXPERTA',     sub: 'Te ayudamos a elegir' },
                            { Icon: RefreshCw,   title: 'DEVOLUCIONES FÁCILES', sub: 'Sin complicaciones' },
                        ].map(({ Icon, title, sub }) => (
                            <div key={title} className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5B400]/15 text-[#F5B400]">
                                    <Icon size={22} />
                                </div>
                                <div className="leading-tight">
                                    <h3 className="font-heading font-bold text-lg uppercase text-[#111111]">{title}</h3>
                                    <p className="font-body font-medium text-[11px] text-gray-500">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    CATEGORÍAS PRINCIPALES
                ═══════════════════════════════════════════════ */}
                <section id="categorias" className="mx-auto max-w-[1400px] px-4 py-12 scroll-mt-20">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="section-title-line">CATEGORÍAS PRINCIPALES</h2>
                        <a href="/categorias" className="font-body font-bold text-xs text-[#C81010] hover:underline flex items-center gap-1">
                            Ver todas las categorías <ChevronRight size={14} />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {categories.map((category, idx) => {
                            const IconComp = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
                            return (
                                <a
                                    href={`/catalogo?category=${category.slug}`}
                                    key={category.slug}
                                    className="group rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm hover:border-[#C81010] hover:shadow-md transition-all card-hover-effect flex flex-col items-center justify-between"
                                >
                                    <div className="h-28 w-full flex items-center justify-center p-2 mb-2 bg-[#F5F5F5] rounded-lg">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            loading="lazy"
                                            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <b className="font-body font-semibold text-xs sm:text-sm uppercase text-gray-900 group-hover:text-[#C81010] transition-colors leading-tight">
                                        {category.name}
                                    </b>
                                </a>
                            );
                        })}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    PRODUCTOS DESTACADOS
                ═══════════════════════════════════════════════ */}
                <section id="productos" className="mx-auto max-w-[1400px] px-4 pb-12 scroll-mt-20">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="section-title-line">PRODUCTOS DESTACADOS</h2>
                        <div className="flex items-center gap-4">
                            <a href="/catalogo" className="font-body font-bold text-xs text-[#C81010] hover:underline flex items-center gap-1">
                                Ver todos los productos <ChevronRight size={14} />
                            </a>
                            <div className="hidden sm:flex items-center gap-1">
                                <button type="button" aria-label="Anterior" className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-600 hover:bg-gray-100">
                                    <ChevronLeft size={16} />
                                </button>
                                <button type="button" aria-label="Siguiente" className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center bg-white text-gray-600 hover:bg-gray-100">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {featuredProducts.map((product) => (
                            <article
                                key={product.id}
                                className="group rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm hover:border-[#F5B400] hover:shadow-md transition-all flex flex-col justify-between relative"
                            >
                                {product.is_offer && (
                                    <span className="absolute top-2 left-2 z-10 bg-[#C81010] text-white font-body text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                                        OFERTA
                                    </span>
                                )}

                                <div>
                                    <a href={`/producto/${product.slug}`} className="block">
                                        <div className="h-36 w-full flex items-center justify-center p-2 mb-3 bg-[#F5F5F5] rounded-lg">
                                            <img
                                                src={product.images?.[0]}
                                                alt={product.name}
                                                loading="lazy"
                                                className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                        <h3 className="font-body font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 min-h-[38px] leading-tight group-hover:text-[#C81010] transition-colors">
                                            {product.name}
                                        </h3>
                                    </a>

                                    <div className="mt-1.5 flex items-center gap-1 text-[11px]">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={11} fill="currentColor" className="text-amber-400" />
                                            ))}
                                        </div>
                                        <span className="text-gray-400 font-normal">({product.reviews_count || 24})</span>
                                    </div>

                                    <div className="mt-2 flex items-baseline gap-2">
                                        <b className="font-price font-bold text-lg sm:text-xl text-[#C81010]">
                                            {money(product.sale_price ?? product.price)}
                                        </b>
                                        {product.sale_price && (
                                            <>
                                                <del className="font-body font-normal text-xs text-gray-400">
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
                                    disabled={product.stock < 1}
                                    onClick={() => add(product)}
                                    className="mt-3 w-full rounded bg-[#F5B400] py-2 font-body font-bold text-xs uppercase tracking-wider text-black hover:bg-[#D99F00] active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-sm flex items-center justify-center gap-1.5"
                                >
                                    <ShoppingBag size={14} />
                                    {product.stock ? 'Agregar al carrito' : 'Agotado'}
                                </button>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <a
                            href="/catalogo"
                            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#C81010] px-10 py-3 font-body font-bold text-xs uppercase tracking-wider text-[#C81010] hover:bg-[#C81010] hover:text-white transition-all"
                        >
                            VER TODOS LOS PRODUCTOS <ChevronRight size={16} />
                        </a>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    2 PROMO BANNERS
                ═══════════════════════════════════════════════ */}
                <section id="promociones" className="mx-auto max-w-[1400px] px-4 pb-12 scroll-mt-20">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="section-title-line">PROMOCIONES</h2>
                        <a href="/promociones" className="font-body font-bold text-xs text-[#C81010] hover:underline flex items-center gap-1">
                            Ver todas las ofertas <ChevronRight size={14} />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a href="/promociones" className="banner-promo-red rounded-2xl p-8 text-white flex items-center justify-between relative overflow-hidden shadow-lg border border-red-800 group">
                            <div className="max-w-xs space-y-3 relative z-10">
                                <span className="font-body font-bold text-[10px] uppercase tracking-widest text-[#F5B400] bg-black/40 px-2 py-1 rounded">OFERTAS DE LA SEMANA</span>
                                <h3 className="font-heading font-extrabold italic text-2xl sm:text-3xl uppercase leading-tight">Descuentos increíbles en productos seleccionados</h3>
                                <span className="inline-flex items-center gap-2 rounded bg-[#F5B400] px-5 py-2.5 font-body font-bold text-xs uppercase text-black group-hover:bg-yellow-400 transition-all">
                                    <span>VER OFERTAS</span>
                                    <ChevronRight size={16} />
                                </span>
                            </div>
                            <div className="hidden sm:flex h-28 w-28 items-center justify-center rounded-full bg-red-600/50 border-4 border-amber-400/80 text-white font-price font-bold text-4xl shadow-inner">%</div>
                        </a>

                        <a href="/contacto" className="banner-promo-dark rounded-2xl p-8 text-white flex items-center justify-between relative overflow-hidden shadow-lg border border-zinc-800 group">
                            <div className="max-w-xs space-y-3 relative z-10">
                                <span className="font-body font-bold text-[10px] uppercase tracking-widest text-emerald-400 bg-black/60 px-2 py-1 rounded">¿NECESITAS ASESORÍA?</span>
                                <h3 className="font-heading font-extrabold italic text-2xl sm:text-3xl uppercase leading-tight text-[#F5B400]">NUESTRO EQUIPO ESTÁ PARA AYUDARTE</h3>
                                <span className="inline-flex items-center gap-2.5 rounded bg-[#F5B400] px-6 py-2.5 font-body font-bold text-xs uppercase text-black group-hover:bg-yellow-400 transition-all">
                                    <span>CONTÁCTANOS</span>
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25d366] text-white">
                                        <MessageCircle size={12} />
                                    </div>
                                </span>
                            </div>
                            <div className="hidden sm:block">
                                <HardHat size={80} className="text-[#F5B400]/40" />
                            </div>
                        </a>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    MARCAS ALIADAS
                ═══════════════════════════════════════════════ */}
                <section id="nosotros" className="mx-auto max-w-[1400px] px-4 pb-12 scroll-mt-20">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="section-title-line">MARCAS ALIADAS</h2>
                        <a href="/nosotros" className="font-body font-bold text-xs text-[#C81010] hover:underline flex items-center gap-1">
                            Conoce más de nosotros <ChevronRight size={14} />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {['DEWALT', 'STANLEY', 'BOSCH', 'MAKITA', 'TRUPER', 'PAVCO'].map((brand) => (
                            <a
                                key={brand}
                                href={`/catalogo?brand=${brand.toLowerCase()}`}
                                className="flex h-20 items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-[#F5B400] hover:shadow-md transition-all"
                            >
                                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight uppercase text-slate-800">{brand}</span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* TRUST PILLARS */}
                <section className="bg-white py-8 border-t border-b border-gray-200">
                    <div className="mx-auto max-w-[1400px] px-4 grid grid-cols-2 md:grid-cols-4 gap-6 font-body">
                        {[
                            { Icon: Wrench,     title: 'SOMOS EXPERTOS',         sub: 'Más de 10 años de experiencia' },
                            { Icon: Tag,        title: 'PRECIOS JUSTOS',          sub: 'Calidad al mejor precio' },
                            { Icon: Headphones, title: 'ATENCIÓN PERSONALIZADA', sub: 'Te asesoramos en tu proyecto' },
                            { Icon: Award,      title: 'COMPROMISO',              sub: 'Con tu satisfacción siempre' },
                        ].map(({ Icon, title, sub }) => (
                            <div key={title} className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[#F5B400]">
                                    <Icon size={20} />
                                </div>
                                <div className="leading-tight">
                                    <h4 className="font-heading font-bold text-lg uppercase text-[#111111]">{title}</h4>
                                    <p className="font-body font-medium text-[11px] text-gray-500">{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NEWSLETTER */}
                <section className="bg-[#111111] py-12 text-white border-b border-zinc-800">
                    <div className="mx-auto max-w-[1400px] px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-xl">
                            <h3 className="font-heading font-extrabold italic text-3xl sm:text-4xl uppercase text-[#F5B400]">SUSCRÍBETE Y RECIBE OFERTAS EXCLUSIVAS</h3>
                            <p className="font-body font-medium text-xs text-zinc-400 mt-1">Sé el primero en enterarte de nuestras promociones y novedades.</p>
                        </div>
                        <form onSubmit={subscribe} className="flex w-full max-w-md items-center overflow-hidden rounded-lg bg-white">
                            <input required type="email" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} placeholder="Ingresa tu correo electrónico" className="w-full px-4 py-3 font-body text-xs text-gray-800 outline-none placeholder-gray-400" />
                            <button type="submit" className="shrink-0 bg-[#F5B400] px-6 py-3 font-body font-bold text-xs uppercase text-black hover:bg-yellow-400 transition-colors">
                                Suscribirme
                            </button>
                        </form>
                        {newsletterMessage && <p role="status" className="mt-2 text-xs text-zinc-300">{newsletterMessage}</p>}
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer id="contacto" className="bg-[#0b0b0b] text-white pt-12 pb-6 border-t border-zinc-800 font-body text-sm scroll-mt-10">
                <div className="mx-auto max-w-[1400px] px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-800">

                    <div className="space-y-4">
                        <BrandLogo size="small" />
                        <p className="text-zinc-400 leading-relaxed text-xs">Todo en herramientas y materiales para construcción, mantenimiento e industria en Ibagué.</p>
                        <div className="flex items-center gap-3 text-zinc-400">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-[#F5B400]"><FacebookIcon size={13} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-[#F5B400]"><InstagramIcon size={14} /></a>
                            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-[#25d366]"><MessageCircle size={14} /></a>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-heading font-extrabold text-xl uppercase text-[#F5B400]">ENLACES RÁPIDOS</h4>
                        <ul className="space-y-2 text-zinc-300 text-xs font-medium">
                            {[
                                ['/', 'Inicio'],
                                ['/nosotros', 'Nosotros'],
                                ['/catalogo', 'Todos los productos'],
                                ['/categorias', 'Categorías'],
                                ['/promociones', 'Promociones y ofertas'],
                                ['/contacto', 'Contacto'],
                                ['/carrito', 'Mi carrito'],
                            ].map(([href, label]) => (
                                <li key={href}><a href={href} className="hover:text-[#F5B400] transition-colors">{label}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-heading font-extrabold text-xl uppercase text-[#F5B400]">CATEGORÍAS</h4>
                        <ul className="space-y-2 text-zinc-300 text-xs font-medium">
                            {categories.slice(0, 5).map((cat) => (
                                <li key={cat.slug}>
                                    <a href={`/catalogo?category=${cat.slug}`} className="hover:text-[#F5B400] transition-colors">{cat.name}</a>
                                </li>
                            ))}
                            <li><a href="/categorias" className="text-[#F5B400] font-bold hover:underline">Ver todas las categorías →</a></li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-heading font-extrabold text-xl uppercase text-[#F5B400]">CONTACTO</h4>
                        <ul className="space-y-2.5 text-zinc-300 text-xs font-normal">
                            <li className="flex items-center gap-2"><Phone size={14} className="text-[#F5B400]" /><a href="tel:3152987887" className="hover:text-white">315 298 7887</a></li>
                            <li className="flex items-center gap-2"><Mail size={14} className="text-[#F5B400]" /><a href="mailto:ferreterialarebaja37@gmail.com" className="hover:text-white">ferreterialarebaja37@gmail.com</a></li>
                            <li className="flex items-start gap-2"><MapPin size={14} className="text-[#F5B400] shrink-0 mt-0.5" /><span>Av. 37 No. 10-72, barrio Gaitán, Ibagué, Tolima</span></li>
                            <li className="flex items-center gap-2"><Clock size={14} className="text-[#F5B400] shrink-0" /><span>Lun-Vie: 7:30am–6:00pm · Sáb: 8:00am–2:00pm</span></li>
                        </ul>
                        <a href="/contacto" className="inline-flex items-center gap-2 mt-2 bg-[#C81010] px-4 py-2 rounded font-body font-bold text-xs uppercase text-white hover:bg-[#A00C0C] transition-colors">
                            Envíanos un mensaje <ChevronRight size={14} />
                        </a>
                    </div>
                </div>

                <div className="mx-auto max-w-[1400px] px-4 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-2">
                    <p>© {new Date().getFullYear()} Ferretería La Rebaja. Todos los derechos reservados.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-zinc-300">Políticas de privacidad</a>
                        <a href="#" className="hover:text-zinc-300">Términos y condiciones</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
