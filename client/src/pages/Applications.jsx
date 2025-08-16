// client/src/pages/Applications.jsx
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowRight, FaSpinner, FaTimes } from "react-icons/fa";
import api from "../api";

// --- SVG Icons (No change) ---
const svgMap = {
  "Cement Plant": (props) => (
    <svg {...props} viewBox="0 0 64 64">
      {" "}
      <path d="M54 34.8V62H10V18h22.8l4-8H10a6 6 0 00-6 6v46h56V30.8l-6 4zM20 62V38h-4v24h4zm8 0V38h-4v24h4zm8 0V38h-4v24h4zm24-52a4 4 0 00-4 4v10h-8V6a4 4 0 00-8 0v18h22a4 4 0 004-4V6a4 4 0 00-4-4z" />{" "}
    </svg>
  ),
  "Ore Processing": (props) => (
    <svg {...props} viewBox="0 0 64 64">
      {" "}
      <path d="M60 22.4L33.6 48.8a2 2 0 01-2.8 0L4 22.4l14.1-14.2a2 2 0 012.8 0L28 15.3l-4.2 4.2-5.7-5.7L4 28l14.1 14.2 14.2-14.1L25.2 21l4.2-4.2 7.1 7.1L50 10.1l5.7 5.7L48.6 23l4.2 4.2 7.2-7.1z" />{" "}
    </svg>
  ),
  Steel: (props) => (
    <svg {...props} viewBox="0 0 64 64">
      {" "}
      <path d="M4 14h56v6H4zM16 26h32v6H16zM4 38h56v6H4zM16 50h32v6H16z" />{" "}
      <path d="M60 10V4a2 2 0 00-2-2H6a2 2 0 00-2 2v6h2v30H4v14a2 2 0 002 2h52a2 2 0 002-2V48h2V18h-2v-8zm-4 40H8V12h48v38z" />{" "}
    </svg>
  ),
  "Coal Preparation": (props) => (
    <svg {...props} viewBox="0 0 64 64">
      {" "}
      <path d="M2 32l30 30 30-30-4-4-26 26-26-26-4 4zM32 2L2 32l4 4 26-26 26 26 4-4L32 2z" />{" "}
    </svg>
  ),
  "Power Plant": (props) => (
    <svg {...props} viewBox="0 0 64 64">
      {" "}
      <path d="M38 2l-22 30h16l-6 30 30-36H40l-2-26z" />{" "}
    </svg>
  ),
};

// --- Image map for card backgrounds (Names are unchanged) ---
const imageMap = {
  "Cement Plant": "/images/applications/cement.jpg",
  "Ore Processing": "/images/applications/ore-banner.jpg",
  Steel: "/images/applications/steel.jpg",
  "Coal Preparation": "/images/applications/coal.jpg",
  "Power Plant": "/images/applications/power.jpg",
};

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get("/api/applications");
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) =>
    app.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Industries We Serve - CBK Engineers</title>
        <meta
          name="description"
          content="CBK provides specialized wear plate solutions for heavy industries including Cement, Steel, Ore Processing, Power Plants, and Coal Preparation."
        />
      </Helmet>
      <div className="font-serif bg-brand-light dark:bg-brand-dark">
        {/* SECTION 1: HERO & INTEGRATED SEARCH */}
        <section className="relative font-serif pt-40 pb-24 text-center overflow-hidden bg-white dark:bg-brand-dark">
          <div className="absolute inset-0 bg-grid-pattern opacity-0 dark:opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-light dark:to-brand-dark z-10"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative max-w-7xl mx-auto px-4 z-20"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
              Solutions by{" "}
              <span className="text-brand-orange">Application</span>
            </h1>
            <p className="mt-4 font-mono text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              We provide custom-fabricated wear solutions engineered to meet the
              unique challenges of the world's most demanding industrial
              applications.
            </p>
            <div className="mt-12 max-w-xl mx-auto">
              <SearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: "SPOTLIGHT" CARD LAYOUT */}
        <main className="max-w-6xl mx-auto px-4 py-24">
          {loading ? (
            <div className="flex f justify-center items-center h-64">
              <FaSpinner className="animate-spin text-5xl text-brand-orange" />
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              <AnimatePresence>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <SpotlightCard key={app._id} app={app} />
                  ))
                ) : (
                  <NoResultsFound searchQuery={searchQuery} />
                )}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

// --- Sub-components for a cleaner, more professional structure ---

const SearchInput = ({ searchQuery, setSearchQuery }) => (
  <div className="relative">
    <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
    <input
      type="text"
      placeholder="Search by industry (e.g., Steel...)"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-14 pr-12 py-4 text-lg border-2 rounded-full transition-all duration-300
                 border-gray-300 dark:border-gray-700 
                 bg-white dark:bg-brand-dark-light
                 text-gray-800 dark:text-white
                 placeholder-gray-500
                 focus:outline-none focus:ring-4 focus:ring-brand-orange/50 focus:border-brand-orange"
    />
    {searchQuery && (
      <button
        onClick={() => setSearchQuery("")}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        <FaTimes />
      </button>
    )}
  </div>
);

const SpotlightCard = ({ app }) => {
  const SvgComponent = svgMap[app.industry] || "div";
  const bgImage = imageMap[app.industry] || "";

  // Ref for the card to trigger scroll animations
  const ref = useRef(null);

  // Parallax scroll effect for the background image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Animate from when the top of the card hits the bottom of the screen to when the bottom of the card leaves the top.
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]); // Move image from -20% to 20% vertically

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
    >
      <Link
        to={`/applications/${app._id}`}
        className="group block relative aspect-video md:aspect-[2.5/1] w-full rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Parallax Background Image */}
        <motion.img
          src={bgImage}
          alt={app.industry}
          style={{ y }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

        <div className="relative h-full flex flex-col justify-between p-8 md:p-12">
          {/* Top content: Icon & Title */}
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 w-20 h-20 bg-white/10 dark:bg-black/20 rounded-xl border border-white/20 backdrop-blur-sm p-4">
              <SvgComponent className="w-full h-full text-brand-orange drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <h3 className="text-3xl font-serif md:text-4xl font-extrabold text-white">
                {app.industry}
              </h3>
            </div>
          </div>

          {/* Bottom content: Description & CTA */}
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <p className="text-gray-300 font-mono text-base md:text-lg max-w-md leading-relaxed">
              {app.description}
            </p>
            <div className="flex justify-start md:justify-end">
              <div className="flex items-center font-semibold text-lg text-white bg-brand-orange px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-brand-orange/30">
                <span>View Solutions</span>
                <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const NoResultsFound = ({ searchQuery }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-center py-24"
  >
    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
      No Industries Found
    </h3>
    <p className="mt-2 text-gray-500 max-w-md mx-auto">
      Your search for "{searchQuery}" did not match any of our served
      industries.
    </p>
  </motion.div>
);

export default Applications;
