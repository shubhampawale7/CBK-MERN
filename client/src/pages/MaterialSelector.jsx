// client/src/pages/MaterialSelector.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaTools,
  FaShieldAlt,
  FaFire,
  FaSyncAlt,
  FaIndustry,
  FaBuilding,
  FaHardHat,
  FaBolt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

// --- Data (Unchanged) ---
const allProducts = [
  {
    name: "CBK ECO",
    id: "cbk-eco",
    category: ["abrasion"],
    industries: ["cement", "ore", "steel", "coal", "power"],
    hardness: "55-58 Rc",
  },
  {
    name: "CBK STD",
    id: "cbk-std",
    category: ["abrasion"],
    industries: ["cement", "ore", "steel", "coal", "power"],
    hardness: "58-60 Rc",
  },
  {
    name: "CBK 1",
    id: "cbk-1",
    category: ["abrasion", "impact"],
    industries: ["cement", "ore", "steel", "coal", "power"],
    hardness: "58-62 Rc",
  },
  {
    name: "CBK 1 Plus",
    id: "cbk-1-plus",
    category: ["abrasion"],
    industries: ["cement", "ore", "steel", "coal", "power"],
    hardness: "58-62 Rc",
  },
  {
    name: "CBK 5",
    id: "cbk-5",
    category: ["abrasion", "temperature"],
    industries: ["cement", "steel"],
    hardness: "58-62 Rc",
  },
  {
    name: "CBK 5S",
    id: "cbk-5s",
    category: ["abrasion", "temperature"],
    industries: ["cement", "power"],
    hardness: "58-62 Rc",
  },
  {
    name: "CBK Ni",
    id: "cbk-ni",
    category: ["abrasion", "temperature", "impact"],
    industries: ["cement", "steel"],
    hardness: "55 Rc",
  },
  {
    name: "CBK 14",
    id: "cbk-14",
    category: ["abrasion", "impact", "temperature"],
    industries: ["cement", "steel"],
    hardness: "60-64 Rc",
  },
  {
    name: "CBK 23",
    id: "cbk-23",
    category: ["abrasion", "impact", "temperature"],
    industries: ["cement", "steel"],
    hardness: "60-65 Rc",
  },
  {
    name: "CBK B CARB",
    id: "cbk-b-carb",
    category: ["abrasion"],
    industries: ["cement", "ore", "coal"],
    hardness: "61-64 Rc",
  },
  {
    name: "CBK Ti",
    id: "cbk-ti",
    category: ["impact"],
    industries: ["ore", "steel"],
    hardness: "56-58 Rc",
  },
  {
    name: "CBK V CARB",
    id: "cbk-v-carb",
    category: ["abrasion"],
    industries: ["ore", "coal"],
    hardness: "62-64 Rc",
  },
  {
    name: "CBK W CARB",
    id: "cbk-w-carb",
    category: ["abrasion", "impact"],
    industries: ["ore", "steel"],
    hardness: "60-65 Rc",
  },
];

const filterOptions = {
  industries: [
    {
      id: "cement",
      name: "Cement Plant",
      icon: FaBuilding,
      description: "High abrasion and temperature challenges.",
    },
    {
      id: "ore",
      name: "Ore Processing",
      icon: FaHardHat,
      description: "Severe impact and high-wear conditions.",
    },
    {
      id: "steel",
      name: "Steel",
      icon: FaTools,
      description: "Extreme heat and abrasive material handling.",
    },
    {
      id: "coal",
      name: "Coal Preparation",
      icon: FaIndustry,
      description: "High-volume sliding abrasion.",
    },
    {
      id: "power",
      name: "Power Plant",
      icon: FaBolt,
      description: "Critical component reliability and longevity.",
    },
  ],
  wearTypes: [
    {
      id: "abrasion",
      name: "High Abrasion",
      icon: FaShieldAlt,
      description: "For surfaces facing constant scraping and grinding.",
    },
    {
      id: "impact",
      name: "High Impact",
      icon: FaTools,
      description: "For components that withstand direct material impact.",
    },
    {
      id: "temperature",
      name: "High Temperature",
      icon: FaFire,
      description: "For applications operating in extreme heat.",
    },
  ],
};

