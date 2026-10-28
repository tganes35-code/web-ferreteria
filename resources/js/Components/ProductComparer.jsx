import { X, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../Contexts/CartContext';

function money(val) {
    return `$${Number(val).toLocaleString('es-CO')}`;
}

export default function ProductComparer({ products = [], onClose, onRemove }) {
    const { add } = useCart();

    if (!products.length) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-body">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between bg-[#111111] text-white p-5 rounded-t-2xl">
                    <div>
                        <h2 className="font-heading font-extrabold text-xl uppercase tracking-wider text-white">
                            COMPARADOR DE PRODUCTOS ({products.length}/3)
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">Compara especificaciones técnicas de tus herramientas seleccionadas</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                        aria-label="Cerrar comparador"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Table Comparison */}
                <div className="p-6 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="p-3 w-1/4 font-heading font-bold uppercase text-gray-500 bg-gray-50">Atributo</th>
                                {products.map((p) => (
                                    <th key={p.id} className="p-3 w-1/4 align-top border-l border-gray-200 bg-gray-50/50">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold text-[#C81010] uppercase bg-red-50 px-2 py-0.5 rounded">
                                                {p.brand?.name || 'Marca'}
                                            </span>
                                            <button
                                                onClick={() => onRemove(p.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                                title="Quitar del comparador"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <div className="h-20 w-full flex items-center justify-center p-1 bg-white rounded-lg border border-gray-200 mb-2">
                                            <img src={p.images?.[0]} alt={p.name} className="max-h-full max-w-full object-contain" />
                                        </div>
                                        <h4 className="font-bold text-xs text-gray-900 line-clamp-2 min-h-[32px]">{p.name}</h4>
                                        <div className="mt-2 font-price font-extrabold text-base text-[#C81010]">
                                            {money(p.sale_price ?? p.price)}
                                        </div>
                                        <button
                                            onClick={() => add(p)}
                                            className="mt-3 w-full bg-[#F5B400] text-black font-bold py-2 rounded-lg text-[11px] uppercase hover:bg-[#D99F00] transition-colors flex items-center justify-center gap-1"
                                        >
                                            <ShoppingBag size={13} /> Agregar
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* Marca */}
                            <tr>
                                <td className="p-3 font-bold text-gray-700 bg-gray-50">Marca</td>
                                {products.map((p) => (
                                    <td key={p.id} className="p-3 border-l border-gray-200 text-gray-900 font-semibold">
                                        {p.brand?.name || 'No especificado'}
                                    </td>
                                ))}
                            </tr>
                            {/* Precio */}
                            <tr>
                                <td className="p-3 font-bold text-gray-700 bg-gray-50">Precio</td>
                                {products.map((p) => (
                                    <td key={p.id} className="p-3 border-l border-gray-200 text-gray-900 font-bold font-price">
                                        {money(p.sale_price ?? p.price)}
                                    </td>
                                ))}
                            </tr>
                            {/* Potencia / Capacidad */}
                            <tr>
                                <td className="p-3 font-bold text-gray-700 bg-gray-50">Potencia / Capacidad</td>
                                {products.map((p) => {
                                    const feat = p.features?.find(f => f.toLowerCase().includes('potencia') || f.toLowerCase().includes('capacidad') || f.toLowerCase().includes('contenido') || f.toLowerCase().includes('peso'));
                                    return (
                                        <td key={p.id} className="p-3 border-l border-gray-200 text-gray-800">
                                            {feat || p.specs?.['Potencia'] || 'No especificado'}
                                        </td>
                                    );
                                })}
                            </tr>
                            {/* Velocidad / Medidas */}
                            <tr>
                                <td className="p-3 font-bold text-gray-700 bg-gray-50">Velocidad / Medidas</td>
                                {products.map((p) => {
                                    const feat = p.features?.find(f => f.toLowerCase().includes('velocidad') || f.toLowerCase().includes('medida') || f.toLowerCase().includes('largo') || f.toLowerCase().includes('diámetro'));
                                    return (
                                        <td key={p.id} className="p-3 border-l border-gray-200 text-gray-800">
                                            {feat || p.specs?.['Velocidad'] || 'No especificado'}
                                        </td>
                                    );
                                })}
                            </tr>
                            {/* Disponibilidad */}
                            <tr>
                                <td className="p-3 font-bold text-gray-700 bg-gray-50">Disponibilidad</td>
                                {products.map((p) => (
                                    <td key={p.id} className="p-3 border-l border-gray-200">
                                        <span className={`inline-flex items-center gap-1 font-bold text-[11px] ${p.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                            <Check size={12} /> {p.stock > 0 ? 'En stock' : 'Agotado'}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                            {/* Características principales */}
                            <tr>
                                <td className="p-3 font-bold text-gray-700 bg-gray-50">Características</td>
                                {products.map((p) => (
                                    <td key={p.id} className="p-3 border-l border-gray-200 text-gray-600 leading-relaxed">
                                        {p.features?.length ? (
                                            <ul className="list-disc list-inside space-y-1">
                                                {p.features.slice(0, 3).map((f, idx) => (
                                                    <li key={idx}>{f}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            'No especificado'
                                        )}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200 text-right rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="bg-[#111111] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-zinc-800 transition-colors"
                    >
                        Cerrar Comparador
                    </button>
                </div>
            </div>
        </div>
    );
}
