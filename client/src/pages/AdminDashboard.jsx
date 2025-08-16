// client/src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminProductList from "./AdminProductList"; // Assuming this component exists
import AdminApplicationList from "./AdminApplicationList"; // Assuming this component exists
import {
  FaBoxOpen,
  FaThLarge,
  FaEnvelopeOpenText,
  FaChartBar,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  // Mock data for stat cards - in a real app, this would come from an API
  const [stats, setStats] = useState({
    products: 0,
    applications: 0,
    inquiries: 0,
  });

  useEffect(() => {
    // Simulate fetching data for the stat cards
    setTimeout(() => {
      setStats({ products: 13, applications: 5, inquiries: 27 });
    }, 500);
  }, []);

  const tabs = [
    { id: "products", label: "Manage Products", icon: FaBoxOpen },
    { id: "applications", label: "Manage Applications", icon: FaThLarge },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    // This component assumes it's rendered within a layout that includes the Admin Sidebar.
    // The ml-0 md:ml-20 lg:ml-64 classes account for the sidebar's width.
    <div className="bg-brand-light dark:bg-brand-dark min-h-screen p-4 sm:p-6 lg:p-8 font-serif ml-0 md:ml-20 lg:ml-64">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Page Header */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-gray-800 dark:text-white mb-8"
        >
          Dashboard
        </motion.h1>

        {/* Stat Cards Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          <StatCard
            icon={FaBoxOpen}
            title="Total Products"
            value={stats.products}
            color="blue"
          />
          <StatCard
            icon={FaThLarge}
            title="Total Applications"
            value={stats.applications}
            color="green"
          />
          <StatCard
            icon={FaEnvelopeOpenText}
            title="New Inquiries"
            value={stats.inquiries}
            color="orange"
          />
          <StatCard
            icon={FaChartBar}
            title="Site Visits"
            value="3.4k"
            color="purple"
          />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div variants={itemVariants}>
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-bold transition-colors duration-300
                            ${
                              activeTab === tab.id
                                ? "text-brand-orange"
                                : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                            }`}
              >
                <tab.icon />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "products" ? (
                <AdminProductList />
              ) : (
                <AdminApplicationList />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- Sub-components for a cleaner, more professional structure ---

const StatCard = ({ icon: Icon, title, value, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-400",
    green: "from-green-500 to-green-400",
    orange: "from-amber-500 to-orange-400",
    purple: "from-purple-500 to-purple-400",
  };

  return (
    <div
      className={`relative p-6 bg-white dark:bg-brand-dark-light rounded-2xl shadow-lg overflow-hidden`}
    >
      <div
        className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${
          colorClasses[color] || colorClasses.blue
        }`}
      ></div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
            {value}
          </p>
        </div>
        <div
          className={`p-3 rounded-full bg-gradient-to-br ${
            colorClasses[color] || colorClasses.blue
          } text-white shadow-md`}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
