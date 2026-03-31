import { motion } from 'framer-motion';
import Anomalies from '../sections/Anomalies';
import Skills from '../sections/Skills';
import Metrics from '../sections/Metrics';

/* ── Simple horizontal separator ── */
const SectionDivider = () => (
    <div className="relative w-full h-px bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
    </div>
);

const Approach = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 lg:pt-32 space-y-0"
    >
      <Anomalies isTeaser={false} />
      <SectionDivider />
      <Metrics />
      <SectionDivider />
      <Skills isTeaser={false} />
    </motion.div>
  );
};

export default Approach;
