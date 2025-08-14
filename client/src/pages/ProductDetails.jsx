// client/src/pages/ProductDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaCube,
  FaMicroscope,
  FaIndustry,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import PlaceholderImage from "../components/PlaceholderImage";
import api from "../api";

// Import your local microstructure images
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

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/products/${id}`);
        setProduct(data);
        setMainImage(imageMap[data.name] || data.applicationImage || null);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    // CORRECTED: This check prevents the API call from running if the `id` is not yet available.
    // This is the definitive fix for the "undefined" error.
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-brand-dark">
        <FaSpinner className="animate-spin text-4xl text-brand-orange" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 bg-white dark:bg-brand-dark min-h-screen">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">
          The product you are looking for does not exist.
        </p>
        <Link
          to="/products"
          className="mt-4 inline-block text-brand-orange hover:underline"
        >
          &larr; Back to Products
        </Link>
      </div>
    );
  }

  const microstructureImage = imageMap[product.name];
  const applicationImage = product.applicationImage;

  return (
    <>
      <Helmet>
        <title>{product.name} - CBK Engineers</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-sans">
        <section className="relative pt-32 pb-20 bg-brand-light dark:bg-brand-dark-light">
          <div className="relative max-w-7xl mx-auto px-4">
            <Link
              to="/products"
              className="inline-flex items-center text-sm text-gray-500 hover:text-brand-orange mb-4"
            >
              <FaChevronLeft className="mr-2" />
              Back to All Grades
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-extrabold tracking-tight text-brand-orange dark:text-brand-orange-light"
            >
              {product.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl max-w-3xl text-gray-600 dark:text-gray-300"
            >
              {product.description}
            </motion.p>
          </div>
        </section>

        <div className="py-20 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky top-28 h-fit"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mainImage || "placeholder"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black rounded-lg overflow-hidden shadow-2xl aspect-square"
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
                  <div
                    onClick={() => setMainImage(microstructureImage)}
                    className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-4 hover:border-brand-orange/50 transition-all ${
                      mainImage === microstructureImage
                        ? "border-brand-orange"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={microstructureImage}
                      alt="Microstructure thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {applicationImage && (
                  <div
                    onClick={() => setMainImage(applicationImage)}
                    className={`w-24 h-24 rounded-md overflow-hidden cursor-pointer border-4 hover:border-brand-orange/50 transition-all ${
                      mainImage === applicationImage
                        ? "border-brand-orange"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={applicationImage}
                      alt="Application thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="space-y-12">
                {product.features && product.features.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                      Key Features
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-3">
                          <FaCheckCircle className="text-green-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Technical Data
                  </h2>
                  <div className="mt-4 border-t border-b border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                    <SpecRow label="Hardness" value={product.hardness} />
                    <SpecRow
                      label="Max Temperature"
                      value={product.temp || "N/A"}
                    />
                    {product.microstructure && (
                      <>
                        <SpecRow
                          label="Etchant"
                          value={product.microstructure.etchant}
                        />
                        <SpecRow
                          label="Magnification"
                          value={product.microstructure.magnification}
                        />
                        <SpecRow
                          label="Primary Carbide %"
                          value={product.microstructure.primaryCarbide}
                        />
                        <SpecRow
                          label="Secondary Carbide %"
                          value={product.microstructure.secondaryCarbide}
                        />
                      </>
                    )}
                  </div>
                  {product.microstructure && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Observation:
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {product.microstructure.observation}
                      </p>
                    </div>
                  )}
                </div>

                {product.applications && product.applications.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                      Common Applications
                    </h2>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {product.applications.map((app, i) => (
                        <div
                          key={i}
                          className="bg-brand-light dark:bg-brand-dark-light p-4 rounded-lg flex items-center space-x-3"
                        >
                          <FaIndustry className="text-brand-orange" />
                          <span className="text-gray-700 dark:text-gray-200">
                            {app}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

const SpecRow = ({ label, value }) => (
  <div className="py-3 grid grid-cols-2">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {label}
    </dt>
    <dd className="text-sm text-gray-900 dark:text-white font-semibold">
      {value || "N/A"}
    </dd>
  </div>
);

export default ProductDetails;
