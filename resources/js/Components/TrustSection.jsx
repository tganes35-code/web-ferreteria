import { Truck, ShieldCheck, Headphones, Wrench } from 'lucide-react';

export default function TrustSection() {
    const pillars = [
        {
            icon: Truck,
            title: 'ENVÍOS RÁPIDOS',
            sub: 'Ibagué y alrededores',
        },
        {
            icon: ShieldCheck,
            title: 'CALIDAD GARANTIZADA',
            sub: 'Productos seleccionados',
        },
        {
            icon: Headphones,
            title: 'ASESORÍA PERSONALIZADA',
            sub: 'Te ayudamos a elegir',
        },
        {
            icon: Wrench,
            title: 'SOLUCIONES PARA TU PROYECTO',
            sub: 'Todo en un solo lugar',
        },
    ];

    return (
        <section className="bg-white py-12 border-t border-b border-gray-200">
            <div className="mx-auto max-w-[1400px] px-4 font-body">
                <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-center uppercase tracking-tight text-gray-900 mb-8">
                    ¿POR QUÉ COMPRAR EN <span className="text-[#C81010]">FERRETERÍA LA REBAJA</span>?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {pillars.map(({ icon: Icon, title, sub }) => (
                        <div
                            key={title}
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-[#F8F9FA] hover:border-[#F5B400] transition-all shadow-sm"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5B400]/20 text-[#F5B400]">
                                <Icon size={24} />
                            </div>
                            <div className="leading-tight">
                                <h4 className="font-heading font-bold text-sm uppercase text-[#111111]">{title}</h4>
                                <p className="font-body font-medium text-xs text-gray-500 mt-0.5">{sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
