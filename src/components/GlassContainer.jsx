import { motion } from 'framer-motion';

export default function GlassContainer({ children, className = '', active = false, ...props }) {
    return (
        <motion.div
            className={`panel rounded-lg glow-hover ${active ? 'panel-active' : ''} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
