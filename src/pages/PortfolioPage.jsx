import { motion } from 'framer-motion';
import Portfolio from '../sections/Portfolio';
import Protocols from '../sections/Protocols';
import { useNavigate } from 'react-router-dom';

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
      <Protocols />
    </motion.div>
  );
};

export default PortfolioPage;
