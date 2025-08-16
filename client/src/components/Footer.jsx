// client/src/components/Footer.jsx
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
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
    <footer className="bg-brand-light dark:bg-brand-dark font-serif">
      {/* SECTION 1: NEWSLETTER CTA */}
      <div className="relative bg-white dark:bg-brand-dark-light text-center py-16 px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Stay Ahead of the Curve
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Subscribe to our newsletter for the latest in wear plate technology
            and industry insights.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your.email@example.com"
              className="w-full px-5 py-3 bg-white dark:bg-brand-dark border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full sm:w-auto flex-shrink-0 px-8 py-3 bg-brand-orange text-white font-bold rounded-md shadow-lg hover:bg-brand-orange-dark transition-colors"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* SECTION 2: MAIN FOOTER with SVG WAVE */}
      <div className="relative bg-brand-dark text-gray-400">
        {/* SVG Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-[calc(100%+1.3px)] h-[150px]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-current text-white dark:text-brand-dark-light"
            ></path>
          </svg>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12"
        >
          {/* Main Footer Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Column 1: About & Social */}
            <motion.div variants={itemVariants} className="space-y-6">
              <NavLink to="/">
                <img
                  src="/logo.png"
                  alt="CBK Engineers Logo"
                  className="h-10 w-auto"
                />
              </NavLink>
              <p className="text-sm text-gray-300 pr-8">
                High-performance, custom-fabricated wear plates for the world's
                most demanding heavy industries.
              </p>
              <div className="flex space-x-4">
                <SocialLink href="#" aria-label="LinkedIn">
                  <FaLinkedin size={22} />
                </SocialLink>
                <SocialLink href="#" aria-label="Facebook">
                  <FaFacebook size={22} />
                </SocialLink>
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white tracking-wider">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm">
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/products">Products</FooterLink>
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/applications">Applications</FooterLink>
                <FooterLink to="/compare-products">Compare</FooterLink>
                <FooterLink to="/material-selector">Finder</FooterLink>
              </div>
            </motion.div>

            {/* Column 3: Get in Touch */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white tracking-wider">
                Get in Touch
              </h3>
              <ul className="mt-4 space-y-4 text-sm">
                <ContactLink
                  icon={FaPhone}
                  href="tel:+919028040306"
                  text="+91 90280 40306"
                />
                <ContactLink
                  icon={FaWhatsapp}
                  href="https://wa.me/+918530302402"
                  text="WhatsApp Us"
                />
                <ContactLink
                  icon={FaEnvelope}
                  href="mailto:cbk_engineers@yahoo.com"
                  text="Email Us"
                />
              </ul>
            </motion.div>
          </div>

          {/* Sub-Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-gray-800 text-sm text-center"
          >
            <p>
              &copy; {currentYear} CBK Engineers, Pune. All Rights Reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

// --- Helper Components with new hover styles ---

const FooterLink = ({ to, children }) => (
  <NavLink
    to={to}
    className="group text-gray-400 hover:text-brand-orange-light transition-colors duration-300 relative"
  >
    {children}
    <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
  </NavLink>
);

const ContactLink = ({ icon: Icon, href, text }) => (
  <li className="flex items-center space-x-4 group">
    <div className="bg-brand-dark-light group-hover:bg-brand-orange rounded-full p-3 transition-colors duration-300">
      <Icon
        className="text-brand-orange group-hover:text-white transition-colors duration-300"
        size={18}
      />
    </div>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition-colors"
    >
      {text}
    </a>
  </li>
);

const SocialLink = ({ href, children, ...props }) => (
  <motion.a
    href={href}
    className="text-gray-500 hover:text-brand-orange"
    whileHover={{ scale: 1.2, y: -3 }}
    transition={{ type: "spring", stiffness: 300 }}
    {...props}
  >
    {children}
  </motion.a>
);

export default Footer;
