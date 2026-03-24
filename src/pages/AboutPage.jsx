import { motion } from 'framer-motion';
import Bio from '../sections/Bio';

export default function AboutPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-20 lg:pt-32"
        >
            <Bio />
        </motion.div>
    );
}
