// client/src/pages/AdminProductList.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaEdit, FaTrash, FaPlus, FaSpinner } from "react-icons/fa";
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
    if (window.confirm("Are you sure you want to delete this product?")) {
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

  // CORRECTED: The handleEdit function now navigates using the product's database _id
  const handleEdit = (productId) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  const handleCreate = () => navigate("/admin/products/create");

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Manage Products
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          className="flex items-center space-x-2 px-5 py-2 bg-brand-orange text-white font-semibold rounded-lg shadow-md hover:bg-brand-orange-dark transition-colors"
        >
          <FaPlus />
          <span>Create New</span>
        </motion.button>
      </div>

      <div className="bg-white dark:bg-brand-dark-light rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-brand-orange" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              No Products Found
            </h3>
            <p className="mt-2 text-gray-500">
              Click "Create New" to add the first product.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-brand-dark">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Hardness
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-brand-dark-light divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 dark:hover:bg-brand-dark transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.hardness}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      {/* CORRECTED: Pass product._id (the database ID) to handleEdit */}
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="flex-shrink-0 inline-flex items-center space-x-2 text-gray-600 hover:text-brand-orange dark:text-gray-300 dark:hover:text-brand-orange-light transition-colors"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex-shrink-0 inline-flex items-center space-x-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition-colors"
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
