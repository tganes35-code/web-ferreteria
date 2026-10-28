import { Link } from '@inertiajs/react';
import { ShoppingCart, Search, Truck, ShieldCheck, Award, MessageCircle, ChevronDown } from 'lucide-react';
import { useCart } from '../Contexts/CartContext';
import BrandLogo from './BrandLogo';

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

const navLinks = [
    { label: 'INICIO',       href: '/',           key: 'home' },
    { label: 'NOSOTROS',     href: '/nosotros',    key: 'about' },
    { label: 'PRODUCTOS',    href: '/catalogo',    key: 'catalog',    icon: true },
    { label: 'CATEGORÍAS',   href: '/categorias',  key: 'categories' },
    { label: 'PROMOCIONES',  href: '/promociones', key: 'promotions' },
    { label: 'CONTACTO',     href: '/contacto',    key: 'contact' },
    { label: 'CARRITO',      href: '/carrito',     key: 'cart' },
];

export default function Navbar({ activePage = 'home' }) {
    const { items } = useCart();
    const count = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="w-full bg-[#111111] text-white">

            {/* ── TOP BAR ── */}
            <div className="border-b border-zinc-800 bg-[#0a0a0a] px-4 py-1.5 font-body text-[11px] font-medium text-zinc-300">
                <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2">

                    {/* Propuestas de valor */}
                    <div className="flex flex-wrap items-center gap-6">
                        <span className="flex items-center gap-1.5 text-zinc-200">
                            <Truck size={14} className="text-[#F5B400]" /> Envíos rápidos a toda la ciudad
                        </span>
                        <span className="hidden sm:flex items-center gap-1.5 text-zinc-200">
                            <ShieldCheck size={14} className="text-[#F5B400]" /> Pagos 100% seguros
                        </span>
                        <span className="hidden md:flex items-center gap-1.5 text-zinc-200">
                            <Award size={14} className="text-[#F5B400]" /> Calidad garantizada
                        </span>
                    </div>

                    {/* Teléfono + Redes */}
                    <div className="flex items-center gap-5">
                        <span className="flex items-center gap-1.5">
                            <span className="text-zinc-400">¿Necesitas ayuda?</span>
                            <a href="tel:3152987887" className="font-bold text-white hover:text-[#F5B400] transition-colors">
                                315 298 7887
                            </a>
                        </span>
                        <div className="flex items-center gap-2.5 text-zinc-400">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-[#F5B400] transition-colors">
                                <FacebookIcon size={13} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#F5B400] transition-colors">
                                <InstagramIcon size={14} />
                            </a>
                            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-[#25d366] transition-colors">
                                <MessageCircle size={14} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── LOGO + BUSCADOR + CARRITO ── */}
            <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 md:px-6">

                {/* Logo → Inicio */}
                <a href="/">
                    <BrandLogo />
                </a>

                {/* Barra de búsqueda */}
                <form action="/catalogo" method="GET" className="flex w-full max-w-xl items-center overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="hidden sm:flex items-center gap-1 border-r border-gray-200 bg-gray-50 px-3 py-2.5 font-body text-xs font-semibold text-gray-700">
                        <span>Buscar por categoría</span>
                        <ChevronDown size={14} className="text-gray-500" />
                    </div>
                    <input
                        name="search"
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full px-4 py-2.5 font-body text-xs text-gray-800 outline-none placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        aria-label="Buscar"
                        className="flex h-10 w-12 shrink-0 items-center justify-center bg-[#C81010] text-white hover:bg-[#A00C0C] transition-colors"
                    >
                        <Search size={18} />
                    </button>
                </form>

                {/* Botón carrito */}
                <a
                    href="/carrito"
                    className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-2.5 border border-zinc-800 hover:border-[#F5B400] transition-all group"
                >
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#F5B400]">
                        <ShoppingCart size={20} />
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C81010] font-price text-[10px] font-bold text-white">
                            {count}
                        </span>
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-[#F5B400] transition-colors whitespace-nowrap">
                        Mi carrito
                    </span>
                </a>

            </div>

            {/* ── BARRA DE NAVEGACIÓN PRINCIPAL ── */}
            <nav className="border-t border-b border-zinc-800 bg-[#0d0d0d]">
                <div className="mx-auto flex max-w-[1400px] items-center px-4 font-body text-xs font-semibold uppercase tracking-wider overflow-x-auto">
                    {navLinks.map(({ label, href, key, icon }) => {
                        const isActive = activePage === key;
                        return (
                            <a
                                key={key}
                                href={href}
                                className={`flex items-center gap-1 px-5 py-3.5 whitespace-nowrap transition-colors ${
                                    isActive
                                        ? 'bg-[#F5B400] text-black font-bold'
                                        : 'text-white hover:bg-zinc-800 hover:text-[#F5B400]'
                                }`}
                            >
                                {label}
                                {icon && <ChevronDown size={13} />}
                            </a>
                        );
                    })}
                </div>
            </nav>

        </header>
    );
}
