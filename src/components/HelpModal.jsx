import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Keyboard } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
    const shortcuts = [
        { key: 'j', desc: 'Scroll Down' },
        { key: 'k', desc: 'Scroll Up' },
        { key: 'gg', desc: 'Go to Top' },
        { key: 'G', desc: 'Go to Bottom' },
        { key: '?', desc: 'Toggle this Help' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-void/90 backdrop-blur-md"
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-surface border border-white/10 p-8 shadow-2xl"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-cyan/10 rounded-lg">
                                <Keyboard className="text-cyan" size={24} />
                            </div>
                            <h2 className="text-xl font-mono tracking-tight font-bold uppercase">
                                System Shortcuts
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {shortcuts.map(({ key, desc }) => (
                                <div key={key} className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <span className="text-sm font-mono text-white/60 lowercase">
                                        // {desc}
                                    </span>
                                    <kbd className="px-3 py-1 bg-white/5 border border-white/10 rounded text-cyan font-mono text-xs font-bold min-w-[2.5rem] text-center">
                                        {key}
                                    </kbd>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-void/50 border border-white/5 rounded-lg">
                            <p className="text-[10px] mono text-white/30 text-center uppercase tracking-[0.2em]">
                                Terminal Mode v1.2.0-STABLE
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
