// client/src/pages/Home.jsx
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ApplicationCard from "../components/ApplicationCard";
import Testimonials from "../components/Testimonials";
import {
  FaIndustry,
  FaHardHat,
  FaTools,
  FaBuilding,
  FaBolt,
  FaArrowRight,
  FaAward,
  FaCogs,
  FaUserTie,
  FaHandshake,
} from "react-icons/fa";
import SpecificationsOverview from "../components/SpecificationsOverview";
import FixingMethods from "../components/FixingMethods";

// Data arrays for featured content
const featuredProducts = [
  {
    name: "CBK ECO",
    description: "Abrasion Resistant and Mild Impact Resistant",
    hardness: "55-58 Rc",
  },
  {
    name: "CBK STD",
    description: "Abrasion Resistant and Mild Impact Resistant",
    hardness: "58-60 Rc",
  },
  {
    name: "CBK 14",
    description:
      "Complex Carbide of Chromium, Niobium, Vanadium, Tungsten, Molybdenum",
    hardness: "60-64 Rc",
  },
  {
    name: "CBK Ti",
    description: "Titanium Carbide for Impact Resistance",
    hardness: "56-58 Rc",
  },
];
const industries = [
  {
    industry: "Cement Plant",
    details: ["Cyclone", "Clinker Chute", "Transfer Points"],
    to: "/applications/cement-plant",
  },
  {
    industry: "Ore Processing",
    details: ["Transfer Chutes", "Crusher Liners", "Screen Plates"],
    to: "/applications/ore-processing",
  },
  {
    industry: "Steel",
    details: ["Sintering Cooler", "Discharge Chutes", "Blast Furnace Closers"],
    to: "/applications/steel",
  },
  {
    industry: "Power Plant",
    details: ["Coal Mill Rings", "Scraper Blades", "Ash Pump Impellers"],
    to: "/applications/power-plant",
  },
];
const iconMap = {
  "Cement Plant": FaBuilding,
  "Ore Processing": FaHardHat,
  Steel: FaTools,
  "Power Plant": FaBolt,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  return (
    <>
      <Helmet>
        <title>CBK Engineers - High-Performance Wear Plates Manufacturer</title>
        <meta
          name="description"
          content="CBK Engineers is a leading wear plates manufacturer specializing in a wide range of abrasion and impact resistant plates for various industrial applications."
        />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-sans">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/cbk-hero-background.jpg')",
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10 px-4"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-extrabold text-white tracking-tight"
            >
              Engineered for Endurance
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            >
              We are a premier manufacturer of high-performance wear plates,
              providing custom-fabricated solutions to combat extreme abrasion
              and impact in heavy industries.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 10px 30px rgba(245, 130, 32, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white font-bold rounded-full shadow-lg"
                >
                  Explore Our Grades
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full"
                >
                  Request a Quote
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* "Why CBK Engineers?" Section */}
        <section className="py-20 bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
              Why CBK Engineers?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our singular focus is on delivering wear plate solutions that
              enhance performance, reduce downtime, and provide exceptional
              value through superior engineering and dedicated partnership.
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <ValuePropCard
                icon={FaUserTie}
                title="Metallurgical Expertise"
                description="Our foundation is built on deep metallurgical knowledge, ensuring you receive the ideal alloy composition for your specific wear challenges."
              />
              <ValuePropCard
                icon={FaAward}
                title="Uncompromising Quality"
                description="Through our advanced Powder Fusion Welding Process, we produce plates with uniform hardness and minimal dilution for superior lifespan."
              />
              <ValuePropCard
                icon={FaCogs}
                title="Custom Fabrication"
                description="We fabricate plates to your exact specifications, including custom sizes, shapes, and fixing methods to fit your equipment perfectly."
              />
              <ValuePropCard
                icon={FaHandshake}
                title="Solution-Oriented Partnership"
                description="We work closely with you to understand your operational challenges, providing tailored solutions that deliver long-term value."
              />
            </motion.div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 bg-white dark:bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-brand-orange dark:text-brand-orange-light">
              Our Featured Wear Plate Grades
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/products"
                className="group inline-flex items-center space-x-2 text-brand-orange font-semibold text-lg hover:underline"
              >
                <span>View All Product Grades</span>
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* NEW SECTIONS: We assume you have the redesigned components for these */}
        <SpecificationsOverview />
        <FixingMethods />

        {/* Industries We Serve Section */}
        <section className="py-20 bg-white dark:bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
              Industries We Serve
            </h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              From the intense heat of steel mills to the abrasive force of ore
              processing, our wear plates are proven to perform in the most
              demanding industrial environments.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industries.map((app) => {
                const IconComponent = iconMap[app.industry] || FaIndustry;
                return (
                  <ApplicationCard
                    key={app.industry}
                    application={app}
                    icon={IconComponent}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="cta-pattern"
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
              <rect width="100%" height="100%" fill="url(#cta-pattern)"></rect>
            </svg>
          </div>
          <div className="relative max-w-7xl mx-auto text-center py-20 px-4">
            <h2 className="text-4xl font-bold text-white">
              Ready to Enhance Your Equipment's Lifespan?
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
              Let's discuss your project. Our team is ready to provide a
              detailed quote for a wear plate solution that meets your exact
              needs and reduces your operational costs.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 30px rgba(245, 130, 32, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-10 py-4 bg-brand-orange text-white font-bold rounded-full shadow-lg"
              >
                Get a Custom Quote
              </motion.button>
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />
      </div>
    </>
  );
};

// Helper component for the "Why CBK" section
const ValuePropCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white dark:bg-brand-dark p-8 rounded-xl shadow-lg text-center hover:-translate-y-2 transition-transform duration-300"
  >
    <div className="inline-block p-5 bg-brand-orange/10 rounded-full mb-4">
      <Icon className="text-5xl text-brand-orange" />
    </div>
    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
      {title}
    </h3>
    <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

export default Home;
