// client/src/components/PlaceholderImage.jsx
import { motion } from "framer-motion";

const PlaceholderImage = () => {
  return (
    <div className="relative w-full h-full bg-white dark:bg-brand-dark flex flex-col items-center justify-center overflow-hidden">
      {/* Animated subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      {/* Soft, pulsing background glow for a dynamic feel */}
      <motion.div
        className="absolute w-1/2 h-1/2 bg-brand-orange/10 dark:bg-brand-orange/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center text-gray-500 dark:text-gray-400">
        {/* Using the logo for a branded look */}
        <img
          src="/logo.png"
          alt="CBK Engineers Logo"
          className="h-12 w-auto mx-auto mb-4 dark:brightness-0 dark:invert"
        />
        <p className="font-semibold">Image Not Available</p>
        <p className="text-xs mt-1">Technical data available</p>
      </div>
    </div>
  );
};

export default PlaceholderImage;
