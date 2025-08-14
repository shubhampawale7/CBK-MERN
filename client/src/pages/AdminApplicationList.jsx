// client/src/pages/AdminApplicationList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaEdit, FaTrash, FaPlus, FaSpinner } from "react-icons/fa";

const AdminApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Your original data fetching and handling logic is unchanged.
  const fetchApplications = async () => {
    try {
      const { data } = await axios.get("/api/applications");
      setApplications(data);
    } catch (error) {
      toast.error("Failed to fetch applications.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this application? This action cannot be undone."
      )
    ) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`/api/applications/${id}`, config);
        toast.success("Application deleted successfully!");
        fetchApplications();
      } catch (error) {
        toast.error("Failed to delete application.");
        console.error(error);
      }
    }
  };

  const handleEdit = (id) => navigate(`/admin/applications/${id}/edit`);
  const handleCreate = () => navigate("/admin/applications/create");

  return (
    // This component assumes it's rendered within a layout that includes the AdminHeader.
    <div className="p-4 sm:p-6 lg:p-8 font-sans">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Manage Applications
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

      {/* Content Area */}
      <div className="bg-white dark:bg-brand-dark-light rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-brand-orange" />
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              No Applications Found
            </h3>
            <p className="mt-2 text-gray-500">
              Click "Create New" to add the first application.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-brand-dark">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Key Applications
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-brand-dark-light divide-y divide-gray-200 dark:divide-gray-700">
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 dark:hover:bg-brand-dark transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {app.industry}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-sm truncate">
                      {app.applicationsList.join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <button
                        onClick={() => handleEdit(app._id)}
                        className="flex-shrink-0 inline-flex items-center space-x-2 text-gray-600 hover:text-brand-orange dark:text-gray-300 dark:hover:text-brand-orange-light transition-colors"
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
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

export default AdminApplicationList;
