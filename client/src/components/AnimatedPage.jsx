// client/src/components/AnimatedPage.jsx
import { motion } from "framer-motion";

// UPDATED: Simplified the animation to a clean fade for better performance.
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

// UPDATED: Shortened the duration and changed the easing for a snappier feel.
const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3, // Reduced from 0.5s to 0.3s
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
