import { Head } from '@inertiajs/react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../../Components/Navbar';

export default function Index() {
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setError('');
        try {
            const response = await fetch('/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || Object.values(result.errors || {}).flat().join(' ') || 'No pudimos enviar el mensaje.');
            setSent(true);
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (submitError) {
            setError(submitError.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <Head title="Contacto | Ferretería La Rebaja">
                <meta name="description" content="Contáctanos para cualquier duda o cotización de herramientas y materiales en Ibagué." />
            </Head>

            <Navbar activePage="contact" />

            <main className="min-h-screen bg-[#F8F9FA] pb-16 font-body">
                {/* BLACK HEADER BAR */}
                <div className="bg-[#111111] text-white py-3 px-4 md:px-8 border-b border-zinc-800">
                    <div className="mx-auto max-w-[1300px] font-heading font-extrabold text-sm uppercase tracking-wider">
                        8. CONTACTO
                    </div>
                </div>

                <div className="mx-auto max-w-[1300px] px-4 md:px-8 pt-6 space-y-10">
                    {/* TITLE & SUBTITLE */}
                    <div>
                        <h1 className="font-heading font-extrabold text-3xl md:text-4xl uppercase tracking-tight text-gray-900">
                            CONTÁCTANOS
                        </h1>
                        <p className="text-xs text-gray-600 mt-1 font-medium">
                            Estamos aquí para ayudarte con todo lo que necesitas.
                        </p>
                    </div>

                    {/* TWO COLUMN GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* LEFT COLUMN: CONTACT DETAILS (5 cols) */}
                        <div className="lg:col-span-5 space-y-4 font-body">
                            {/* UBICACIÓN */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-amber-100 text-[#F5B400] flex items-center justify-center shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-xs uppercase text-gray-900">Ubicación</h4>
                                    <p className="text-xs text-gray-600 mt-0.5">Ibagué, Tolima, Colombia</p>
                                    <p className="text-[11px] text-gray-400">Av. 37 No. 10-72, barrio Gaitán</p>
                                </div>
                            </div>

                            {/* TELÉFONO */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-amber-100 text-[#F5B400] flex items-center justify-center shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-xs uppercase text-gray-900">Teléfono</h4>
                                    <a href="tel:3152987887" className="text-xs font-semibold text-gray-800 hover:text-[#C81010] block mt-0.5">
                                        315 298 7887
                                    </a>
                                </div>
                            </div>

                            {/* WHATSAPP */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-xs uppercase text-gray-900">WhatsApp</h4>
                                    <a href="https://wa.me/573152987887" target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-600 hover:underline block mt-0.5">
                                        315 298 7887
                                    </a>
                                </div>
                            </div>

                            {/* CORREO ELECTRÓNICO */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-amber-100 text-[#F5B400] flex items-center justify-center shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-xs uppercase text-gray-900">Correo electrónico</h4>
                                    <a href="mailto:ferreterialarebaja37@gmail.com" className="text-xs font-semibold text-gray-800 hover:text-[#C81010] block mt-0.5">
                                        ferreterialarebaja37@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* HORARIO DE ATENCIÓN */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-amber-100 text-[#F5B400] flex items-center justify-center shrink-0">
                                    <Clock size={20} />
                                </div>
                                <div className="text-xs space-y-0.5 text-gray-600">
                                    <h4 className="font-heading font-bold text-xs uppercase text-gray-900">Horario de atención</h4>
                                    <p>Lunes - Viernes: 7:30am - 6:00pm</p>
                                    <p>Sábado: 8:00am - 2:00pm</p>
                                    <p className="text-[#C81010] font-semibold">Domingos y festivos: Cerrado</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: CONTACT FORM (7 cols) */}
                        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                            {sent && (
                                <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-semibold">
                                    ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo lo antes posible.
                                </div>
                            )}
                            {error && <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">{error}</div>}

                            <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre completo</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Tu nombre y apellido"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full rounded-xl border border-gray-300 py-2.5 px-3.5 outline-none focus:border-[#C81010] text-gray-900"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Correo electrónico</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="ejemplo@correo.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full rounded-xl border border-gray-300 py-2.5 px-3.5 outline-none focus:border-[#C81010] text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Teléfono</label>
                                        <input
                                            type="tel"
                                            placeholder="300 000 0000"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full rounded-xl border border-gray-300 py-2.5 px-3.5 outline-none focus:border-[#C81010] text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Asunto</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Consulta o cotización"
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        className="w-full rounded-xl border border-gray-300 py-2.5 px-3.5 outline-none focus:border-[#C81010] text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mensaje</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Escribe tu mensaje aquí..."
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        className="w-full rounded-xl border border-gray-300 py-2.5 px-3.5 outline-none focus:border-[#C81010] text-gray-900 resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full bg-[#C81010] text-white py-3 rounded-xl font-body font-bold text-xs uppercase tracking-wider hover:bg-[#A00C0C] transition-colors shadow flex items-center justify-center gap-2"
                                >
                                    <Send size={15} />
                                    {sending ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* INTERACTIVE MAP CONTAINER */}
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-80 w-full relative bg-gray-100">
                        <iframe
                            title="Ubicación Ferretería La Rebaja"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15911.758368393527!2d-75.2155!3d4.4389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c4ff55555555%3A0x5555555555555555!2sIbague%2C%20Tolima!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco"
                            className="w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </main>

        </>
    );
}
