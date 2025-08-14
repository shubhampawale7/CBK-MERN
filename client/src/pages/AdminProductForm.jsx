// client/src/pages/AdminProductForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

const availableCategories = [
  { id: "abrasion", name: "High Abrasion" },
  { id: "impact", name: "High Impact" },
  { id: "temperature", name: "High Temperature" },
];

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    id: "", // The URL slug
    description: "",
    hardness: "",
    temp: "",
    alloyElements: "",
    microstructure: "",
    category: [],
    applicationImage: "",
    features: "",
    applications: "",
  });
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          };
          const { data } = await api.get(`/api/products/${id}`, config);

          setFormData({
            name: data.name || "",
            id: data.id || "",
            description: data.description || "",
            hardness: data.hardness || "",
            temp: data.temp || "",
            alloyElements: data.alloyElements
              ? data.alloyElements.join(", ")
              : "",
            microstructure: data.microstructure || "",
            category: data.category || [],
            applicationImage: data.applicationImage || "",
            features: data.features ? data.features.join(", ") : "",
            applications: data.applications ? data.applications.join(", ") : "",
          });
        } catch (error) {
          toast.error("Failed to fetch product data.");
          navigate("/admin/dashboard");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (categoryId) => {
    setFormData((prev) => {
      const newCategories = prev.category.includes(categoryId)
        ? prev.category.filter((c) => c !== categoryId)
        : [...prev.category, categoryId];
      return { ...prev, category: newCategories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      toast.error("Authentication error. Please log in again.");
      setLoading(false);
      navigate("/admin/login");
      return;
    }
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    try {
      const productData = {
        ...formData,
        alloyElements: formData.alloyElements
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        features: formData.features
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        applications: formData.applications
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (isEditMode) {
        await api.put(`/api/products/${id}`, productData, config);
        toast.success("Product updated successfully!");
      } else {
        await api.post("/api/products", productData, config);
        toast.success("Product created successfully!");
      }
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to save product. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    "w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-brand-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange-light focus:border-transparent transition-all";
  const labelStyles =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 max-w-4xl mx-auto bg-white dark:bg-brand-dark-light rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-brand-orange dark:text-brand-orange-light">
            {isEditMode ? "Edit Product" : "Create New Product"}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <FaArrowLeft />
            <span>Back</span>
          </motion.button>
        </div>

        {loading && isEditMode ? (
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-4xl text-brand-orange" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelStyles}>
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputStyles}
                />
              </div>
              <div>
                <label htmlFor="id" className={labelStyles}>
                  URL Slug (e.g., cbk-eco)
                </label>
                <input
                  id="id"
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  className={inputStyles}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="hardness" className={labelStyles}>
                  Hardness (e.g., 55-58 Rc)
                </label>
                <input
                  id="hardness"
                  type="text"
                  name="hardness"
                  value={formData.hardness}
                  onChange={handleChange}
                  required
                  className={inputStyles}
                />
              </div>
              <div>
                <label htmlFor="temp" className={labelStyles}>
                  Temp Resistance (Optional)
                </label>
                <input
                  id="temp"
                  type="text"
                  name="temp"
                  value={formData.temp}
                  onChange={handleChange}
                  className={inputStyles}
                  placeholder="e.g., 100°C"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className={labelStyles}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className={inputStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Categories</label>
              <div className="mt-2 flex flex-wrap gap-4 p-4 bg-gray-100 dark:bg-brand-dark rounded-lg">
                {availableCategories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.category.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                    />
                    <span className="text-gray-700 dark:text-gray-200">
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="applicationImage" className={labelStyles}>
                Application Image URL (Optional)
              </label>
              <input
                id="applicationImage"
                type="text"
                name="applicationImage"
                value={formData.applicationImage}
                onChange={handleChange}
                className={inputStyles}
                placeholder="e.g., /images/applications/conveyor.jpg"
              />
            </div>
            <div>
              <label htmlFor="features" className={labelStyles}>
                Key Features (comma-separated)
              </label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows="3"
                className={inputStyles}
                placeholder="e.g., Cost-Effective, Good Formability..."
              />
            </div>
            <div>
              <label htmlFor="applications" className={labelStyles}>
                Common Applications (comma-separated)
              </label>
              <textarea
                id="applications"
                name="applications"
                value={formData.applications}
                onChange={handleChange}
                rows="3"
                className={inputStyles}
                placeholder="e.g., Hoppers, Chutes, Liners..."
              />
            </div>
            <div className="pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-brand-orange text-white font-bold text-lg rounded-md shadow-lg hover:bg-brand-orange-dark transition-colors disabled:bg-gray-400"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaSave />
                    <span>
                      {isEditMode ? "Update Product" : "Save Product"}
                    </span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AdminProductForm;
