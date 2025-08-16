// client/src/pages/AdminApplicationForm.jsx
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

const AdminApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    industry: "",
    tagline: "", // Added new fields for a more complete form
    description: "",
    image: "",
  });
  const [applicationsList, setApplicationsList] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const isEditMode = Boolean(id);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) {
        setPageLoading(false);
        return;
      }
      try {
        const { data } = await api.get(`/api/applications/${id}`);
        setFormData({
          industry: data.industry || "",
          tagline: data.tagline || "",
          description: data.description || "",
          image: data.image || "",
        });
        setApplicationsList(data.applicationsList || []);
      } catch (error) {
        toast.error("Failed to fetch application data.");
        navigate("/admin/dashboard");
      } finally {
        setPageLoading(false);
      }
    };

    fetchApplication();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      if (!applicationsList.includes(currentTag.trim())) {
        setApplicationsList([...applicationsList, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setApplicationsList(applicationsList.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (applicationsList.length === 0) {
      toast.error("Please add at least one key application.");
      return;
    }
    setLoading(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };

    try {
      const applicationData = { ...formData, applicationsList };

      if (isEditMode) {
        await api.put(`/api/applications/${id}`, applicationData, config);
        toast.success("Application updated successfully!");
      } else {
        await api.post("/api/applications", applicationData, config);
        toast.success("Application created successfully!");
      }
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save application."
      );
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-brand-orange" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-serif ml-0 md:ml-20 lg:ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {isEditMode ? "Edit Application" : "Create New Application"}
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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main form fields */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 bg-white dark:bg-brand-dark-light p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6"
            >
              <motion.div variants={itemVariants}>
                <FormInput
                  label="Industry Name"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FormInput
                  label="Tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="e.g., Solutions for high-wear environments"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FormTextarea
                  label="Full Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Key Applications (Tags)
                </label>
                <div className="flex flex-wrap gap-2 p-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg">
                  <AnimatePresence>
                    {applicationsList.map((tag) => (
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
                    placeholder="Add a tag and press Enter"
                    className="flex-1 bg-transparent p-1 focus:outline-none text-gray-800 dark:text-white"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Image and Actions */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1 space-y-8"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-brand-dark-light p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Display Image
                </label>
                <div className="mt-1 flex justify-center items-center h-40 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-brand-dark">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <FaImage className="mx-auto h-12 w-12" />
                      <p className="mt-2 text-sm">Image URL below</p>
                    </div>
                  )}
                </div>
                <FormInput
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  containerClassName="mt-4"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-orange text-white font-bold text-lg rounded-xl shadow-lg hover:bg-brand-orange-dark transition-all duration-300 disabled:bg-gray-400"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <>
                      <FaSave />
                      <span>
                        {isEditMode ? "Update Application" : "Save Application"}
                      </span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- Sub-components for a cleaner form ---
const FormInput = ({ label, name, containerClassName, ...props }) => (
  <div className={containerClassName}>
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

export default AdminApplicationForm;
