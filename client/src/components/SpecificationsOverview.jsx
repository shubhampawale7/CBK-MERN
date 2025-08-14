// client/src/components/SpecificationsOverview.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRulerCombined,
  FaLayerGroup,
  FaCogs,
  FaTools,
  FaCheckCircle,
  FaProjectDiagram,
} from "react-icons/fa";

// Expanded and reorganized data from the brochure
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
    details:
      "Plates can be supplied with custom radii, sine wave deposits, and double-sided overlays.",
  },
];

const SpecificationsOverview = () => {
  const [hoveredSpec, setHoveredSpec] = useState(null);

  return (
    <section className="py-20 bg-white dark:bg-brand-dark-light">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
            Engineered to Exacting Standards
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide custom-fabricated wear plates with precise dimensions and
            features to meet the unique demands of your industrial applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Column: Features */}
          <div className="space-y-4">
            {specFeatures.slice(0, 2).map((spec, index) => (
              <SpecCard
                key={spec.id}
                spec={spec}
                setHoveredSpec={setHoveredSpec}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Center Column: SVG Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-80"
          >
            <svg
              viewBox="0 0 100 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Weld Deposit Layer */}
              <rect
                y="20"
                width="100"
                height="20"
                className={`fill-brand-orange/30 stroke-brand-orange transition-all duration-300 ${
                  hoveredSpec === "deposit" ? "stroke-2" : "stroke-0"
                }`}
              />
              <text
                x="50"
                y="35"
                textAnchor="middle"
                className="text-sm font-bold fill-brand-orange-dark dark:fill-brand-orange-light"
              >
                Weld Deposit
              </text>

              {/* Base Plate Layer */}
              <rect
                y="40"
                width="100"
                height="20"
                className={`fill-gray-300 dark:fill-gray-600 stroke-gray-700 dark:stroke-gray-300 transition-all duration-300 ${
                  hoveredSpec === "base" ? "stroke-2" : "stroke-0"
                }`}
              />
              <text
                x="50"
                y="55"
                textAnchor="middle"
                className="text-sm font-bold fill-gray-800 dark:fill-gray-200"
              >
                Base Plate
              </text>
            </svg>
          </motion.div>

          {/* Right Column: Features */}
          <div className="space-y-4">
            {specFeatures.slice(2, 4).map((spec, index) => (
              <SpecCard
                key={spec.id}
                spec={spec}
                setHoveredSpec={setHoveredSpec}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for the feature cards to keep the main component clean
const SpecCard = ({ spec, setHoveredSpec, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    onMouseEnter={() => setHoveredSpec(spec.id)}
    onMouseLeave={() => setHoveredSpec(null)}
    className="bg-brand-light dark:bg-brand-dark p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <spec.icon className="text-3xl text-brand-orange" />
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

export default SpecificationsOverview;
