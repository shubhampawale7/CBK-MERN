// client/src/components/AdminHeader.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa"; // Added an icon for logout

const AdminHeader = () => {
  const navigate = useNavigate();

  // Your original logout logic is unchanged.
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/admin/login");
  };

  const navLinkClasses =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "bg-brand-orange/10 text-brand-orange";
  const inactiveLinkClasses =
    "text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-brand-dark-light/50";

  return (
    // UPDATED: Using brand theme colors with a clean, professional look for the admin panel.
    <header className="bg-white dark:bg-brand-dark p-4 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* NEW: Added brand logo and panel title for better context. */}
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-xl font-bold text-brand-orange">
            CBK
          </NavLink>
          <span className="hidden sm:block text-lg font-semibold text-gray-700 dark:text-gray-200">
            Admin Panel
          </span>
        </div>

        <nav className="flex items-center space-x-4">
          {/* UPDATED: Improved styling for navigation links. */}
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${navLinkClasses} ${
                isActive ? activeLinkClasses : inactiveLinkClasses
              }`
            }
          >
            Dashboard
          </NavLink>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // UPDATED: Styling for the logout button to be more distinct.
            className="flex items-center space-x-2 text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-500/10 p-2 rounded-md transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </motion.button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
