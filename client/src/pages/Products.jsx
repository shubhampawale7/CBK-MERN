// client/src/pages/Products.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import {
  FaSearch,
  FaStar,
  FaShieldAlt,
  FaFire,
  FaTools,
  FaSpinner,
} from "react-icons/fa";
import api from "../api"; // Import your central API file

const filterCategories = [
  { id: "all", name: "All Grades", icon: FaStar },
  { id: "abrasion", name: "High Abrasion", icon: FaShieldAlt },
  { id: "impact", name: "High Impact", icon: FaTools },
  { id: "temperature", name: "High Temperature", icon: FaFire },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // You could add a toast notification for the user here
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const categoryMatch =
      activeFilter === "all" ||
      (product.category && product.category.includes(activeFilter));
    return searchMatch && categoryMatch;
  });

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

        <div className="max-w-screen-xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 lg:sticky top-28 h-fit">
              <div className="p-6 bg-brand-light dark:bg-brand-dark-light rounded-xl shadow-lg">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-orange-light"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                  Categories
                </h3>
                <div className="space-y-2">
                  {filterCategories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      onClick={() => setActiveFilter(cat.id)}
                      className={`w-full flex items-center space-x-3 text-left p-3 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeFilter === cat.id
                          ? "bg-brand-orange text-white"
                          : "hover:bg-gray-200 dark:hover:bg-brand-dark"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <cat.icon
                        className={`flex-shrink-0 ${
                          activeFilter === cat.id
                            ? "text-white"
                            : "text-brand-orange"
                        }`}
                      />
                      <span>{cat.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </aside>

            <main className="lg:col-span-3">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <FaSpinner className="animate-spin text-4xl text-brand-orange" />
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
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
                          Your search for "{searchQuery}" in "{activeFilter}"
                          did not match any products.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
