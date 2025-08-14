// client/src/pages/Applications.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowRight } from "react-icons/fa";

// NEW: Expanded data with descriptions and custom SVGs for each industry.
const staticApplications = [
  {
    _id: "1",
    industry: "Cement Plant",
    description:
      "High-durability solutions for the extreme abrasion and high temperatures found in clinker chutes, cyclones, and mills.",
    details: [
      "Cyclone",
      "Clinker Chute",
      "Transfer Points",
      "Dust Exhaust Fans",
    ],
    link: "/applications/cement-plant",
    svg: (props) => (
      <svg {...props} viewBox="0 0 64 64">
        <path d="M54 34.8V62H10V18h22.8l4-8H10a6 6 0 00-6 6v46h56V30.8l-6 4zM20 62V38h-4v24h4zm8 0V38h-4v24h4zm8 0V38h-4v24h4zm24-52a4 4 0 00-4 4v10h-8V6a4 4 0 00-8 0v18h22a4 4 0 004-4V6a4 4 0 00-4-4z" />
      </svg>
    ),
  },
  {
    _id: "2",
    industry: "Ore Processing",
    description:
      "Robust wear plates designed to handle the severe impact and abrasion of crushers, chutes, and vibratory feeders.",
    details: [
      "Transfer Chutes",
      "Crusher Liners",
      "Screen Plates",
      "Flop Gate Liners",
    ],
    link: "/applications/ore-processing",
    svg: (props) => (
      <svg {...props} viewBox="0 0 64 64">
        <path d="M60 22.4L33.6 48.8a2 2 0 01-2.8 0L4 22.4l14.1-14.2a2 2 0 012.8 0L28 15.3l-4.2 4.2-5.7-5.7L4 28l14.1 14.2 14.2-14.1L25.2 21l4.2-4.2 7.1 7.1L50 10.1l5.7 5.7L48.6 23l4.2 4.2 7.2-7.1z" />
      </svg>
    ),
  },
  {
    _id: "3",
    industry: "Steel",
    description:
      "Engineered to withstand the harsh conditions of sinter plants, blast furnaces, and coke handling systems.",
    details: [
      "Sinter Cooler",
      "Discharge Chute",
      "Blast Furnace Closers",
      "Skip Hoist",
    ],
    link: "/applications/steel",
    svg: (props) => (
      <svg {...props} viewBox="0 0 64 64">
        <path d="M4 14h56v6H4zM16 26h32v6H16zM4 38h56v6H4zM16 50h32v6H16z" />
        <path d="M60 10V4a2 2 0 00-2-2H6a2 2 0 00-2 2v6h2v30H4v14a2 2 0 002 2h52a2 2 0 002-2V48h2V18h-2v-8zm-4 40H8V12h48v38z" />
      </svg>
    ),
  },
  {
    _id: "4",
    industry: "Coal Preparation",
    description:
      "Specialized plates for coal handling equipment, including bin liners, spiral chutes, and plough blades to maximize lifespan.",
    details: [
      "Bin Liners",
      "Spiral Chutes",
      "Washer Pipework",
      "Plough Blades",
    ],
    link: "/applications/coal-preparation",
    svg: (props) => (
      <svg {...props} viewBox="0 0 64 64">
        <path d="M2 32l30 30 30-30-4-4-26 26-26-26-4 4zM32 2L2 32l4 4 26-26 26 26 4-4L32 2z" />
      </svg>
    ),
  },
  {
    _id: "5",
    industry: "Power Plant",
    description:
      "Wear-resistant solutions for critical components in power generation, such as coal mill rings and ash pump impellers.",
    details: [
      "Coal Mill Rings",
      "Scraper Blades",
      "Ash Pump Impellers",
      "Coal Feeders",
    ],
    link: "/applications/power-plant",
    svg: (props) => (
      <svg {...props} viewBox="0 0 64 64">
        <path d="M38 2l-22 30h16l-6 30 30-36H40l-2-26z" />
      </svg>
    ),
  },
];

const Applications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredApplications = staticApplications.filter((app) =>
    app.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Industries We Serve - CBK Engineers</title>
        <meta
          name="description"
          content="CBK Engineers provides specialized wear plate solutions for heavy industries including Cement, Steel, Ore Processing, Power Plants, and Coal Preparation."
        />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-sans">
        <div className="relative bg-gray-900 pt-32 pb-20 text-center">
          <div className="absolute inset-0">
            <img
              src="/images/industries-banner.jpg"
              alt="Industrial machinery collage"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-7xl mx-auto px-4"
          >
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              Solutions by Industry
            </h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-300">
              We provide custom-fabricated wear solutions engineered to meet the
              unique challenges of the world's most demanding industrial
              applications.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 relative max-w-lg mx-auto"
          >
            <input
              type="text"
              placeholder="Search by industry (e.g., Steel, Cement...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-zinc-700 rounded-full bg-white dark:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-orange-light"
            />
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app, index) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={app.link}
                    className="group block bg-brand-light dark:bg-brand-dark-light rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full"
                  >
                    <div className="p-8">
                      <div className="w-20 h-20 bg-white dark:bg-brand-dark rounded-lg flex items-center justify-center shadow-inner">
                        <app.svg className="w-12 h-12 text-brand-orange" />
                      </div>
                      <h3 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">
                        {app.industry}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm min-h-[70px]">
                        {app.description}
                      </p>
                    </div>
                    <div className="px-8 pb-6">
                      <div className="flex items-center justify-between text-brand-orange font-semibold">
                        <span>View Solutions</span>
                        <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-lg text-gray-600 dark:text-gray-400 py-12">
                No applications match your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Applications;
