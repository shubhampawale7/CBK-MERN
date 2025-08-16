// client/src/components/FixingMethods.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

// --- Data with SVGs (Unchanged) ---
const methods = [
  {
    id: "weld-base",
    name: "Welding to Base",
    description:
      "The most direct and permanent attachment method, ensuring maximum structural integrity for the most demanding applications.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-current"
          strokeWidth="2"
        />{" "}
        <rect
          y="50"
          width="100"
          height="20"
          className="fill-current opacity-30"
        />{" "}
        <path d="M40 30L50 20L60 30H40Z" className="fill-current" />{" "}
      </svg>
    ),
  },
  {
    id: "csk-holes",
    name: "CSK Holes",
    description:
      "Countersunk holes allow for bolting the plate flush with the surface, ideal for applications where a smooth material flow is critical.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M0 30H30L40 50H60L70 30H100"
          className="stroke-current"
          strokeWidth="2"
        />{" "}
        <rect
          y="50"
          width="100"
          height="20"
          className="fill-current opacity-30"
        />{" "}
        <path d="M45 40L50 30L55 40L45 40Z" className="fill-current" />{" "}
      </svg>
    ),
  },
  {
    id: "csk-ring",
    name: "CSK Hole Ring",
    description:
      "A reinforcing ring is welded into the countersunk hole, providing the benefits of bolting with the strength of a welded connection.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-current"
          strokeWidth="2"
        />{" "}
        <rect x="35" y="30" width="10" height="20" className="fill-current" />{" "}
        <rect x="55" y="30" width="10" height="20" className="fill-current" />{" "}
        <rect
          y="50"
          width="100"
          height="20"
          className="fill-current opacity-30"
        />{" "}
        <path d="M45 40L50 30L55 40L45 40Z" className="fill-current" />{" "}
      </svg>
    ),
  },
  {
    id: "welded-studs",
    name: "Welded Studs",
    description:
      "High-strength studs are welded to the back of the plate, allowing for a fast, simple, and secure bolt-on installation from the exterior.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-current"
          strokeWidth="2"
        />{" "}
        <rect
          y="50"
          width="100"
          height="20"
          className="fill-current opacity-30"
        />{" "}
        <rect x="42" y="10" width="16" height="20" className="fill-current" />{" "}
        <rect x="46" y="5" width="8" height="5" className="fill-current" />{" "}
      </svg>
    ),
  },
  {
    id: "threaded-nuts",
    name: "Welded Nuts",
    description:
      "A nut with an internal thread is welded into the base material, creating a strong fastening point for repeated assembly.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-current"
          strokeWidth="2"
        />{" "}
        <rect
          y="50"
          width="100"
          height="20"
          className="fill-current opacity-30"
        />{" "}
        <rect x="42" y="30" width="16" height="10" className="fill-current" />{" "}
      </svg>
    ),
  },
  {
    id: "through-holes",
    name: "Through Holes",
    description:
      "Welding is performed directly through pre-cut holes in the wear plate, creating strong plug welds that secure it to the base.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-current"
          strokeWidth="2"
        />{" "}
        <rect
          y="50"
          width="100"
          height="20"
          className="fill-current opacity-30"
        />{" "}
        <circle cx="50" cy="40" r="10" className="fill-current" />{" "}
      </svg>
    ),
  },
];

const FixingMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);
  const SvgComponent = selectedMethod.svg;

  return (
    <section className="py-24 font-serif bg-brand-light dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
            Versatile Fixing Methods
          </h2>
          <p className="mt-4 font-serif text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our wear plates are designed for flexible integration. Select a
            method below to see how we can meet your specific on-site
            requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Tab-style selectors */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            {methods.map((method) => (
              <Tab
                key={method.id}
                method={method}
                isSelected={selectedMethod.id === method.id}
                onClick={() => setSelectedMethod(method)}
              />
            ))}
          </div>

          {/* Right Column: Details Display */}
          <div className="lg:col-span-2 bg-white dark:bg-brand-dark-light  rounded-2xl shadow-xl p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMethod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col  md:flex-row items-center gap-8 text-center md:text-left"
              >
                <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 text-gray-700 dark:text-gray-300">
                  <SvgComponent className="w-full h-full text-brand-orange  dark:text-brand-orange-light transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    {selectedMethod.name}
                  </h3>
                  <p className="text-gray-600 font-serif dark:text-gray-300 text-lg">
                    {selectedMethod.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Tab = ({ method, isSelected, onClick }) => {
  const SvgIcon = method.svg;
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full p-4 rounded-lg transition-colors duration-300 flex items-center gap-4 text-left"
      whileHover={{ scale: 1.03 }}
      style={{
        backgroundColor: isSelected
          ? "var(--tab-bg-selected)"
          : "var(--tab-bg)",
      }}
    >
      {/* Custom properties for theme-aware background colors */}
      <style>{`:root { --tab-bg: #F7F7F7; --tab-bg-selected: #FFFFFF; } .dark { --tab-bg: #3A3A3A; --tab-bg-selected: #2D2D2D; }`}</style>

      <div
        className={`flex-shrink-0 w-12 h-12 p-2 rounded-md transition-colors duration-300 ${
          isSelected ? "bg-brand-orange" : "bg-gray-200 dark:bg-brand-dark"
        }`}
      >
        <SvgIcon
          className={`w-full h-full ${
            isSelected ? "text-white" : "text-brand-orange"
          }`}
        />
      </div>
      <div>
        <h4
          className={`font-bold text-lg transition-colors duration-300 ${
            isSelected
              ? "text-gray-800 dark:text-white"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {method.name}
        </h4>
      </div>
      {isSelected && (
        <motion.div
          layoutId="active-tab-indicator"
          className="absolute inset-0 bg-brand-orange/10 dark:bg-brand-orange/20 rounded-lg border-2 border-brand-orange"
          style={{ borderRadius: 8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </motion.button>
  );
};

export default FixingMethods;