const MaterialSelector = () => {
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedWear, setSelectedWear] = useState(null);

  const filteredProducts = allProducts.filter((p) => {
    const industryMatch = selectedIndustry
      ? p.industries?.includes(selectedIndustry.id)
      : true;
    const wearMatch = selectedWear
      ? p.category?.includes(selectedWear.id)
      : true;
    return industryMatch && wearMatch;
  });

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setStep(2);
  };

  const handleWearSelect = (wear) => {
    setSelectedWear(wear);
    setStep(3);
  };

  const resetFilters = () => {
    setSelectedIndustry(null);
    setSelectedWear(null);
    setStep(1);
  };

  const goToStep = (targetStep) => {
    if (targetStep < step) {
      if (targetStep === 1) {
        setSelectedIndustry(null);
        setSelectedWear(null);
      }
      if (targetStep === 2) {
        setSelectedWear(null);
      }
      setStep(targetStep);
    }
  };

  const steps = [
    { number: 1, title: "Select Industry", isCompleted: !!selectedIndustry },
    { number: 2, title: "Define Challenge", isCompleted: !!selectedWear },
    { number: 3, title: "View Recommendations", isCompleted: false },
  ];

  return (
    <>
      <Helmet>
        <title>Solution Finder - CBK Engineers</title>
        <meta
          name="description"
          content="Use our interactive Solution Finder to get an expert recommendation for the best wear plate for your needs."
        />
      </Helmet>
      <div className="bg-white font-serif dark:bg-brand-dark  min-h-screen">
        {/* SECTION 1: HERO */}
        <section className="bg-brand-light dark:bg-brand-dark-light pt-32 pb-16 font-serif text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-brand-orange dark:text-brand-orange-light">
              Solution Finder
            </h1>
            <p className="mt-4 font-mono text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Follow the steps below to get an instant recommendation for the
              optimal wear plate grade for your exact needs.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: THE WIZARD */}
        <main className="max-w-7xl mx-auto px-4 py-16">
          <ProgressTracker
            steps={steps}
            currentStep={step}
            goToStep={goToStep}
            resetFilters={resetFilters}
          />

          <div className="mt-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <WizardStep key="step1" title="Step 1: What is your Industry?">
                  <div className="grid font-serif grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterOptions.industries.map((opt) => (
                      <SelectionCard
                        key={opt.id}
                        option={opt}
                        onSelect={() => handleIndustrySelect(opt)}
                      />
                    ))}
                  </div>
                </WizardStep>
              )}

              {step === 2 && (
                <WizardStep
                  key="step2"
                  title="Step 2: What is your primary wear challenge?"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterOptions.wearTypes.map((opt) => (
                      <SelectionCard
                        key={opt.id}
                        option={opt}
                        onSelect={() => handleWearSelect(opt)}
                      />
                    ))}
                  </div>
                </WizardStep>
              )}

              {step === 3 && (
                <WizardStep
                  key="step3"
                  title="Step 3: Here are your recommended products"
                >
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    <AnimatePresence>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((p) => (
                          <ResultCard key={p.id} product={p} />
                        ))
                      ) : (
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="col-span-full text-center p-8 bg-brand-light dark:bg-brand-dark-light rounded-lg"
                        >
                          <p className="font-semibold text-gray-700 dark:text-gray-200">
                            No products match your criteria.
                          </p>
                          <p className="text-sm text-gray-500">
                            Try a different combination or reset the filters.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </WizardStep>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
};

// --- Wizard Sub-components ---

const ProgressTracker = ({ steps, currentStep, goToStep, resetFilters }) => (
  <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-brand-light dark:bg-brand-dark-light rounded-xl border border-gray-200 dark:border-gray-700">
    <div className="flex items-center space-x-2 md:space-x-4">
      {steps.map((s, index) => (
        <div
          key={s.number}
          className="flex items-center space-x-2 md:space-x-4"
        >
          <button
            onClick={() => goToStep(s.number)}
            disabled={s.number >= currentStep && !s.isCompleted}
            className="flex items-center space-x-3 group disabled:cursor-not-allowed"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300
              ${
                currentStep === s.number
                  ? "bg-brand-orange border-brand-orange text-white"
                  : ""
              }
              ${s.isCompleted ? "bg-green-500 border-green-500 text-white" : ""}
              ${
                currentStep < s.number
                  ? "bg-white dark:bg-brand-dark border-gray-300 dark:border-gray-600 text-gray-400"
                  : ""
              }
            `}
            >
              {s.isCompleted ? <FaCheckCircle /> : s.number}
            </div>
            <span
              className={`font-semibold hidden md:block transition-colors duration-300
              ${
                currentStep === s.number
                  ? "text-gray-800 dark:text-white"
                  : "text-gray-500"
              }
              ${
                s.isCompleted
                  ? "text-gray-800 dark:text-white group-hover:text-brand-orange"
                  : ""
              }
            `}
            >
              {s.title}
            </span>
          </button>
          {index < steps.length - 1 && (
            <div className="w-8 md:w-16 h-0.5 bg-gray-200 dark:bg-gray-700" />
          )}
        </div>
      ))}
    </div>
    <button
      onClick={resetFilters}
      className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-500 hover:text-brand-orange transition-colors"
    >
      <FaSyncAlt />
      <span>Start Over</span>
    </button>
  </div>
);

const WizardStep = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
      {title}
    </h2>
    {children}
  </motion.div>
);

const SelectionCard = ({ option, onSelect }) => (
  <motion.button
    onClick={onSelect}
    className="group relative text-left w-full p-6 bg-brand-light dark:bg-brand-dark-light rounded-xl border-2 border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-brand-orange hover:shadow-xl"
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-start justify-between">
      <div
        className={`p-3 bg-white dark:bg-brand-dark rounded-lg text-brand-orange text-3xl transition-colors duration-300 group-hover:text-white group-hover:bg-brand-orange`}
      >
        <option.icon />
      </div>
      <FaArrowRight className="text-gray-300 dark:text-gray-600 text-2xl transform transition-transform duration-300 group-hover:text-brand-orange group-hover:translate-x-1" />
    </div>
    <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
      {option.name}
    </h3>
    <p className="mt-1 text-gray-500 dark:text-gray-400">
      {option.description}
    </p>
  </motion.button>
);

const ResultCard = ({ product }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="bg-brand-light dark:bg-brand-dark-light p-6 rounded-lg border border-gray-200 dark:border-gray-700"
  >
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white">
          {product.name}
        </h4>
        <p className="text-sm text-brand-orange font-semibold">
          {product.hardness}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {product.category.map((cat) => (
            <span
              key={cat}
              className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <Link
          to={`/products/${product.id}`}
          className="block w-full text-center px-4 py-2 bg-brand-orange text-white font-semibold rounded-md hover:bg-brand-orange-dark transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  </motion.div>
);

export default MaterialSelector;
