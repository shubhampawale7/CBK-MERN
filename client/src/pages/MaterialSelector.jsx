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
} from "react-icons/fa";

// The complete static product database is now part of the component.
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
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedWear, setSelectedWear] = useState(null);

  // REMOVED: The useEffect and API call are no longer needed.

  const filteredProducts = allProducts.filter((p) => {
    const industryMatch = selectedIndustry
      ? p.industries && p.industries.includes(selectedIndustry.id)
      : true;
    const wearMatch = selectedWear
      ? p.category && p.category.includes(selectedWear.id)
      : true;
    return industryMatch && wearMatch;
  });

  const resetFilters = () => {
    setSelectedIndustry(null);
    setSelectedWear(null);
  };

  return (
    <>
      <Helmet>
        <title>Material Selector - CBK Engineers</title>
        <meta
          name="description"
          content="Use our interactive Solution Finder to get an expert recommendation for the best wear plate for your industry and wear challenge."
        />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-sans">
        <div className="bg-brand-light dark:bg-brand-dark-light pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-4 text-center"
          >
            <h1 className="text-5xl font-bold text-brand-orange dark:text-brand-orange-light">
              Solution Finder
            </h1>
            <p className="mt-4 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Get an instant recommendation for the optimal wear plate grade.
              Define your operating environment below to see the best products
              for the job.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="p-6 bg-brand-light dark:bg-brand-dark-light rounded-xl shadow-lg sticky top-28">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    onClick={resetFilters}
                    className="flex items-center space-x-2 text-xs text-gray-500 hover:text-brand-orange transition-colors"
                  >
                    <FaSyncAlt />
                    <span>Reset All</span>
                  </button>
                </div>
                <div className="space-y-6">
                  <FilterGroup
                    title="Industry"
                    options={filterOptions.industries}
                    selected={selectedIndustry}
                    setSelected={setSelectedIndustry}
                  />
                  <FilterGroup
                    title="Wear Challenge"
                    options={filterOptions.wearTypes}
                    selected={selectedWear}
                    setSelected={setSelectedWear}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-white dark:bg-brand-dark-light p-8 rounded-xl shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIndustry?.id || "all-industries"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {selectedIndustry
                        ? `Solutions for ${selectedIndustry.name}`
                        : "All Solutions"}
                    </h3>
                    <p className="text-gray-500 mt-1">
                      {selectedIndustry?.description ||
                        "Showing all compatible products. Select an industry for a refined list."}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <ResultCard key={product.id} product={product} />
                      ))
                    ) : (
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="col-span-full text-center p-8"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Helper Components ---

const FilterGroup = ({ title, options, selected, setSelected }) => (
  <div>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <motion.button
          key={option.id}
          onClick={() => setSelected(option)}
          className={`w-full flex items-center space-x-3 text-left p-3 rounded-md text-sm font-medium transition-all duration-200 ${
            selected?.id === option.id
              ? "bg-brand-orange text-white shadow"
              : "bg-white dark:bg-brand-dark hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <option.icon
            className={`flex-shrink-0 ${
              selected?.id === option.id ? "text-white" : "text-brand-orange"
            }`}
          />
          <span>{option.name}</span>
        </motion.button>
      ))}
    </div>
  </div>
);

const ResultCard = ({ product }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className="bg-brand-light dark:bg-brand-dark p-4 rounded-lg"
  >
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-bold text-gray-800 dark:text-white">
          {product.name}
        </h4>
        <p className="text-xs text-gray-500">{product.hardness}</p>
      </div>
      <Link
        to={`/products/${product.id}`}
        className="px-3 py-1.5 bg-brand-orange text-white text-xs font-semibold rounded-md hover:bg-brand-orange-dark transition-colors"
      >
        Details
      </Link>
    </div>
  </motion.div>
);

export default MaterialSelector;
