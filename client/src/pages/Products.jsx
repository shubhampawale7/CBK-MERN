// client/src/pages/Products.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import { FaSearch, FaSpinner, FaArrowRight } from "react-icons/fa";
import api from "../api";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const featured = loading ? [] : products.slice(0, 2);

  return (
    <>
      <Helmet>
        <title>Our Wear Plate Grades - CBK Engineers</title>
        <meta
          name="description"
          content="Explore our complete range of specialized wear plate grades, engineered for extreme abrasion, impact, and high-temperature applications."
        />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-sans">
        <div className="relative bg-gray-900 pt-32 pb-20 text-center">
          <div className="absolute inset-0">
            <img
              src="/images/products-banner.jpg"
              alt="Collection of wear plates"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-7xl mx-auto px-4"
          >
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              Our Complete Product Line
            </h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-300">
              From standard abrasion resistance to complex carbides for extreme
              environments, explore the 13 grades of CBK wear plates engineered
              for superior performance and lifespan.
            </p>
          </motion.div>
        </div>

        <section className="py-20 bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-brand-orange dark:text-brand-orange-light mb-12">
              Featured Grades
            </h2>
            {loading ? (
              <div className="flex justify-center">
                <FaSpinner className="animate-spin text-3xl text-brand-orange" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {featured.map((product) => (
                  <FeaturedProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              All Product Grades
            </h2>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search all products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-orange-light"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-4xl text-brand-orange" />
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full text-center py-16"
                  >
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                      No Products Found
                    </h3>
                    <p className="mt-2 text-gray-500">
                      Your search for "{searchQuery}" did not match any
                      products.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

// CORRECTED: This helper component now creates a URL slug from the product name.
const FeaturedProductCard = ({ product }) => {
  const urlSlug = product.name.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link
      to={`/products/${urlSlug}`}
      className="group block bg-white dark:bg-brand-dark rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
    >
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-8">
          <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {product.hardness}
          </span>
          <h3 className="mt-4 text-3xl font-bold text-gray-800 dark:text-white">
            {product.name}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-start text-brand-orange font-semibold">
            <span>View Full Details</span>
            <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        <div className="h-64 md:h-full">
          <img
            src={
              product.applicationImage ||
              "/images/applications/generic-chute.jpg"
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default Products;
