// client/src/pages/ProductComparison.jsx
import { useState, useEffect, useRef } from "react";
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
  FaHandPointer,
} from "react-icons/fa";
import api from "../api";

const MAX_HARDNESS = 70;
const MAX_TEMP = 800;

const ProductComparison = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const sliderConstraints = useRef(null);

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
          content="Use our interactive slider to compare CBK wear plates and find the perfect solution."
        />
      </Helmet>
      <div className="bg-brand-light dark:bg-brand-dark font-serif overflow-x-hidden">
        {/* SECTION 1: HERO */}
        <section className="bg-white dark:bg-brand-dark-light pt-32 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-brand-orange">
              Drag & Compare
            </h1>
            <p className="mt-4 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              A new way to analyze our grades. Click and drag the slider below
              to explore and compare products.
            </p>
            <div className="mt-6 text-brand-orange animate-pulse">
              <FaHandPointer size={24} className="mx-auto" />
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: INTERACTIVE DRAGGABLE SLIDER */}
        <main className="py-20" ref={sliderConstraints}>
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <FaSpinner className="animate-spin text-4xl text-brand-orange" />
            </div>
          ) : (
            <motion.div
              drag="x"
              dragConstraints={sliderConstraints}
              className="flex cursor-grab active:cursor-grabbing w-max px-8"
            >
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
                <AddProductSlot onClick={() => setIsSelectorOpen(true)} />
              )}
            </motion.div>
          )}
        </main>
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

// --- Sub-components for the new design ---

const ComparisonCard = ({ product, onRemove }) => {
  const urlSlug = product.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative w-[340px] h-[520px] bg-white dark:bg-brand-dark-light rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 flex-shrink-0 mx-4"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="text-3xl font-bold text-brand-orange dark:text-brand-orange-light w-4/5">
            {product.name}
          </h3>
          <button
            onClick={() => onRemove(product._id)}
            className="text-gray-400 hover:text-red-500 transition-colors z-10"
          >
            <FaTimes />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2 h-12">{product.description}</p>

        {/* Specs */}
        <div className="flex-grow my-6 space-y-6">
          <VisualMeter
            label="Hardness"
            value={parseInt(product.hardness)}
            maxValue={MAX_HARDNESS}
            unit="Rc"
          />
          <VisualMeter
            label="Max Temperature"
            value={parseInt(product.temp)}
            maxValue={MAX_TEMP}
            unit="°C"
          />
        </div>

        {/* Footer */}
        <div className="mt-auto text-center">
          <Link
            to={`/products/${urlSlug}`}
            className="group inline-flex items-center space-x-2 text-brand-orange font-semibold"
          >
            <span>View Full Details</span>
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const AddProductSlot = ({ onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.7 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="w-[340px] h-[520px] mx-4 flex-shrink-0"
  >
    <button
      onClick={onClick}
      className="w-full h-full bg-transparent border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-2xl flex flex-col items-center justify-center text-gray-500 dark:text-gray-500 hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
    >
      <FaPlus size={40} />
      <span className="mt-4 font-semibold text-lg">Add Product</span>
    </button>
  </motion.div>
);

const VisualMeter = ({ label, value, maxValue, unit }) => {
  const percentage = value ? (value / maxValue) * 100 : 0;
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">
        {label}
      </h4>
      <div className="relative w-full h-10 bg-gray-200 dark:bg-brand-dark rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-orange-light to-brand-orange rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // A nice easing for meters
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-lg text-white drop-shadow-md mix-blend-difference">
            {value ? `${value} ${unit}` : "N/A"}
          </span>
        </div>
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
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white dark:bg-brand-dark-light rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Add a Product to Compare
            </h2>
          </div>
          <div className="p-4 overflow-y-auto space-y-2">
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
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {p.name}
                  </span>
                  {isSelected && <FaCheck className="text-green-500" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ProductComparison;
