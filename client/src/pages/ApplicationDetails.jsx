// client/src/pages/ApplicationDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaChevronLeft,
  FaIndustry,
  FaShieldAlt,
  FaTools,
  FaSpinner,
  FaPlus,
} from "react-icons/fa";
import ProductCard from "../components/ProductCard"; // Assuming this is your theme-aware 3D card
import api from "../api";

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Parallax scroll effect for the hero image
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.2], [0, -80]); // Increased parallax effect

  useEffect(() => {
    if (id) {
      const fetchApplication = async () => {
        try {
          setLoading(true);
          const { data } = await api.get(`/api/applications/${id}`);
          setApplication(data);
        } catch (error) {
          console.error("Failed to fetch application details:", error);
          setApplication(null);
        } finally {
          setLoading(false);
        }
      };
      fetchApplication();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-brand-dark">
        <FaSpinner className="animate-spin text-5xl text-brand-orange" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex flex-col justify-center items-center text-center py-20 bg-white dark:bg-brand-dark min-h-screen">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          Application Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          The application you're looking for doesn't exist.
        </p>
        <Link
          to="/applications"
          className="mt-6 inline-flex items-center text-brand-orange hover:text-brand-orange-light transition-colors duration-300 group"
        >
          <FaChevronLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Applications
        </Link>
      </div>
    );
  }

  const iconMap = {
    "High Abrasion Resistance": FaShieldAlt,
    "Reduced Maintenance Costs": FaTools,
    "Increased Uptime": FaIndustry,
    "High Impact Toughness": FaShieldAlt,
    "Extended Component Life": FaTools,
    "Operational Reliability": FaIndustry,
    "Sliding Abrasion Protection": FaShieldAlt,
    "Maximized Equipment Life": FaIndustry,
    "Erosion & Abrasion Control": FaShieldAlt,
    "Component Longevity": FaTools,
    "Prevention of Outages": FaIndustry,
    "Improved Throughput": FaIndustry,
  };

  return (
    <>
      <Helmet>
        <title>{`${application.industry} Solutions - CBK Engineers`}</title>
        <meta name="description" content={application.tagline} />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-serif">
        {/* SECTION 1: ENHANCED HERO */}
        <section className="relative h-[70vh] flex items-center justify-center text-center px-4 overflow-hidden">
          <motion.div
            style={{ backgroundImage: `url(${application.image})`, y: yRange }}
            className="absolute inset-0 bg-cover bg-center scale-105"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute top-0 left-0 p-8 z-10">
            <Link
              to="/applications"
              className="inline-flex items-center text-sm backdrop-blur-sm bg-white/10 text-gray-200 hover:text-white mb-4 py-2 px-4 rounded-full transition-all duration-300 group border border-white/20 hover:bg-white/20 mt-20"
            >
              <FaChevronLeft className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              All Industries
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter drop-shadow-2xl">
              {application.industry}
            </h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-200 drop-shadow-lg">
              {application.tagline}
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: STICKY "CHALLENGE & BENEFITS" LAYOUT */}
        <section className="relative py-24 bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16">
            <div className="lg:sticky top-28 h-fit">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
                  The{" "}
                  <span className="text-brand-orange">
                    {application.industry}
                  </span>{" "}
                  Challenge
                </h2>
                <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {application.description}
                </p>
              </motion.div>
            </div>
            <div className="space-y-6">
              {application.atAGlance &&
                application.atAGlance.map((item, i) => {
                  const Icon = iconMap[item.text] || FaTools;
                  return (
                    <BenefitCard
                      key={i}
                      icon={Icon}
                      text={item.text}
                      index={i}
                    />
                  );
                })}
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE ACCORDION FOR APPLICATION AREAS */}
        <section className="py-24 bg-white dark:bg-brand-dark">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-brand-orange dark:text-brand-orange-light"
            >
              Key Application Areas
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="mt-12 border-t border-gray-200 dark:border-gray-700"
            >
              {application.applicationsList &&
                application.applicationsList.map((app, index) => (
                  <ApplicationAccordion key={index} title={app} />
                ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: RECOMMENDED PRODUCTS SHOWCASE */}
        <section className="py-24 bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
              Recommended Grades
            </h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              These products are specifically engineered to provide optimal
              performance and longevity in the {application.industry}{" "}
              environment.
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 },
                },
              }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {application.recommendedProducts &&
                application.recommendedProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={{
                      hidden: { opacity: 0, y: 50, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

// --- Sub-components for a cleaner, more professional structure ---

const BenefitCard = ({ icon: Icon, text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.5 }}
    className="flex items-center space-x-6 bg-white dark:bg-brand-dark p-6 rounded-xl shadow-lg border border-transparent hover:border-brand-orange/50 transition-colors duration-300"
  >
    <div className="flex-shrink-0 bg-brand-light dark:bg-brand-dark-light p-4 rounded-lg">
      <Icon className="text-brand-orange text-3xl" />
    </div>
    <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
      {text}
    </span>
  </motion.div>
);

const ApplicationAccordion = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="border-b border-gray-200 dark:border-gray-700"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left"
      >
        <span className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaPlus
            className={`text-xl transition-colors duration-300 ${
              isOpen ? "text-brand-orange" : "text-gray-400"
            }`}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600 dark:text-gray-400">
              Detailed information about wear solutions for{" "}
              {title.toLowerCase()} would be displayed here, explaining how
              specific CBK grades prevent abrasion and extend component life in
              this area.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ApplicationDetails;
