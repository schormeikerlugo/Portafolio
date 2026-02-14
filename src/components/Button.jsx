import { motion } from 'framer-motion';

export default function Button({ children, onClick, href, className = '' }) {
    const Component = href ? motion.a : motion.button;

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`
        inline-flex items-center gap-2.5 px-7 py-3
        panel rounded-md
        text-cyan font-mono text-xs tracking-[0.15em] uppercase
        cursor-pointer select-none
        hover-glow-soft
        active:scale-[0.98]
        ${className}
      `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
        >
            {children}
        </Component>
    );
}
