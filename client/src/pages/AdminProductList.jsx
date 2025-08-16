// client/src/pages/AdminProductList.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaEdit, FaTrash, FaPlus, FaSpinner, FaCube } from "react-icons/fa";
import api from "../api";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/products");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await api.delete(`/api/products/${id}`, config);
        toast.success("Product deleted successfully!");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product.");
        console.error(error);
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  const handleCreate = () => navigate("/admin/products/create");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 sm:p-0"
    >
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Manage Products
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2 bg-brand-orange text-white font-semibold rounded-lg shadow-md hover:bg-brand-orange-dark transition-colors"
        >
          <FaPlus />
          <span>Create New</span>
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-brand-orange" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-brand-dark-light rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <FaCube className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            No Products Found
          </h3>
          <p className="mt-2 text-gray-500">
            Click "Create New" to add the first product.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product._id}
                layout
                variants={itemVariants}
                exit="exit"
                className="relative bg-white dark:bg-brand-dark-light rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col group"
              >
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {product.name}
                    </h3>
                    <span className="text-sm font-semibold bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-full">
                      {product.hardness}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex-grow">
                    {product.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                    <ActionButton
                      onClick={() => handleEdit(product._id)}
                      icon={FaEdit}
                      text="Edit"
                      color="blue"
                    />
                    <ActionButton
                      onClick={() => handleDelete(product._id)}
                      icon={FaTrash}
                      text="Delete"
                      color="red"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

const ActionButton = ({ onClick, icon: Icon, text, color }) => {
  const colorClasses = {
    blue: "text-blue-600 dark:text-blue-400 hover:bg-blue-500/10",
    red: "text-red-600 dark:text-red-400 hover:bg-red-500/10",
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 ${colorClasses[color]}`}
    >
      <Icon />
      <span>{text}</span>
    </button>
  );
};

export default AdminProductList;
