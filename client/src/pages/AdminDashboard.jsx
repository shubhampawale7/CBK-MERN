// client/src/pages/AdminDashboard.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import AdminProductList from "./AdminProductList"; // Assuming this component exists
import AdminApplicationList from "./AdminApplicationList";
import { FaBoxOpen, FaThLarge } from "react-icons/fa"; // Added icons for tabs

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const tabButtonBaseStyles =
    "flex items-center space-x-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors duration-300";
  const activeTabStyles = "bg-brand-orange text-white shadow-md";
  const inactiveTabStyles =
    "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-brand-dark";

  return (
    // UPDATED: Using brand theme for the page background.
    // This component assumes it's rendered within a layout that includes the AdminHeader.
    <div className="bg-brand-light dark:bg-brand-dark min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* NEW: Added a clear page title */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Dashboard
          </h1>

          {/* UPDATED: Redesigned tab navigation with a "pill" style */}
          <div className="flex space-x-2 mb-8 p-1 bg-gray-100 dark:bg-brand-dark-light rounded-lg w-full sm:w-auto sm:inline-flex">
            <button
              onClick={() => setActiveTab("products")}
              className={`${tabButtonBaseStyles} ${
                activeTab === "products" ? activeTabStyles : inactiveTabStyles
              }`}
            >
              <FaBoxOpen />
              <span>Manage Products</span>
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`${tabButtonBaseStyles} ${
                activeTab === "applications"
                  ? activeTabStyles
                  : inactiveTabStyles
              }`}
            >
              <FaThLarge />
              <span>Manage Applications</span>
            </button>
          </div>

          {/* The content for the active tab is rendered here */}
          <div>
            {activeTab === "products" ? (
              <AdminProductList />
            ) : (
              <AdminApplicationList />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
