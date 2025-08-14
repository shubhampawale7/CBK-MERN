// client/src/components/FixingMethods.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Expanded data with unique IDs and more detailed descriptions.
const methods = [
  {
    id: "weld-base",
    name: "Welding to Base Metal",
    description:
      "The most direct and permanent attachment method. The wear plate is welded directly onto the surface of the base equipment, ensuring maximum structural integrity and strength for the most demanding applications.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-gray-700 dark:stroke-gray-300"
          strokeWidth="2"
        />
        <rect y="50" width="100" height="20" className="fill-brand-orange/30" />
        <path d="M40 30L50 20L60 30H40Z" className="fill-brand-orange" />
      </svg>
    ),
  },
  {
    id: "csk-holes",
    name: "CSK Holes",
    description:
      "Countersunk (CSK) holes are precisely created using spark erosion or plasma cutting. This allows for bolting the plate flush with the surface, ideal for applications where a smooth material flow is critical.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 30H30L40 50H60L70 30H100"
          className="stroke-gray-700 dark:stroke-gray-300"
          strokeWidth="2"
        />
        <rect y="50" width="100" height="20" className="fill-brand-orange/30" />
        <path d="M45 40L50 30L55 40L45 40Z" className="fill-brand-orange" />
      </svg>
    ),
  },
  {
    id: "csk-ring",
    name: "Welding of CSK Hole Ring",
    description:
      "For added durability in high-stress areas, a reinforcing ring is welded into the countersunk hole. This method provides the benefits of bolting with the strength of a welded connection point.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-gray-700 dark:stroke-gray-300"
          strokeWidth="2"
        />
        <rect
          x="35"
          y="30"
          width="10"
          height="20"
          className="fill-brand-orange"
        />
        <rect
          x="55"
          y="30"
          width="10"
          height="20"
          className="fill-brand-orange"
        />
        <rect y="50" width="100" height="20" className="fill-brand-orange/30" />
        <path d="M45 40L50 30L55 40L45 40Z" className="fill-brand-orange" />
      </svg>
    ),
  },
  {
    id: "welded-studs",
    name: "Welded Studs",
    description:
      "High-strength studs are welded directly onto the back of the wear plate. This allows for a fast, simple, and secure bolt-on installation from the exterior without compromising the wear surface.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-gray-700 dark:stroke-gray-300"
          strokeWidth="2"
        />
        <rect y="50" width="100" height="20" className="fill-brand-orange/30" />
        <rect
          x="42"
          y="10"
          width="16"
          height="20"
          className="fill-brand-orange"
        />
        <rect x="46" y="5" width="8" height="5" className="fill-brand-orange" />
      </svg>
    ),
  },
  {
    id: "threaded-nuts",
    name: "Welded Threaded Nuts",
    description:
      "A nut with an internal thread is expertly welded into the base material of the plate. This creates a strong, integrated fastening point for applications requiring repeated assembly and disassembly.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-gray-700 dark:stroke-gray-300"
          strokeWidth="2"
        />
        <rect y="50" width="100" height="20" className="fill-brand-orange/30" />
        <rect
          x="42"
          y="30"
          width="16"
          height="10"
          className="fill-brand-orange"
        />
      </svg>
    ),
  },
  {
    id: "through-holes",
    name: "Welding Through Holes",
    description:
      "A straightforward and effective method where welding is performed directly through pre-cut holes in the wear plate, creating strong plug welds that secure the plate to the base equipment.",
    svg: (props) => (
      <svg
        {...props}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="30"
          width="100"
          height="20"
          className="stroke-gray-700 dark:stroke-gray-300"
          strokeWidth="2"
        />
        <rect y="50" width="100" height="20" className="fill-brand-orange/30" />
        <circle cx="50" cy="40" r="10" className="fill-brand-orange" />
      </svg>
    ),
  },
];

const FixingMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);

  return (
    <section className="py-20 bg-brand-light dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
            Versatile Fixing Methods
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our wear plates are designed for flexible integration. We offer a
            comprehensive range of fixing methods to suit your specific
            equipment and on-site requirements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Interactive List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-2"
          >
            {methods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method)}
                className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedMethod.id === method.id
                    ? "bg-white dark:bg-brand-dark-light shadow-lg"
                    : "hover:bg-gray-200/50 dark:hover:bg-brand-dark-light/50"
                }`}
              >
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                  {method.name}
                </h3>
                {selectedMethod.id === method.id && (
                  <motion.div
                    layoutId="selected-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-orange"
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Right Column: Details Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white dark:bg-brand-dark-light rounded-2xl shadow-xl p-8 min-h-[300px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMethod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-48 h-48 flex-shrink-0">
                  <selectedMethod.svg className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-orange dark:text-brand-orange-light mb-3">
                    {selectedMethod.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedMethod.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FixingMethods;
