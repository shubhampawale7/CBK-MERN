// client/src/components/AdminHeader.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSignOutAlt,
  FaTachometerAlt,
  FaCube,
  FaIndustry,
  FaBars,
  FaChevronLeft,
  FaUserCircle,
} from "react-icons/fa";

// Add more admin links to demonstrate the sidebar's scalability
const adminNavLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { to: "/admin/products", label: "Products", icon: FaCube },
  { to: "/admin/applications", label: "Applications", icon: FaIndustry },
];

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/admin/login");
  };

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="hidden md:flex flex-col h-screen bg-white dark:bg-brand-dark border-r border-gray-200 dark:border-gray-800 fixed top-0 left-0 z-50"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-gray-800">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <NavLink to="/" className="text-xl font-bold text-brand-orange">
                  CBK ENGINEERS
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-dark-light"
          >
            <FaChevronLeft
              className={`transition-transform duration-300 ${
                isSidebarOpen ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-2">
          {adminNavLinks.map((link) => (
            <AdminNavLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isOpen={isSidebarOpen}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <AdminNavLink
            to="#"
            onClick={handleLogout}
            icon={FaSignOutAlt}
            label="Logout"
            isOpen={isSidebarOpen}
            isLogout
          />
        </div>
      </motion.aside>

      {/* --- Mobile Header --- */}
      <header className="md:hidden bg-white dark:bg-brand-dark p-4 shadow-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold text-brand-orange">
            CBK
          </NavLink>
          {/* Mobile menu button can be added here if a slide-out menu is desired */}
        </div>
      </header>
      {/* --- Mobile Bottom Nav --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-brand-dark border-t border-gray-200 dark:border-gray-800 z-50 grid grid-cols-4">
        {adminNavLinks.map((link) => (
          <AdminNavLink
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isMobile
          />
        ))}
        <AdminNavLink
          to="#"
          onClick={handleLogout}
          icon={FaSignOutAlt}
          label="Logout"
          isMobile
          isLogout
        />
      </div>
    </>
  );
};

// Helper component for navigation links to keep the main component clean
const AdminNavLink = ({
  to,
  icon: Icon,
  label,
  isOpen,
  isMobile = false,
  isLogout = false,
  ...props
}) => {
  const navLinkClasses = `flex items-center w-full h-12 rounded-lg transition-colors duration-200`;
  const activeClasses = `bg-brand-orange/10 text-brand-orange`;
  const inactiveClasses = `text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-brand-dark-light`;
  const logoutClasses = `text-red-500 hover:bg-red-500/10`;
  const mobileClasses = `flex-col justify-center text-xs h-16 rounded-none`;

  if (isMobile) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${navLinkClasses} ${mobileClasses} ${
            isLogout
              ? logoutClasses
              : isActive
              ? activeClasses
              : inactiveClasses
          }`
        }
        {...props}
      >
        <Icon size={20} />
        <span className="mt-1">{label}</span>
      </NavLink>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${navLinkClasses} ${
          isLogout ? logoutClasses : isActive ? activeClasses : inactiveClasses
        }`
      }
      {...props}
    >
      <div className="flex items-center justify-center w-12">
        <Icon size={20} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="font-semibold whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );
};

export default AdminHeader;
