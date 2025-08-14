// client/src/components/Header.jsx
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaHome,
  FaInfoCircle,
  FaCube,
  FaIndustry,
  FaTools,
  FaEnvelope,
  FaBuilding,
  FaHardHat,
  FaBolt,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import DropdownMenu from "./DropdownMenu";

// NOTE: For the premium DropdownMenu to work, you need to add a 'description' and 'icon' to each link.
const productLinks = [
  {
    to: "/products",
    label: "All Products",
    description: "View our complete line of 13 wear plate grades.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-eco",
    label: "CBK ECO",
    description: "Abrasion resistant and mild impact resistant.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-std",
    label: "CBK STD",
    description: "Abrasion resistant and mild impact resistant.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-1",
    label: "CBK 1",
    description: "Heavy abrasion with little impact.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-1-plus",
    label: "CBK 1 Plus",
    description: "Primary & secondary carbides for severe abrasion.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-5",
    label: "CBK 5",
    description: "Severe abrasion resistance up to 300°C.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-5s",
    label: "CBK 5S",
    description: "Abrasion resistance for fans up to 400°C.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-ni",
    label: "CBK Ni",
    description: "Complex carbides with Nickel for toughness.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-14",
    label: "CBK 14",
    description: "Complex carbides for extreme conditions up to 600°C.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-23",
    label: "CBK 23",
    description: "Our most advanced plate for heat up to 750°C.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-b-carb",
    label: "CBK B CARB",
    description: "Boron carbide for extreme abrasion resistance.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-ti",
    label: "CBK Ti",
    description: "Titanium carbide for high impact resistance.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-v-carb",
    label: "CBK V CARB",
    description: "Vanadium carbide for extreme sliding abrasion.",
    icon: FaCube,
  },
  {
    to: "/products/cbk-w-carb",
    label: "CBK W CARB",
    description: "Tungsten carbide for ultimate wear resistance.",
    icon: FaCube,
  },
];

const applicationLinks = [
  {
    to: "/applications",
    label: "All Applications",
    description: "See all the sectors we provide solutions for.",
    icon: FaIndustry,
  },
  {
    to: "/applications/cement-plant",
    label: "Cement Plant",
    description:
      "Solutions for high-abrasion and high-temperature environments.",
    icon: FaBuilding,
  },

  {
    to: "/applications/ore-processing",
    label: "Ore Processing",
    description: "Robust protection for crushers, chutes, and feeders.",
    icon: FaHardHat,
  },
  {
    to: "/applications/steel",
    label: "Steel",
    description:
      "Durability for the harsh conditions of sinter and blast furnaces.",
    icon: FaTools,
  },
  {
    to: "/applications/coal-preparation",
    label: "Coal Preparation",
    description: "Maximizing the lifespan of high-wear equipment.",
    icon: FaIndustry,
  },
  {
    to: "/applications/power-plant",
    label: "Power Plant",
    description:
      "Reliable wear resistance for critical power generation components.",
    icon: FaBolt,
  },
];

