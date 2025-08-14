// client/src/components/TechnicalSpecifications.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRulerCombined,
  FaLayerGroup,
  FaCogs,
  FaTools,
  FaCheckCircle,
  FaWaveSquare,
} from "react-icons/fa";

// Expanded and reorganized data from the brochure for a richer display.
const specFeatures = [
  {
    id: "deposit",
    icon: FaLayerGroup,
    title: "Weld Deposit Thickness",
    details:
      "Our specialized powder fusion welding process allows for a uniform weld deposit with thicknesses ranging from 3mm to 8mm, ensuring optimal wear resistance tailored to your needs.",
  },
  {
    id: "base",
    icon: FaCogs,
    title: "Base Plate Thickness",
    details:
      "We build on a foundation of strength. The mild-steel base plates are available in thicknesses from 5mm up to 12mm, providing robust structural integrity for any application.",
  },
  {
    id: "size",
    icon: FaRulerCombined,
    title: "Plate Size Range",
    details:
      "We supply plates in large formats, including 1350mm x 3000mm and 1150mm x 2400mm, to cover extensive surface areas and minimize joint requirements.",
  },
  {
    id: "fabrication",
    icon: FaTools,
    title: "Custom Fabrication",
    details:
      "Beyond standard plates, we offer custom fabrication including bending plates to specific radii and creating complex shapes to fit your machinery perfectly.",
  },
  {
    id: "special",
    icon: FaWaveSquare,
    title: "Specialty Options",
    details:
      "We also provide plates with unique sine wave weld deposits for specific flow applications and can supply plates with weld deposits on both sides as required.",
  },
];

const TechnicalSpecifications = () => {
  const [hoveredSpec, setHoveredSpec] = useState(null);

  return (
    <section className="py-20 bg-white dark:bg-brand-dark">
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
            Every CBK wear plate is a product of precision engineering. We offer
            a wide range of customizable specifications to ensure a perfect fit
            and optimal performance for your industrial applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: SVG Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-96 p-8 bg-brand-light dark:bg-brand-dark-light rounded-2xl shadow-lg"
          >
            <svg
              viewBox="0 0 120 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Labels */}
              <text
                x="5"
                y="15"
                className="text-[6px] font-semibold fill-gray-500"
              >
                Weld Deposit
              </text>
              <text
                x="5"
                y="55"
                className="text-[6px] font-semibold fill-gray-500"
              >
                Base Plate
              </text>

              {/* Weld Deposit Layer */}
              <rect
                y="20"
                width="100"
                height="20"
                className={`fill-brand-orange/30 transition-all duration-300 ${
                  hoveredSpec === "deposit" ? "opacity-100" : "opacity-50"
                }`}
              />
              <path
                d="M0 20 H100"
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
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
                {hoveredSpec === "deposit" ? "3mm - 8mm" : ""}
              </text>

              {/* Base Plate Layer */}
              <rect
                y="40"
                width="100"
                height="20"
                className={`fill-gray-300 dark:fill-gray-600 transition-all duration-300 ${
                  hoveredSpec === "base" ? "opacity-100" : "opacity-50"
                }`}
              />
              <path
                d="M102 40 L115 40 L115 60 L102 60"
                stroke="gray"
                strokeWidth="1"
              />
              <text
                x="117"
                y="52"
                className="text-[6px] font-bold fill-gray-500"
              >
                {hoveredSpec === "base" ? "5mm - 12mm" : ""}
              </text>
            </svg>
          </motion.div>

          {/* Right Column: Features */}
          <div className="space-y-4">
            {specFeatures.map((spec, index) => (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredSpec(spec.id)}
                onMouseLeave={() => setHoveredSpec(null)}
                className="group p-6 rounded-lg hover:bg-brand-light dark:hover:bg-brand-dark-light transition-colors duration-300 cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-brand-orange/10 dark:bg-brand-orange/20 p-3 rounded-full">
                    <spec.icon className="text-2xl text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {spec.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {spec.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecifications;
