// client/src/pages/Products.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FaSearch, FaSpinner, FaTimes } from "react-icons/fa";
import api from "../api";
import ProductCard from "../components/ProductCard"; // Using your theme-aware card

const categories = ["All Grades", "Standard", "Premium", "Specialized"];

// Animation variants (no changes needed here)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } },
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Grades");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sortedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      if (activeCategory === "All Grades") return true;
      if (activeCategory === "Standard")
        return ["CBK ECO", "CBK STD"].includes(product.name);
      if (activeCategory === "Premium")
        return ["CBK 1", "CBK 1 Plus"].includes(product.name);
      if (activeCategory === "Specialized")
        return !["CBK ECO", "CBK STD", "CBK 1", "CBK 1 Plus"].includes(
          product.name
        );
      return false;
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <>
      <Helmet>
        <title>Our Wear Plate Grades - CBK Engineers</title>
        <meta
          name="description"
          content="Explore our complete range of specialized wear plate grades, engineered for extreme abrasion, impact, and high-temperature applications."
        />
      </Helmet>
      {/* Main page container now respects themes */}
      <div className=" bg-white font-serif dark:bg-brand-dark">
        {/* Hero remains dark for cinematic effect */}
        <section className="relative flex items-center min-h-[60vh] pt-32 pb-20 overflow-hidden bg-brand-dark">
          <div className="absolute  inset-0 bg-gradient-to-br from-brand-dark via-brand-dark-light to-brand-dark opacity-80 z-10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            src="/videos/welding-overlay.mp4"
          />
          <div className="relative max-w-7xl mx-auto px-4 text-left z-20 grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl font-serif md:text-7xl font-extrabold tracking-tighter text-white">
                <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                  Engineered
                </span>
                <br />
                For Endurance.
              </h1>
              <p className="mt-6 text-xl font-mono max-w-xl text-gray-300">
                Explore our complete line of chromium carbide wear plates. Each
                grade is meticulously crafted to deliver unparalleled
                performance against abrasion, impact, and extreme temperatures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main content area is now fully theme-aware */}
        <main className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="sticky top-20 z-30 p-4 rounded-xl mb-12 backdrop-blur-lg
                       bg-white/80 dark:bg-brand-dark/80
                       border border-gray-200 dark:border-gray-700/50"
          >
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((category) => (
                  <CategoryButton
                    key={category}
                    name={category}
                    isActive={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  />
                ))}
              </div>
              <SearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-5xl text-brand-orange" />
            </div>
          ) : (
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      variants={itemVariants}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <NoResultsFound searchQuery={searchQuery} />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
};

// Sub-components for the main page, now with theme-aware styles
const CategoryButton = ({ name, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border-2
    ${
      isActive
        ? "bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/20"
        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-brand-orange hover:text-brand-orange dark:hover:text-white"
    }`}
  >
    {name}
  </button>
);

const SearchInput = ({ searchQuery, setSearchQuery }) => (
  <div className="relative w-full md:w-64">
    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
    <input
      type="text"
      placeholder="Search grades..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-11 pr-10 py-2.5 rounded-full transition-all duration-300
                 border-2 border-gray-300 dark:border-gray-700
                 bg-white dark:bg-brand-dark-light
                 text-brand-dark dark:text-white
                 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
    />
    {searchQuery && (
      <button
        onClick={() => setSearchQuery("")}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-dark dark:hover:text-white"
      >
        <FaTimes />
      </button>
    )}
  </div>
);

const NoResultsFound = ({ searchQuery }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="col-span-full text-center py-24 flex flex-col items-center"
  >
    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
      No Grades Found
    </h3>
    <p className="mt-2 text-gray-500 max-w-md">
      Your search for "{searchQuery}" did not match any products. Try another
      search or category.
    </p>
  </motion.div>
);

export default Products;
