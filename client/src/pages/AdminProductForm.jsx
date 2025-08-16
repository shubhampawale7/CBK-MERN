// client/src/pages/AdminProductForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSave,
  FaArrowLeft,
  FaSpinner,
  FaTimes,
  FaImage,
} from "react-icons/fa";
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
    slug: "", // Renamed 'id' to 'slug' for clarity
    description: "",
    hardness: "",
    temp: "",
    applicationImage: "",
    bestFor: "", // Added field
  });
  // State for array-based fields for better management
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");
  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setPageLoading(false);
        return;
      }
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setFormData({
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          hardness: data.hardness || "",
          temp: data.temp || "",
          applicationImage: data.applicationImage || "",
          bestFor: data.bestFor || "",
        });
        setCategories(data.category || []);
        setFeatures(data.features || []);
        setApplications(data.applications || []);
      } catch (error) {
        toast.error("Failed to fetch product data.");
        navigate("/admin/dashboard");
      } finally {
        setPageLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCategoryChange = (categoryId) => {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

    try {
      const productData = {
        ...formData,
        category: categories,
        features,
        applications,
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
      toast.error(error.response?.data?.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-brand-orange" />
      </div>
    );
  }

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "specs", label: "Technical Specs" },
    { id: "details", label: "Features & Applications" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-serif ml-0 md:ml-20 lg:ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {isEditMode ? "Edit Product" : "Create New Product"}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <FaArrowLeft />
            <span>Back to List</span>
          </motion.button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-brand-dark-light rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-sm font-bold transition-colors ${
                  activeTab === tab.id
                    ? "text-brand-orange"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="product-form-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "basic" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormInput
                        label="Product Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <FormInput
                        label="URL Slug (e.g., cbk-eco)"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <FormTextarea
                      label="Short Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows="3"
                    />
                    <FormInput
                      label="Application Image URL"
                      name="applicationImage"
                      value={formData.applicationImage}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}
                {activeTab === "specs" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormInput
                        label="Hardness (e.g., 55-58 Rc)"
                        name="hardness"
                        value={formData.hardness}
                        onChange={handleChange}
                        required
                      />
                      <FormInput
                        label="Temp Resistance (e.g., 600°C)"
                        name="temp"
                        value={formData.temp}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Categories
                      </label>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {availableCategories.map((cat) => (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all ${
                              categories.includes(cat.id)
                                ? "bg-brand-orange border-brand-orange text-white"
                                : "bg-transparent border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-brand-orange"
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <TagInput
                      label="Key Features"
                      tags={features}
                      setTags={setFeatures}
                      placeholder="Add a feature and press Enter..."
                    />
                    <TagInput
                      label="Common Applications"
                      tags={applications}
                      setTags={setApplications}
                      placeholder="Add an application and press Enter..."
                    />
                    <FormTextarea
                      label="Best For (Short Summary)"
                      name="bestFor"
                      value={formData.bestFor}
                      onChange={handleChange}
                      rows="2"
                      placeholder="e.g., High impact and moderate abrasion"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-brand-dark rounded-b-xl border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white font-bold text-lg rounded-md shadow-lg hover:bg-brand-orange-dark transition-all duration-300 disabled:bg-gray-400"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <FaSave />
                  <span>{isEditMode ? "Update Product" : "Save Product"}</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- Sub-components for a cleaner form ---
const FormInput = ({ label, name, ...props }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      {...props}
      className="w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-brand-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange-light focus:border-transparent transition-all"
    />
  </div>
);

const FormTextarea = ({ label, name, ...props }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      {...props}
      className="w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-brand-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange-light focus:border-transparent transition-all"
    />
  </div>
);

const TagInput = ({ label, tags, setTags, placeholder }) => {
  const [currentTag, setCurrentTag] = useState("");

  const handleAddTag = (e) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 p-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg">
        <AnimatePresence>
          {tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-2 bg-brand-orange/10 text-brand-orange text-sm font-semibold px-3 py-1 rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-500"
              >
                <FaTimes size={12} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder={placeholder}
          className="flex-1 bg-transparent p-1 focus:outline-none text-gray-800 dark:text-white"
        />
      </div>
    </div>
  );
};

export default AdminProductForm;
