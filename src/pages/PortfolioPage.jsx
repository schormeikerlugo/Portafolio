import { motion } from 'framer-motion';
import Portfolio from '../sections/Portfolio';
import Protocols from '../sections/Protocols';
import { useNavigate } from 'react-router-dom';

/* ── Simple horizontal separator ── */
const SectionDivider = () => (
    <div className="relative w-full h-px bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
    </div>
);

const PortfolioPage = () => {
  const navigate = useNavigate();

  const handleSelectProject = (project) => {
    navigate(`/portfolio/${project.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="pt-20"
    >
      <Portfolio onSelectProject={handleSelectProject} />
      <SectionDivider />
      <Protocols />
    </motion.div>
  );
};

export default PortfolioPage;
