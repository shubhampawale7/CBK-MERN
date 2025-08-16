// client/src/pages/ProductDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaCheckCircle,
  FaSpinner,
  FaCubes, // Changed for a more "material" feel
  FaVial, // More specific than microscope
  FaIndustry,
  FaRulerCombined, // For specs
  FaThermometerHalf, // For specs
  FaPercentage, // For specs
} from "react-icons/fa";
import PlaceholderImage from "../components/PlaceholderImage";
import api from "../api";

// Import local microstructure images
import cbkEcoImage from "../assets/micro-cbk-eco.png";
import cbkStdImage from "../assets/micro-cbk-std.png";
import cbk1Image from "../assets/micro-cbk-1.png";
import cbk1PlusImage from "../assets/micro-cbk-1-plus.png";

const imageMap = {
  "CBK ECO": cbkEcoImage,
  "CBK STD": cbkStdImage,
  "CBK 1": cbk1Image,
  "CBK 1 Plus": cbk1PlusImage,
};

// Helper to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

// Animation Variants for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const endpoint = isValidObjectId(id)
          ? `/api/products/${id}`
          : `/api/products/slug/${id}`;
        const { data } = await api.get(endpoint);
        setProduct(data);
        // Default to microstructure image if available, else application image
        setMainImage(imageMap[data.name] || data.applicationImage || null);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-dark">
        <FaSpinner className="animate-spin text-5xl text-brand-orange" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center text-center py-20 bg-brand-dark min-h-screen">
        <h2 className="text-4xl font-bold text-white">Product Not Found</h2>
        <p className="text-gray-400 mt-2">
          The product you're looking for doesn't exist.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center text-brand-orange hover:text-brand-orange-light transition-colors duration-300"
        >
          <FaChevronLeft className="mr-2" />
          Back to Products
        </Link>
      </div>
    );
  }

  const microstructureImage = imageMap[product.name];
  const applicationImage = product.applicationImage;
  const tabs = ["features", "technical", "applications"];

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Grade Details - CBK Engineers`}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-serif text-gray-800 dark:text-gray-300">
        {/* SECTION 1: HERO */}
        <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-light to-brand-dark opacity-80"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center text-sm text-gray-400 hover:text-brand-orange-light transition-colors duration-300 mb-4 group"
              >
                <FaChevronLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to All Grades
              </Link>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl font-extrabold tracking-tighter"
            >
              <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                {product.name}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-xl max-w-3xl mx-auto text-gray-300"
            >
              {product.description}
            </motion.p>
          </div>
        </section>

        {/* SECTION 2: MAIN CONTENT */}
        <div className="py-20 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* LEFT - IMAGE GALLERY */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:col-span-2 lg:sticky top-28 h-fit"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainImage || "placeholder"}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-brand-dark-light rounded-xl overflow-hidden shadow-2xl shadow-brand-dark/50 aspect-square"
                >
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt="Main product view"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PlaceholderImage />
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="flex space-x-4 mt-4">
                {microstructureImage && (
                  <Thumbnail
                    image={microstructureImage}
                    label="Microstructure"
                    isActive={mainImage === microstructureImage}
                    onClick={() => setMainImage(microstructureImage)}
                  />
                )}
                {applicationImage && (
                  <Thumbnail
                    image={applicationImage}
                    label="Application"
                    isActive={mainImage === applicationImage}
                    onClick={() => setMainImage(applicationImage)}
                  />
                )}
              </div>
            </motion.div>

            {/* RIGHT - TABS & CONTENT */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8" aria-label="Tabs">
                  <TabButton
                    name="Key Features"
                    tabKey="features"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <TabButton
                    name="Technical Data"
                    tabKey="technical"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  <TabButton
                    name="Applications"
                    tabKey="applications"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "features" &&
                      product.features &&
                      product.features.length > 0 && (
                        <motion.ul
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="space-y-4"
                        >
                          {product.features.map((feature, i) => (
                            <FeatureItem key={i} text={feature} />
                          ))}
                        </motion.ul>
                      )}

                    {activeTab === "technical" && (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 gap-4"
                      >
                        <StatCard
                          icon={<FaRulerCombined />}
                          label="Hardness"
                          value={product.hardness}
                        />
                        <StatCard
                          icon={<FaThermometerHalf />}
                          label="Max Temperature"
                          value={product.temp}
                        />
                        {product.microstructure && (
                          <>
                            <StatCard
                              icon={<FaVial />}
                              label="Etchant"
                              value={product.microstructure.etchant}
                            />
                            <StatCard
                              icon={<FaPercentage />}
                              label="Primary Carbide %"
                              value={product.microstructure.primaryCarbide}
                            />
                            <StatCard
                              icon={<FaPercentage />}
                              label="Secondary Carbide %"
                              value={product.microstructure.secondaryCarbide}
                            />
                          </>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "applications" &&
                      product.applications &&
                      product.applications.length > 0 && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid sm:grid-cols-2 gap-4"
                        >
                          {product.applications.map((app, i) => (
                            <ApplicationCard key={i} text={app} />
                          ))}
                        </motion.div>
                      )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

// Sub-components for a cleaner structure

const Thumbnail = ({ image, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative w-28 h-28 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300
    ${
      isActive
        ? "border-brand-orange shadow-lg"
        : "border-gray-700/50 hover:border-brand-orange/70"
    }`}
  >
    <img
      src={image}
      alt={`${label} thumbnail`}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <p className="text-white text-xs font-bold">{label}</p>
    </div>
  </button>
);

const TabButton = ({ name, tabKey, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(tabKey)}
    className={`${
      activeTab === tabKey
        ? "text-brand-orange"
        : "text-gray-400 hover:text-gray-200"
    } relative py-4 px-1 text-lg font-medium transition-colors duration-300`}
  >
    {name}
    {activeTab === tabKey && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
        layoutId="underline"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </button>
);

const FeatureItem = ({ text }) => (
  <motion.li variants={itemVariants} className="flex items-start space-x-4">
    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
    <span className="text-gray-300">{text}</span>
  </motion.li>
);

const StatCard = ({ icon, label, value }) => (
  <motion.div
    variants={itemVariants}
    className="bg-brand-dark-light p-5 rounded-lg border border-gray-700/50"
  >
    <div className="flex items-center text-gray-400 space-x-3">
      {icon}
      <dt className="text-sm font-medium">{label}</dt>
    </div>
    <dd className="mt-1 text-2xl text-white font-semibold">{value || "N/A"}</dd>
  </motion.div>
);

const ApplicationCard = ({ text }) => (
  <motion.div
    variants={itemVariants}
    className="bg-brand-dark-light p-4 rounded-lg flex items-center space-x-4 border border-transparent hover:border-brand-orange/50 hover:shadow-lg hover:shadow-brand-orange/10 transition-all duration-300 transform hover:-translate-y-1"
  >
    <FaIndustry className="text-brand-orange text-xl" />
    <span className="text-gray-200 font-medium">{text}</span>
  </motion.div>
);

export default ProductDetails;
