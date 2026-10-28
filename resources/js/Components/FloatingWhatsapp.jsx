import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '573152987887';
const DEFAULT_MSG = 'Hola Ferretería La Rebaja, estoy interesado en sus productos y quisiera recibir información.';

export default function FloatingWhatsapp() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MSG)}`;

    return (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 font-body">
            {/* Tooltip / Badge */}
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 rounded-full bg-[#111111]/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg border border-zinc-700/60 hover:border-[#F5B400] hover:text-[#F5B400] transition-all"
            >
                <span className="h-2 w-2 rounded-full bg-[#25d366] animate-ping"></span>
                <span>¿Necesitas ayuda?</span>
            </a>

            {/* Floating Button */}
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label="Contactar por WhatsApp"
                className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all group"
            >
                <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-40 animate-ping pointer-events-none"></span>
                <MessageCircle size={28} className="relative z-10" />
            </a>
        </div>
    );
}
