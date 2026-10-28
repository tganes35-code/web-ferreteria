import { Head } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import CartDrawer from '../../Components/CartDrawer';
import {
    Zap, Hammer, Layers, Wrench, Paintbrush, Sprout, HardHat, Home as HomeIcon,
    Shield, Droplets, ChevronRight, Tag
} from 'lucide-react';

const ICON_LIST = [Zap, Hammer, Layers, Wrench, Paintbrush, Sprout, HardHat, HomeIcon, Shield, Droplets];

const DEFAULT_CATEGORIES = [
    { name: 'Herramientas Eléctricas', slug: 'herramientas-electricas', count: 125, image: '/images/realistic/electricas.jpg', desc: 'Taladros, amoladoras, sierras y más.' },
    { name: 'Herramientas Manuales',   slug: 'herramientas-manuales',   count: 210, image: '/images/realistic/manuales.jpg',   desc: 'Martillos, llaves, destornilladores.' },
    { name: 'Construcción',            slug: 'materiales-de-construccion', count: 180, image: '/images/realistic/construccion.jpg', desc: 'Cemento, varillas, bloques y más.' },
    { name: 'Plomería',                slug: 'plomeria',                count: 95,  image: '/images/realistic/plomeria.jpg',   desc: 'Tuberías, conexiones y accesorios.' },
    { name: 'Electricidad',            slug: 'electricidad',            count: 130, image: '/images/realistic/electricidad.jpg', desc: 'Cables, tomacorrientes, breakers.' },
    { name: 'Pinturas y Acabados',     slug: 'pinturas-y-acabados',     count: 115, image: '/images/realistic/pinturas.jpg',   desc: 'Pinturas, barnices y masillas.' },
    { name: 'Ferretería General',      slug: 'ferreteria-en-general',   count: 200, image: '/images/realistic/ferreteria.jpg', desc: 'Tornillos, pernos y accesorios.' },
    { name: 'Jardinería y Agro',       slug: 'jardineria-y-agro',       count: 60,  image: '/images/realistic/jardineria.jpg', desc: 'Mangueras, guadañas y abonos.' },
    { name: 'Seguridad Industrial',    slug: 'seguridad-industrial',    count: 75,  image: '/images/realistic/seguridad.jpg',  desc: 'EPPs, cascos, guantes y más.' },
    { name: 'Hogar y Organización',    slug: 'hogar-y-organizacion',    count: 110, image: '/images/realistic/hogar.jpg',      desc: 'Almacenamiento y organización.' },
];

export default function CategoriesIndex({ categories = [] }) {

    const list = categories.length ? categories : DEFAULT_CATEGORIES;

    return (
        <>
            <Head title="Categorías | Ferretería La Rebaja">
                <meta name="description" content="Explora todas nuestras categorías de herramientas y materiales para construcción en Ibagué." />
            </Head>

            <Navbar activePage="categories" />

            <main className="min-h-screen bg-[#F8F9FA] pb-16 font-body">
                {/* BLACK HEADER BAR */}
                <div className="bg-[#111111] text-white py-3 px-4 md:px-8 border-b border-zinc-800">
                    <div className="mx-auto max-w-[1300px] font-heading font-extrabold text-sm uppercase tracking-wider">
                        CATEGORÍAS
                    </div>
                </div>

                <div className="mx-auto max-w-[1300px] px-4 md:px-8 pt-6">
                    {/* BREADCRUMB & TITLE */}
                    <div className="mb-6 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                            <a href="/" className="hover:text-[#C81010] transition-colors">Inicio</a>
                            <ChevronRight size={12} />
                            <span className="text-gray-900 font-semibold">Categorías</span>
                        </div>
                        <h1 className="font-heading font-extrabold text-3xl md:text-4xl uppercase tracking-tight text-gray-900">
                            TODAS LAS <span className="text-[#C81010]">CATEGORÍAS</span>
                        </h1>
                        <p className="text-gray-600 text-xs mt-1 font-medium max-w-xl">
                            Encuentra exactamente lo que necesitas para tu proyecto de construcción, mantenimiento o industria.
                        </p>
                    </div>
                </div>

                {/* ── GRID DE CATEGORÍAS ── */}
                <div className="mx-auto max-w-[1300px] px-4 py-12">

                    {/* Stats */}
                    <div className="mb-8 flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <span className="text-[#C81010] font-bold text-base">{list.length}</span> categorías disponibles
                        </p>
                        <a href="/catalogo" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C81010] hover:underline">
                            <Tag size={14} /> Ver todos los productos
                        </a>
                    </div>

                    {/* Grid 2 → 3 → 4 → 5 cols */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
                        {list.map((cat, idx) => {
                            const IconComp = ICON_LIST[idx % ICON_LIST.length];
                            return (
                                <a
                                    key={cat.slug}
                                    href={`/catalogo?category=${cat.slug}`}
                                    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#C81010] transition-all duration-300 flex flex-col"
                                >
                                    {/* Imagen */}
                                    <div className="h-36 w-full flex items-center justify-center p-4 bg-[#F5F5F5] overflow-hidden">
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 flex flex-col flex-1 justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C81010]/10 text-[#C81010]">
                                                    <IconComp size={13} />
                                                </div>
                                                <h3 className="font-heading font-bold text-sm text-gray-900 group-hover:text-[#C81010] transition-colors leading-snug line-clamp-1">
                                                    {cat.name}
                                                </h3>
                                            </div>
                                            {cat.desc && (
                                                <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                                                    {cat.desc}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-[11px] font-bold text-gray-400">
                                                {cat.count || '—'} productos
                                            </span>
                                            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#C81010] group-hover:gap-1.5 transition-all">
                                                Ver <ChevronRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA Bottom */}
                    <div className="mt-12 rounded-2xl bg-[#111111] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-heading font-extrabold text-2xl uppercase text-[#F5B400]">
                                ¿No encuentras lo que buscas?
                            </h3>
                            <p className="text-zinc-400 text-sm mt-1">
                                Contáctanos directamente y te ayudamos a encontrar el producto ideal.
                            </p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <a
                                href="/catalogo"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#C81010] px-6 py-3 font-body font-bold text-xs uppercase text-white hover:bg-[#A00C0C] transition-colors"
                            >
                                Ver catálogo completo <ChevronRight size={14} />
                            </a>
                            <a
                                href="/contacto"
                                className="inline-flex items-center gap-2 rounded-xl border border-[#F5B400] px-6 py-3 font-body font-bold text-xs uppercase text-[#F5B400] hover:bg-[#F5B400] hover:text-black transition-colors"
                            >
                                Contáctanos
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="bg-[#0b0b0b] text-white py-8 border-t border-zinc-800 text-center font-body text-xs text-zinc-500">
                <p>© {new Date().getFullYear()} Ferretería La Rebaja · Ibagué, Tolima · <a href="tel:3152987887" className="hover:text-white">315 298 7887</a></p>
            </footer>
        </>
    );
}
