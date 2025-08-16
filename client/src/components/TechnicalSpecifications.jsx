// client/src/components/TechnicalSpecifications.jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaRulerCombined,
  FaLayerGroup,
  FaCogs,
  FaTools,
  FaWaveSquare,
} from "react-icons/fa";

// --- Data (Unchanged) ---
const specFeatures = [
  {
    id: "deposit",
    icon: FaLayerGroup,
    title: "Weld Deposit Thickness",
    details:
      "Uniform weld deposit with thicknesses ranging from 3mm to 8mm, ensuring optimal wear resistance.",
  },
  {
    id: "base",
    icon: FaCogs,
    title: "Base Plate Thickness",
    details:
      "Mild-steel base plates are available in thicknesses from 5mm up to 12mm for robust structural integrity.",
  },
  {
    id: "size",
    icon: FaRulerCombined,
    title: "Plate Size Range",
    details:
      "Supplied in large formats, including 1350mm x 3000mm, to cover extensive surface areas.",
  },
  {
    id: "fabrication",
    icon: FaTools,
    title: "Custom Fabrication",
    details:
      "We offer custom cutting, bending, and shaping to fit your machinery perfectly.",
  },
  {
    id: "special",
    icon: FaWaveSquare,
    title: "Specialty Options",
    details:
      "Plates with unique sine wave deposits or double-sided welding are available as required.",
  },
];

const TechnicalSpecifications = () => {
  const [hoveredSpec, setHoveredSpec] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="py-24 bg-white font-serif dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
            Engineered to Exacting Standards
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Every CBK wear plate is a product of precision engineering, offering
            a wide range of customizable specifications for optimal performance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-3 gap-8 items-center"
        >
          {/* Left Column: First half of features */}
          <div className="space-y-6">
            {specFeatures.slice(0, 3).map((spec) => (
              <SpecCard
                key={spec.id}
                spec={spec}
                setHoveredSpec={setHoveredSpec}
              />
            ))}
          </div>

          {/* Center Column: Animated SVG Diagram */}
          <motion.div
            variants={itemVariants}
            className="w-full h-96 hidden lg:block"
          >
            <AnimatedDiagram hoveredSpec={hoveredSpec} />
          </motion.div>

          {/* Right Column: Second half of features */}
          <div className="space-y-6">
            {specFeatures.slice(3).map((spec) => (
              <SpecCard
                key={spec.id}
                spec={spec}
                setHoveredSpec={setHoveredSpec}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SpecCard = ({ spec, setHoveredSpec }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
    onMouseEnter={() => setHoveredSpec(spec.id)}
    onMouseLeave={() => setHoveredSpec(null)}
    className="group relative p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-orange/50 dark:hover:border-brand-orange/50 transition-all duration-300 bg-white dark:bg-brand-dark-light hover:shadow-xl hover:shadow-brand-orange/10"
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 bg-brand-light dark:bg-brand-dark p-3 rounded-lg">
        <spec.icon className="text-2xl text-brand-orange" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {spec.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{spec.details}</p>
      </div>
    </div>
  </motion.div>
);

const AnimatedDiagram = ({ hoveredSpec }) => (
  <svg
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    {/* Glow Filters */}
    <defs>
      <filter id="glow-orange">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glow-gray">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Weld Deposit Layer */}
    <motion.g
      animate={{
        filter: hoveredSpec === "deposit" ? "url(#glow-orange)" : "none",
      }}
    >
      <rect y="20" width="100" height="20" className="fill-brand-orange/80" />
      <text
        x="50"
        y="33"
        textAnchor="middle"
        className="text-[6px] font-bold fill-white"
      >
        Weld Deposit
      </text>
    </motion.g>

    {/* Base Plate Layer */}
    <motion.g
      animate={{ filter: hoveredSpec === "base" ? "url(#glow-gray)" : "none" }}
    >
      <rect
        y="40"
        width="100"
        height="20"
        className="fill-gray-400 dark:fill-gray-600"
      />
      <text
        x="50"
        y="53"
        textAnchor="middle"
        className="text-[6px] font-bold fill-white"
      >
        Base Plate
      </text>
    </motion.g>

    {/* Animated annotations */}
    <AnimatePresence>
      {hoveredSpec === "deposit" && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <path
            d="M102 20 L110 20 L110 40 L102 40"
            stroke="#F58220"
            strokeWidth="1"
          />
          <text
            x="112"
            y="32"
            className="text-[6px] font-bold fill-brand-orange"
          >
            3-8mm
          </text>
        </motion.g>
      )}
      {hoveredSpec === "base" && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <path
            d="M102 40 L110 40 L110 60 L102 60"
            stroke="gray"
            strokeWidth="1"
          />
          <text x="112" y="52" className="text-[6px] font-bold fill-gray-500">
            5-12mm
          </text>
        </motion.g>
      )}
    </AnimatePresence>
  </svg>
);

export default TechnicalSpecifications;
