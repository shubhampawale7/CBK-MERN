// client/src/pages/ApplicationDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaChevronLeft,
  FaIndustry,
  FaShieldAlt,
  FaTools,
  FaSpinner,
  FaCheck,
} from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import api from "../api";

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Parallax scroll effect for the hero image
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

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
        <FaSpinner className="animate-spin text-4xl text-brand-orange" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-20 bg-white dark:bg-brand-dark min-h-screen">
        <h2 className="text-2xl font-bold">Application Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">
          The application you are looking for does not exist.
        </p>
        <Link
          to="/applications"
          className="mt-4 inline-block text-brand-orange hover:underline"
        >
          &larr; Back to Applications
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
        <title>{application.industry} - CBK Engineers</title>
        <meta name="description" content={application.description} />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-sans">
        {/* Hero Section */}
        <div className="relative h-[60vh] bg-gray-900 flex items-center justify-center text-center px-4 overflow-hidden">
          <motion.div
            style={{ backgroundImage: `url(${application.image})`, y: yRange }}
            className="absolute inset-0 bg-cover bg-center"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Link
              to="/applications"
              className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-4"
            >
              <FaChevronLeft className="mr-2" />
              Back to Applications
            </Link>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
              {application.industry}
            </h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-200 drop-shadow-lg">
              {application.tagline}
            </p>
          </motion.div>
        </div>

        {/* Introduction & At a Glance */}
        <section className="py-20 bg-brand-light dark:bg-brand-dark-light">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="pr-8">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white leading-tight">
                The{" "}
                <span className="text-brand-orange">
                  {application.industry}
                </span>{" "}
                Challenge
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                {application.description}
              </p>
            </div>
            <div className="space-y-4">
              {application.atAGlance &&
                application.atAGlance.map((item, i) => {
                  const Icon = iconMap[item.text] || FaTools;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-center space-x-4 bg-white dark:bg-brand-dark p-4 rounded-lg shadow-md"
                    >
                      <Icon className="text-brand-orange text-3xl flex-shrink-0" />
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {item.text}
                      </span>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        </section>

        {/* Common Use Cases Grid */}
        <section className="py-20 bg-white dark:bg-brand-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light"
            >
              Key Application Areas
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {application.applicationsList &&
                application.applicationsList.map((app, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="group relative bg-brand-light dark:bg-brand-dark-light p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {app}
                    </p>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </section>

        {/* Recommended Products Section */}
        <section className="py-20 bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
              Recommended Products for {application.industry}
            </h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              These grades are specifically engineered to provide optimal
              performance and longevity in this demanding environment.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {application.recommendedProducts &&
                application.recommendedProducts.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand-dark">
          <div className="max-w-7xl mx-auto text-center py-16 px-4">
            <h2 className="text-3xl font-bold text-white">
              Optimize Your Operations
            </h2>
            <p className="mt-2 text-lg text-gray-300">
              Contact us to discuss your specific needs for the{" "}
              {application.industry}.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-brand-orange text-white font-bold rounded-full shadow-lg"
              >
                Request a Quote
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApplicationDetails;
