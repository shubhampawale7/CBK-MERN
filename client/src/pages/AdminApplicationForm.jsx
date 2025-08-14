// client/src/pages/AdminApplicationForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

const AdminApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    industry: "",
    applicationsList: "",
  });
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(id);

  // Your original data fetching logic is unchanged.
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchApplication = async () => {
        try {
          const { data } = await axios.get(`/api/applications/${id}`);
          setFormData({
            industry: data.industry,
            applicationsList: data.applicationsList.join(", "),
          });
        } catch (error) {
          toast.error("Failed to fetch application data.");
        } finally {
          setLoading(false);
        }
      };
      fetchApplication();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Your original submission logic is unchanged.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userInfo = localStorage.getItem("userInfo");
    // This is a simplified check. In a real app, you'd validate the token.
    if (!userInfo) {
      toast.error("You must be logged in to perform this action.");
      setLoading(false);
      navigate("/admin/login");
      return;
    }
    const token = JSON.parse(userInfo).token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const applicationData = {
        ...formData,
        applicationsList: formData.applicationsList
          .split(",")
          .map((s) => s.trim()),
      };

      if (isEditMode) {
        await axios.put(`/api/applications/${id}`, applicationData, config);
        toast.success("Application updated successfully!");
      } else {
        await axios.post("/api/applications", applicationData, config);
        toast.success("Application created successfully!");
      }
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to save application. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    "w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-brand-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange-light focus:border-transparent transition-all";
  const labelStyles =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";

  return (
    // This component assumes it's rendered within a layout that includes the AdminHeader.
    // The parent div provides the overall page background color.
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 max-w-4xl mx-auto bg-white dark:bg-brand-dark-light rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-brand-orange dark:text-brand-orange-light">
            {isEditMode ? "Edit Application" : "Create New Application"}
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
            <div>
              <label htmlFor="industry" className={labelStyles}>
                Industry Name
              </label>
              <input
                id="industry"
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className={inputStyles}
              />
            </div>
            <div>
              <label htmlFor="applicationsList" className={labelStyles}>
                Applications List
              </label>
              <textarea
                id="applicationsList"
                name="applicationsList"
                value={formData.applicationsList}
                onChange={handleChange}
                required
                rows="6"
                className={inputStyles}
                placeholder="Enter each application separated by a comma. E.g., Cyclone, Clinker Chute, Transfer Points..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate each application with a comma.
              </p>
            </div>
            <div className="pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-brand-orange text-white font-bold text-lg rounded-md shadow-lg hover:bg-brand-orange-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AdminApplicationForm;
