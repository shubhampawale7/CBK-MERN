// client/src/components/DropdownMenu.jsx
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const DropdownMenu = ({ links }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-60 bg-white dark:bg-brand-dark-light rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <ul className="py-2">
        {links.map((link) => (
          <motion.li key={link.to} variants={itemVariants}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `block px-5 py-2 text-sm transition-colors duration-200 
                ${
                  isActive
                    ? "text-brand-orange font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-brand-light dark:hover:bg-brand-dark"
                }`
              }
            >
              {link.label}
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default DropdownMenu;
