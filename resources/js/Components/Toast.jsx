import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
    return (
        <AnimatePresence>
            {toast && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900/95 p-4 text-white shadow-2xl backdrop-blur-md border border-slate-700/50 max-w-md"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                        <CheckCircle2 size={22} />
                    </div>
                    <div className="flex-1 pr-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">¡Producto añadido!</h4>
                        <p className="text-sm font-semibold text-slate-100 line-clamp-1">{toast.message}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                        aria-label="Cerrar notificación"
                    >
                        <X size={18} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
