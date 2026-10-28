import { Head } from '@inertiajs/react';
import { Award, ShieldCheck, Headphones, HeartHandshake, Globe } from 'lucide-react';
import Navbar from '../../Components/Navbar';
import CartDrawer from '../../Components/CartDrawer';

export default function Index() {

    const values = [
        { title: 'Calidad', desc: 'Productos garantizados', icon: <Award size={24} className="text-[#F5B400]" /> },
        { title: 'Honestidad', desc: 'Transparencia ante todo', icon: <ShieldCheck size={24} className="text-[#F5B400]" /> },
        { title: 'Servicio', desc: 'Te asesoramos siempre', icon: <Headphones size={24} className="text-[#F5B400]" /> },
        { title: 'Compromiso', desc: 'Con nuestros clientes', icon: <HeartHandshake size={24} className="text-[#F5B400]" /> },
        { title: 'Responsabilidad', desc: 'Con el entorno', icon: <Globe size={24} className="text-[#F5B400]" /> },
    ];

    return (
        <>
            <Head title="Nosotros | Ferretería La Rebaja">
                <meta name="description" content="Conoce más sobre Ferretería La Rebaja, más de 10 años siendo tu aliado confiable en Ibagué." />
            </Head>

            <Navbar activePage="about" />

            <main className="min-h-screen bg-[#F8F9FA] pb-16 font-body">
                {/* BLACK HEADER BAR */}
                <div className="bg-[#111111] text-white py-3 px-4 md:px-8 border-b border-zinc-800">
                    <div className="mx-auto max-w-[1300px] font-heading font-extrabold text-sm uppercase tracking-wider">
                        6. NOSOTROS
                    </div>
                </div>

                <div className="mx-auto max-w-[1300px] px-4 md:px-8 pt-6 space-y-12">
                    {/* TITLE & SUBTITLE */}
                    <div>
                        <h1 className="font-heading font-extrabold text-3xl md:text-4xl uppercase tracking-tight text-gray-900">
                            SOMOS FERRETERÍA LA REBAJA
                        </h1>
                        <p className="text-xs text-gray-600 mt-1 font-medium">
                            Más de 10 años siendo tu aliado confiable en herramientas y materiales de construcción.
                        </p>
                    </div>

                    {/* STORE PHOTO + MISSION & VISION ROW */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* LEFT: STORE PHOTO */}
                        <div className="lg:col-span-6 relative rounded-xl overflow-hidden shadow-md border border-gray-200 bg-[#111111] h-72 md:h-80 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                            <div className="absolute top-4 left-4 z-20 bg-[#C81010] text-white px-4 py-1 font-heading font-extrabold text-lg uppercase tracking-wider shadow">
                                LA REBAJA
                            </div>
                            <div className="relative z-20 text-center text-white px-6">
                                <h3 className="font-heading font-extrabold text-2xl md:text-3xl uppercase tracking-wide">
                                    FERRETERÍA LA REBAJA
                                </h3>
                                <p className="text-xs text-zinc-300 mt-1 font-medium">Av. 37 No. 10-72, Ibagué, Tolima</p>
                            </div>
                        </div>

                        {/* RIGHT: MISSION & VISION */}
                        <div className="lg:col-span-6 space-y-6">
                            <div className="space-y-2 border-l-4 border-[#C81010] pl-4">
                                <h3 className="font-heading font-extrabold text-lg uppercase text-gray-900">
                                    Nuestra misión
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
                                    Brindar productos de calidad, precios justos y asesoría experta para que nuestros clientes puedan realizar sus proyectos con confianza.
                                </p>
                            </div>

                            <div className="space-y-2 border-l-4 border-[#F5B400] pl-4">
                                <h3 className="font-heading font-extrabold text-lg uppercase text-gray-900">
                                    Nuestra visión
                                </h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
                                    Ser la ferretería líder en Ibagué y la región, reconocida por su excelencia en servicio y variedad de productos.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* NUESTROS VALORES SECTION */}
                    <div className="space-y-6">
                        <h2 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-gray-900 border-b border-gray-200 pb-3">
                            Nuestros valores
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {values.map((v, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm hover:border-[#F5B400] hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2"
                                >
                                    <div className="h-14 w-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shadow-inner">
                                        {v.icon}
                                    </div>
                                    <h4 className="font-heading font-bold text-sm text-gray-900">{v.title}</h4>
                                    <p className="text-[11px] text-gray-500 font-medium leading-tight">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
