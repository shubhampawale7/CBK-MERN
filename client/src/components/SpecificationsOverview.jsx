// client/src/components/SpecificationsOverview.jsx
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaRulerCombined,
  FaLayerGroup,
  FaCogs,
  FaTools,
  FaHandPointer,
} from "react-icons/fa";

// --- Data (Unchanged) ---
const specFeatures = [
  {
    id: "size",
    icon: FaRulerCombined,
    title: "Plate Size Range",
    details: "Standard sizes up to 1350mm x 3000mm.",
  },
  {
    id: "deposit",
    icon: FaLayerGroup,
    title: "Deposit Thickness",
    details: "From 3mm to 8mm for tailored wear resistance.",
  },
  {
    id: "base",
    icon: FaCogs,
    title: "Base Plate Thickness",
    details: "Ranging from 5mm to 12mm for structural integrity.",
  },
  {
    id: "fabrication",
    icon: FaTools,
    title: "Custom Fabrication",
    details: "Custom radii, sine wave deposits, and double-sided overlays.",
  },
];

const SpecificationsOverview = () => {
  const constraintsRef = useRef(null);

  return (
    <section className="py-24 bg-white dark:bg-brand-dark-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold text-brand-orange dark:text-brand-orange-light">
            Engineered to Exacting Standards
          </h2>
          <p className="mt-4 font-serif text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide custom-fabricated wear plates with precise dimensions and
            features to meet the unique demands of your industrial applications.
          </p>
          <div className="mt-6 text-brand-orange animate-pulse flex items-center justify-center gap-2">
            <FaHandPointer size={20} />
            <span className="font-semibold">Drag to explore</span>
          </div>
        </motion.div>

        <motion.div className="w-full cursor-grab" ref={constraintsRef}>
          <motion.div
            className="flex gap-8 w-max"
            drag="x"
            dragConstraints={constraintsRef}
          >
            {specFeatures.map((spec) => (
              <SpecCard key={spec.id} spec={spec} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const SpecCard = ({ spec }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
    className="w-[320px] font-serif h-[220px] bg-brand-light dark:bg-brand-dark p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 flex flex-col justify-between"
  >
    <div className="flex justify-between items-start">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white w-2/3">
        {spec.title}
      </h3>
      <div className="p-3 bg-brand-orange/10 rounded-lg">
        <spec.icon className="text-3xl text-brand-orange" />
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-400">{spec.details}</p>
  </motion.div>
);

export default SpecificationsOverview;
