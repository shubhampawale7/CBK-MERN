// client/src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Assuming this is your 3D tilt card
import ApplicationCard from "../components/ApplicationCard"; // Assuming this is your redesigned card
import Testimonials from "../components/Testimonials";
import FixingMethods from "../components/FixingMethods";
import SpecificationsOverview from "../components/SpecificationsOverview";
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
  FaSpinner,
} from "react-icons/fa";
import api from "../api";

const iconMap = {
  "Cement Plant": FaBuilding,
  "Ore Processing": FaHardHat,
  Steel: FaTools,
  "Power Plant": FaBolt,
  "Coal Preparation": FaIndustry,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Hooks for Parallax Hero ---
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(
    springMouseY,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"]
  );
  const rotateY = useTransform(
    springMouseX,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"]
  );

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      heroRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [productsRes, applicationsRes] = await Promise.all([
          api.get("/api/products"),
          api.get("/api/applications"),
        ]);
        setFeaturedProducts(productsRes.data.slice(0, 4));
        setIndustries(applicationsRes.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <>
      <Helmet>
        <title>CBK Engineers - High-Performance Wear Plates Manufacturer</title>
        <meta
          name="description"
          content="CBK Engineers is a leading wear plates manufacturer specializing in a wide range of abrasion and impact resistant plates."
        />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-serif">
        {/* SECTION 1: INTERACTIVE PARALLAX HERO */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-screen flex items-center justify-center text-center overflow-hidden [perspective:1000px]"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
            poster="/images/cbk-hero-background.jpg"
          >
            <source src="/videos/welding-overlay.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative z-20 px-4"
          >
            <h1 className="text-5xl font-serif md:text-7xl font-extrabold text-white tracking-tighter">
              Engineered for{" "}
              <span className="text-brand-orange-light">Endurance</span>
            </h1>
            <p className="mt-6 font-mono text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              We are a premier manufacturer of high-performance wear plates,
              providing custom solutions to combat extreme abrasion and impact
              in heavy industries.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white font-bold rounded-full"
                >
                  Request a Quote
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: WHY CBK ENGINEERS? with 3D CARDS */}
        <section className="py-24 font-serif bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif font-bold text-gray-800 dark:text-white">
              Why CBK Engineers?
            </h2>
            <p className="mt-4  text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our singular focus is on delivering wear plate solutions that
              enhance performance, reduce downtime, and provide exceptional
              value through superior engineering.
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 font-serif gap-8 [perspective:1200px]"
            >
              <ValuePropCard
                icon={FaUserTie}
                title="Metallurgical Expertise"
                description="Deep metallurgical knowledge to ensure the ideal alloy composition for your challenges."
              />
              <ValuePropCard
                icon={FaAward}
                title="Uncompromising Quality"
                description="Advanced Powder Fusion Welding for uniform hardness and superior lifespan."
              />
              <ValuePropCard
                icon={FaCogs}
                title="Custom Fabrication"
                description="Plates fabricated to your exact specifications, including custom sizes, shapes, and fixing methods."
              />
              <ValuePropCard
                icon={FaHandshake}
                title="Solution Partnership"
                description="We work with you to understand your challenges, providing tailored solutions that deliver long-term value."
              />
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: FEATURED PRODUCTS with SCROLL-REVEAL ANIMATION */}
        <section className="py-24 bg-white dark:bg-brand-dark">
          <div className="max-w-7xl font-serif mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-brand-orange font-serif dark:text-brand-orange-light">
              Featured Wear Plate Grades
            </h2>
            {loading ? (
              <div className="flex justify-center mt-12">
                {" "}
                <FaSpinner className="animate-spin text-4xl text-brand-orange" />{" "}
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {featuredProducts.map((product) => (
                  <motion.div variants={itemVariants} key={product._id}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
            <div className="mt-16 text-center">
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 text-brand-orange font-semibold text-lg hover:underline"
              >
                <span>View All Product Grades</span>
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <SpecificationsOverview />
        <FixingMethods />

        {/* SECTION 4: INDUSTRIES WE SERVE */}
        <section className="py-24 bg-white dark:bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif font-bold text-brand-orange dark:text-brand-orange-light">
              Industries We Serve
            </h2>
            <p className="mt-4 font-serif text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              From the intense heat of steel mills to the abrasive force of ore
              processing, our wear plates are proven to perform in the most
              demanding environments.
            </p>
            {loading ? (
              <div className="flex justify-center mt-12">
                <FaSpinner className="animate-spin text-4xl text-brand-orange" />
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {industries.map((app) => (
                  <motion.div variants={itemVariants} key={app._id}>
                    <ApplicationCard
                      application={app}
                      icon={iconMap[app.industry] || FaIndustry}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
            <div className="mt-16 text-center">
              <Link
                to="/applications"
                className="group inline-flex items-center gap-2 text-brand-orange font-semibold text-lg hover:underline"
              >
                <span>Explore All Applications</span>
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <Testimonials />
        {/* The Final CTA remains the same as the previous good design */}
      </div>
    </>
  );
};

// --- Helper Components ---
const ValuePropCard = ({ icon: Icon, title, description }) => {
  // Hooks for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(springMouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springMouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      variants={itemVariants}
      className="relative p-8 bg-white dark:bg-brand-dark rounded-xl shadow-lg text-center"
    >
      <div style={{ transform: "translateZ(20px)" }}>
        <div className="inline-block p-5 bg-brand-light dark:bg-brand-dark-light rounded-full mb-6">
          <Icon className="text-4xl text-brand-orange" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default Home;
