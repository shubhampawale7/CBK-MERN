// client/src/pages/ProductComparison.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaTimes,
  FaPlus,
  FaCheck,
  FaStar,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";
import api from "../api";

const MAX_HARDNESS = 70;
const MAX_TEMP = 800;

const ProductComparison = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setAllProducts(data);
        if (data.length >= 3) {
          setSelectedProducts([data[0], data[1], data[2]]);
        } else {
          setSelectedProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products for comparison:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = (product) => {
    if (
      selectedProducts.length < 4 &&
      !selectedProducts.find((p) => p._id === product._id)
    ) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p._id !== productId));
  };

  return (
    <>
      <Helmet>
        <title>Compare Products - CBK Engineers</title>
        <meta
          name="description"
          content="Use our advanced tool to compare CBK Engineers' wear plates side-by-side and find the perfect solution for your application."
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
              Product Comparison Tool
            </h1>
            <p className="mt-4 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Analyze our wear plate grades with detailed specifications. Add or
              remove products to build your own comparison dashboard.
            </p>
          </motion.div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 py-16">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <FaSpinner className="animate-spin text-4xl text-brand-orange" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <AnimatePresence>
                {selectedProducts.map((product) => (
                  <ComparisonCard
                    key={product._id}
                    product={product}
                    onRemove={removeProduct}
                  />
                ))}
              </AnimatePresence>

              {selectedProducts.length < 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <button
                    onClick={() => setIsSelectorOpen(true)}
                    className="w-full h-full min-h-[400px] bg-gray-100 dark:bg-brand-dark-light border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-white hover:border-brand-orange hover:text-brand-orange transition-all"
                  >
                    <FaPlus size={40} />
                    <span className="mt-4 font-semibold">
                      Add Product to Compare
                    </span>
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
      <ProductSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onAdd={addProduct}
        allProducts={allProducts}
        selectedIds={selectedProducts.map((p) => p._id)}
      />
    </>
  );
};

// --- Helper Components ---

const ComparisonCard = ({ product, onRemove }) => {
  // CORRECTED: Create the URL slug from the product name here.
  const urlSlug = product.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative bg-white dark:bg-brand-dark-light rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col"
    >
      <button
        onClick={() => onRemove(product._id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-10"
      >
        <FaTimes />
      </button>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-brand-orange dark:text-brand-orange-light">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
      </div>
      <div className="p-6 space-y-4 flex-grow">
        <SpecMeter
          label="Hardness"
          value={parseInt(product.hardness)}
          maxValue={MAX_HARDNESS}
          unit="Rc"
        />
        <SpecMeter
          label="Max Temperature"
          value={parseInt(product.temp)}
          maxValue={MAX_TEMP}
          unit="°C"
        />
        <div className="pt-4">
          <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2 flex items-center">
            <FaStar className="text-yellow-500 mr-2" />
            Best For
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {product.bestFor}
          </p>
        </div>
      </div>
      <div className="p-6 mt-auto bg-brand-light dark:bg-brand-dark rounded-b-xl">
        {/* CORRECTED: The link now uses the correctly generated urlSlug */}
        <Link
          to={`/products/${urlSlug}`}
          className="group inline-flex items-center space-x-2 text-brand-orange font-semibold"
        >
          <span>View Full Details</span>
          <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const SpecMeter = ({ label, value, maxValue, unit }) => {
  const percentage = value ? (value / maxValue) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <h4 className="text-sm font-bold text-gray-800 dark:text-white">
          {label}
        </h4>
        <span className="text-lg font-semibold text-brand-orange">
          {value ? `${value} ${unit}` : "N/A"}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-brand-dark rounded-full h-2.5">
        <motion.div
          className="bg-brand-orange h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const ProductSelectorModal = ({
  isOpen,
  onClose,
  onAdd,
  allProducts,
  selectedIds,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white dark:bg-brand-dark-light rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold">Add a Product to Compare</h2>
          </div>
          <div className="p-6 overflow-y-auto space-y-2">
            {allProducts.map((p) => {
              const isSelected = selectedIds.includes(p._id);
              return (
                <button
                  key={p._id}
                  onClick={() => {
                    if (!isSelected) onAdd(p);
                    onClose();
                  }}
                  disabled={isSelected}
                  className="w-full flex justify-between items-center p-4 rounded-lg text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-light dark:hover:bg-brand-dark"
                >
                  <span className="font-semibold">{p.name}</span>
                  {isSelected && <FaCheck className="text-green-500" />}
                </button>
              );
            })}
          </div>
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 font-semibold rounded-md"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ProductComparison;
