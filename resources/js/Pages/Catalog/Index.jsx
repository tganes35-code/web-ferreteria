import { Head, useForm } from '@inertiajs/react';
import { Search, ShoppingBag, SlidersHorizontal, RotateCcw, Filter, Star, LayoutGrid, List } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../Contexts/CartContext';
import Navbar from '../../Components/Navbar';

const fallback = '/images/realistic/electricas.jpg';

function money(value) {
    return `$${Number(value).toLocaleString('es-CO')}`;
}

export default function Index({ products, filters = {}, categories = [], brands = [] }) {
    const { add } = useCart();
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        brand: filters.brand || '',
        min_price: filters.min_price || '',
        max_price: filters.max_price || '500000',
        in_stock: filters.in_stock ?? true,
        backorder: filters.backorder ?? false,
        on_sale: filters.on_sale ?? false,
        sort: filters.sort || 'relevance'
    });

    const submit = (event) => {
        if (event) event.preventDefault();
        get('/catalogo', { preserveScroll: true, replace: true });
    };

    const resetFilters = () => {
        setData({
            search: '',
            category: '',
            brand: '',
            min_price: '',
            max_price: '500000',
            in_stock: false,
            backorder: false,
            on_sale: false,
            sort: 'relevance'
        });
        get('/catalogo', { preserveScroll: true, replace: true });
    };

    const productList = products.data || products;
    const totalCount = products.total || productList.length;

    return (
        <>
            <Head title="Todos los Productos | Ferretería La Rebaja">
                <meta name="description" content="Encuentra todo lo que necesitas para construir, reparar y remodelar al mejor precio en Ibagué." />
            </Head>

            <Navbar activePage="catalog" />

            <main className="min-h-screen bg-[#F8F9FA] pb-16 font-body">
                {/* BLACK HEADER BAR */}
                <div className="bg-[#111111] text-white py-3 px-4 md:px-8 border-b border-zinc-800">
                    <div className="mx-auto max-w-[1400px] font-heading font-extrabold text-sm uppercase tracking-wider">
                        TODOS LOS PRODUCTOS
                    </div>
                </div>

                <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-6">
                    {/* BREADCRUMB & HEADER */}
                    <div className="mb-6 border-b border-gray-200 pb-4 font-body">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                            <a href="/" className="hover:text-[#C81010] transition-colors">Inicio</a>
                            <span>/</span>
                            <span className="text-gray-900 font-semibold">Todos los productos</span>
                        </div>
                        <h1 className="font-heading font-extrabold text-3xl md:text-4xl uppercase tracking-tight text-gray-900">
                            TODOS LOS PRODUCTOS
                        </h1>
                        <p className="text-xs text-gray-600 mt-1 font-medium">
                            Encuentra todo lo que necesitas para construir, reparar y remodelar.
                        </p>
                    </div>

                    {/* MAIN TWO COLUMN LAYOUT */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* LEFT SIDEBAR FILTERS (3 cols) */}
                        <form onSubmit={submit} className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-6">
                            <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                                <h2 className="font-heading font-bold text-base uppercase text-gray-900 flex items-center gap-2">
                                    <SlidersHorizontal size={18} className="text-[#C81010]" />
                                    FILTRAR PRODUCTOS
                                </h2>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="text-[11px] font-semibold text-gray-400 hover:text-[#C81010] transition-colors"
                                >
                                    Limpiar
                                </button>
                            </div>

                            {/* CATEGORÍAS */}
                            <div>
                                <h3 className="font-heading font-bold text-xs uppercase text-gray-800 mb-3">Categorías</h3>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs">
                                    {categories.map((cat) => (
                                        <label key={cat.slug} className="flex items-center justify-between cursor-pointer group text-gray-700 hover:text-[#C81010]">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={cat.slug}
                                                    checked={data.category === cat.slug}
                                                    onChange={(e) => {
                                                        setData('category', e.target.value);
                                                        submit();
                                                    }}
                                                    className="h-3.5 w-3.5 text-[#C81010] border-gray-300 focus:ring-[#C81010]"
                                                />
                                                <span className="group-hover:font-semibold transition-colors">{cat.name}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-semibold">({cat.count || 120})</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* MARCA */}
                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="font-heading font-bold text-xs uppercase text-gray-800 mb-2">Marca</h3>
                                <select
                                    aria-label="Seleccionar marca"
                                    value={data.brand}
                                    onChange={(e) => {
                                        setData('brand', e.target.value);
                                        submit();
                                    }}
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-xs text-gray-800 outline-none focus:border-[#C81010]"
                                >
                                    <option value="">Todas las marcas</option>
                                    {brands.map((b) => (
                                        <option key={b.slug} value={b.slug}>{b.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* RANGO DE PRECIO */}
                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="font-heading font-bold text-xs uppercase text-gray-800 mb-2">Rango de precio</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs text-gray-500 font-semibold">$0</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000000"
                                        step="10000"
                                        value={data.max_price || 500000}
                                        onChange={(e) => setData('max_price', e.target.value)}
                                        className="w-full accent-[#C81010]"
                                    />
                                    <span className="text-xs text-gray-900 font-bold">{money(data.max_price || 500000)}</span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#C81010] text-white py-2 rounded-lg font-body font-bold text-xs uppercase tracking-wider hover:bg-[#A00C0C] transition-colors shadow"
                                >
                                    FILTRAR
                                </button>
                            </div>

                            {/* DISPONIBILIDAD */}
                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="font-heading font-bold text-xs uppercase text-gray-800 mb-2.5">Disponibilidad</h3>
                                <div className="space-y-2 text-xs">
                                    <label className="flex items-center justify-between cursor-pointer text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={data.in_stock}
                                                onChange={(e) => setData('in_stock', e.target.checked)}
                                                className="h-3.5 w-3.5 text-[#C81010] rounded border-gray-300 focus:ring-[#C81010]"
                                            />
                                            <span>En stock</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-semibold">(125)</span>
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={data.backorder}
                                                onChange={(e) => setData('backorder', e.target.checked)}
                                                className="h-3.5 w-3.5 text-[#C81010] rounded border-gray-300 focus:ring-[#C81010]"
                                            />
                                            <span>Disponible bajo pedido</span>
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-semibold">(8)</span>
                                    </label>
                                </div>
                            </div>

                            {/* OFERTAS */}
                            <div className="border-t border-gray-100 pt-4">
                                <h3 className="font-heading font-bold text-xs uppercase text-gray-800 mb-2.5">Ofertas</h3>
                                <label className="flex items-center justify-between cursor-pointer text-xs text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={data.on_sale}
                                            onChange={(e) => setData('on_sale', e.target.checked)}
                                            className="h-3.5 w-3.5 text-[#C81010] rounded border-gray-300 focus:ring-[#C81010]"
                                        />
                                        <span>Productos en oferta</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-semibold">(25)</span>
                                </label>
                            </div>
                        </form>

                        {/* RIGHT PRODUCTS GRID AREA (9 cols) */}
                        <div className="lg:col-span-9 space-y-5">
                            {/* TOP TOOLBAR: SORT & VIEW MODE */}
                            <div className="bg-white border border-gray-200 rounded-xl p-3.5 px-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                                <div className="flex items-center gap-2 text-xs text-gray-700">
                                    <span>Ordenar por:</span>
                                    <select
                                        aria-label="Ordenar por"
                                        value={data.sort}
                                        onChange={(e) => {
                                            setData('sort', e.target.value);
                                            submit();
                                        }}
                                        className="rounded-lg border border-gray-300 bg-white py-1.5 px-3 text-xs text-gray-900 outline-none font-medium focus:border-[#C81010]"
                                    >
                                        <option value="relevance">Más relevantes</option>
                                        <option value="price_asc">Menor precio</option>
                                        <option value="price_desc">Mayor precio</option>
                                        <option value="newest">Más recientes</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                                    <span>Mostrando 1-{productList.length} de {totalCount} productos</span>

                                    <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
                                        <button
                                            type="button"
                                            aria-label="Vista de cuadrícula"
                                            onClick={() => setViewMode('grid')}
                                            className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-[#C81010] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            <LayoutGrid size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Vista de lista"
                                            onClick={() => setViewMode('list')}
                                            className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-[#C81010] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                        >
                                            <List size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* PRODUCTS DISPLAY */}
                            {productList.length ? (
                                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5' : 'space-y-4'}>
                                    {productList.map((product) => (
                                        <article
                                            key={product.id}
                                            className="group bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-[#F5B400] transition-all flex flex-col justify-between relative"
                                        >
                                            {product.is_offer && (
                                                <span className="absolute top-3 left-3 z-10 bg-[#F5B400] text-black font-body text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-sm">
                                                    OFERTA
                                                </span>
                                            )}

                                            <div>
                                                <a href={`/producto/${product.slug}`} className="block">
                                                    <div className="h-44 w-full flex items-center justify-center p-3 mb-3 bg-[#F8F9FA] rounded-lg">
                                                        <img
                                                            src={product.images?.[0] || fallback}
                                                            alt={product.name}
                                                            onError={(e) => { e.currentTarget.src = fallback; }}
                                                            loading="lazy"
                                                            className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                                                        />
                                                    </div>

                                                    <h3 className="font-body font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 min-h-[38px] group-hover:text-[#C81010] transition-colors leading-tight">
                                                        {product.name}
                                                    </h3>
                                                </a>

                                                {/* STAR RATING */}
                                                <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={12} fill="currentColor" className="text-amber-400" />
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-400 font-normal ml-1">({product.reviews_count || 24})</span>
                                                </div>

                                                {/* PRICING */}
                                                <div className="mt-2 flex items-baseline gap-2">
                                                    <b className="font-price font-bold text-xl text-[#C81010]">
                                                        {money(product.sale_price || product.price)}
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
                                                className="mt-4 w-full rounded bg-[#F5B400] py-2.5 font-body font-bold text-xs uppercase tracking-wider text-black hover:bg-[#D99F00] active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-sm flex items-center justify-center gap-2"
                                            >
                                                <ShoppingBag size={15} />
                                                {product.stock ? 'Agregar al carrito' : 'Agotado'}
                                            </button>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                                    <h3 className="font-heading font-bold text-xl uppercase text-gray-800">No encontramos productos</h3>
                                    <p className="text-xs text-gray-500 mt-1">Prueba cambiando las opciones de filtro seleccionadas.</p>
                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="mt-4 inline-flex items-center gap-2 rounded bg-[#C81010] px-5 py-2 text-xs font-bold uppercase text-white hover:bg-[#A00C0C]"
                                    >
                                        Limpiar filtros
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
