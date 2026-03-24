import { useMemo } from 'react';
import { motion } from 'framer-motion';

const multipleBoxShadow = (n, width = 2000, height = 2000) => {
  let value = `${Math.floor(Math.random() * width)}px ${Math.floor(Math.random() * height)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * width)}px ${Math.floor(Math.random() * height)}px #FFF`;
  }
  return value;
};

const StarLayer = ({ size, count, duration, delay = 0 }) => {
  const shadows = useMemo(() => multipleBoxShadow(count), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute bg-transparent"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: shadows,
        }}
        animate={{
          y: [0, -2000],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
      >
        {/* Pseudo-element for seamless looping */}
        <div
          className="absolute bg-transparent"
          style={{
            top: '2000px',
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: shadows,
          }}
        />
      </motion.div>
    </div>
  );
};

export const StarfieldVisual = () => {
    return (
        <div className="relative w-full h-full opacity-60">
            {/* Background Layer (Smallest) */}
            <StarLayer size={1} count={700} duration={50} />
            {/* Middle Layer (Medium) */}
            <StarLayer size={2} count={200} duration={100} />
            {/* Top Layer (Largest) */}
            <StarLayer size={3} count={100} duration={150} />
        </div>
    );
};

export const PhilosophyVisuals = () => {
    return (
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[70%] z-10 overflow-hidden pointer-events-none opacity-40 select-none">
            <StarfieldVisual />
            {/* Smooth mask to transition into the text side */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none" />
        </div>
    );
};