const toolLinks = [
  {
    to: "/material-selector",
    label: "Material Selector",
    description:
      "Use our wizard to find the perfect wear plate for your needs.",
    icon: FaTools,
  },
  {
    to: "/compare-products",
    label: "Product Comparison",
    description:
      "Compare our wear plates side-by-side to make an informed decision.",
    icon: FaTools,
  },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClasses =
    "relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-full flex items-center space-x-2";

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 font-sans ${
          isScrolled
            ? "bg-white/90 dark:bg-brand-dark/90 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto p-4">
          <NavLink to="/" className="flex items-center space-x-2 z-10">
            <span
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled || location.pathname !== "/"
                  ? "text-brand-orange"
                  : "text-white"
              }`}
            >
              CBK
            </span>
          </NavLink>

          <motion.div className="hidden md:flex items-center space-x-2 bg-gray-200/50 dark:bg-brand-dark-light/50 p-1 rounded-full text-gray-800 dark:text-gray-200">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClasses} ${
                  isActive ? "bg-white dark:bg-brand-dark" : ""
                }`
              }
            >
              <FaHome />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${navLinkClasses} ${
                  isActive ? "bg-white dark:bg-brand-dark" : ""
                }`
              }
            >
              <FaInfoCircle />
              <span>About</span>
            </NavLink>

            <div className="relative group">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive ? "bg-white dark:bg-brand-dark" : ""
                  }`
                }
              >
                <FaCube />
                <span>Products</span>{" "}
                <FaChevronDown className="ml-1 opacity-70" size={10} />
              </NavLink>
              <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 pt-3">
                <DropdownMenu links={productLinks} />
              </div>
            </div>

            <div className="relative group">
              <NavLink
                to="/applications"
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive ? "bg-white dark:bg-brand-dark" : ""
                  }`
                }
              >
                <FaIndustry />
                <span>Applications</span>{" "}
                <FaChevronDown className="ml-1 opacity-70" size={10} />
              </NavLink>
              <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 pt-3">
                <DropdownMenu links={applicationLinks} />
              </div>
            </div>

            <div className="relative group">
              <div className={`${navLinkClasses} cursor-pointer`}>
                <FaTools />
                <span>Tools</span>{" "}
                <FaChevronDown className="ml-1 opacity-70" size={10} />
              </div>
              <div className="absolute hidden group-hover:block top-full right-0 pt-3">
                <DropdownMenu links={toolLinks} />
              </div>
            </div>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${navLinkClasses} ${
                  isActive ? "bg-white dark:bg-brand-dark" : ""
                }`
              }
            >
              <FaEnvelope />
              <span>Contact</span>
            </NavLink>
          </motion.div>

          <div className="flex items-center space-x-2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-400" size={20} />
              ) : (
                <FaMoon
                  className={`${
                    isScrolled || location.pathname !== "/"
                      ? "text-gray-800"
                      : "text-white"
                  }`}
                  size={20}
                />
              )}
            </motion.button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden focus:outline-none p-2 ${
                isScrolled || location.pathname !== "/"
                  ? "text-gray-800 dark:text-white"
                  : "text-white"
              }`}
              aria-label="Open mobile menu"
            >
              <FaBars size={22} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-4/5 bg-white dark:bg-brand-dark p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-brand-orange">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                  aria-label="Close mobile menu"
                >
                  <FaTimes size={22} />
                </button>
              </div>
              <div className="mt-8 flex flex-col space-y-4">
                <NavLink
                  to="/"
                  className="text-lg font-medium p-2 rounded-md hover:bg-brand-light dark:hover:bg-brand-dark-light"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className="text-lg font-medium p-2 rounded-md hover:bg-brand-light dark:hover:bg-brand-dark-light"
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/products"
                  className="text-lg font-medium p-2 rounded-md hover:bg-brand-light dark:hover:bg-brand-dark-light"
                >
                  Products
                </NavLink>
                <NavLink
                  to="/applications"
                  className="text-lg font-medium p-2 rounded-md hover:bg-brand-light dark:hover:bg-brand-dark-light"
                >
                  Applications
                </NavLink>
                <div className="text-lg font-medium p-2 text-gray-500">
                  Tools
                </div>
                <div className="flex flex-col pl-4 border-l-2 border-brand-orange-light">
                  <NavLink
                    to="/material-selector"
                    className="block px-4 py-2 rounded text-sm hover:bg-brand-light dark:hover:bg-brand-dark"
                  >
                    Material Selector
                  </NavLink>
                  <NavLink
                    to="/compare-products"
                    className="block px-4 py-2 rounded text-sm hover:bg-brand-light dark:hover:bg-brand-dark"
                  >
                    Compare Products
                  </NavLink>
                </div>
                <NavLink
                  to="/contact"
                  className="mt-6 inline-block w-full text-center p-3 bg-brand-orange text-white font-semibold rounded-lg"
                >
                  Get a Quote
                </NavLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
