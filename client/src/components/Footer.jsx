// client/src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaFacebook,
  FaTools,
  FaWrench,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-gray-400 font-sans relative overflow-hidden">
      {/* Subtle SVG Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="footer-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 10h40M10 0v40"
                stroke="white"
                strokeWidth="0.5"
              ></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)"></rect>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section with Newsletter */}
        <div className="grid lg:grid-cols-2 gap-8 pb-12 mb-12 border-b border-gray-800">
          <div>
            <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
            <p className="mt-2 text-gray-400">
              Subscribe to our newsletter for the latest in wear plate
              technology, case studies, and company news.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-brand-dark-light border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full sm:w-auto flex-shrink-0 px-6 py-3 bg-brand-orange text-white font-bold rounded-md shadow-lg hover:bg-brand-orange-dark transition-colors"
            >
              Subscribe
            </motion.button>
          </form>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <NavLink to="/" className="inline-block">
              <h3 className="text-2xl font-bold text-brand-orange">
                CBK ENGINEERS
              </h3>
            </NavLink>
            <p className="text-sm text-gray-300">
              High-performance, custom-fabricated wear plates for heavy
              industry.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Navigate
            </h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/products">Products</FooterLink>
              <FooterLink to="/applications">Applications</FooterLink>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/compare-products">Compare Products</FooterLink>
              <FooterLink to="/material-selector">Selector Wizard</FooterLink>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <ContactLink
                icon={FaPhone}
                href="tel:9028040306"
                text="9028040306"
              />
              <ContactLink
                icon={FaWhatsapp}
                href="https://wa.me/8530302402"
                text="8530302402"
              />
              <ContactLink
                icon={FaEnvelope}
                href="mailto:cbk_engineers@yahoo.com"
                text="cbk_engineers@yahoo.com"
              />
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Locations
            </h3>
            <div className="text-sm">
              <p className="font-bold text-gray-200">Office:</p>
              <p>562, Sadashiv Peth, Pune, Maharashtra, 411030.</p>
            </div>
            <div className="text-sm">
              <p className="font-bold text-gray-200">Plant:</p>
              <p>Jaimalhar Industrial Estate, Chikhali, Pune, 411062.</p>
            </div>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} CBK Engineers. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <SocialLink href="#" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </SocialLink>
            <SocialLink href="#" aria-label="Facebook">
              <FaFacebook size={20} />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper components for cleaner, more reusable code
const FooterLink = ({ to, children }) => (
  <li>
    <NavLink
      to={to}
      className="group text-gray-400 hover:text-brand-orange transition-colors flex items-center"
    >
      <span>{children}</span>
      <FaArrowRight className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all ml-2" />
    </NavLink>
  </li>
);

const ContactLink = ({ icon: Icon, href, text }) => (
  <li className="flex items-start space-x-3">
    <Icon className="flex-shrink-0 mt-1 text-brand-orange" />
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline"
    >
      {text}
    </a>
  </li>
);

const SocialLink = ({ href, children, ...props }) => (
  <a
    href={href}
    className="text-gray-500 hover:text-brand-orange transform hover:scale-110 transition-all"
    {...props}
  >
    {children}
  </a>
);

export default Footer;
