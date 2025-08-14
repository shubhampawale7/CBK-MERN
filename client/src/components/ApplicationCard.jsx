// client/src/components/ApplicationCard.jsx
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// A short, descriptive write-up for each industry.
const industryDescriptions = {
  "Cement Plant":
    "Solutions engineered for extreme abrasion and high temperatures in clinker chutes, cyclones, and mills.",
  "Ore Processing":
    "Robust protection for crushers, chutes, and feeders against severe impact and abrasion.",
  Steel:
    "Durability for the harsh conditions of sinter plants, blast furnaces, and coke handling systems.",
  "Power Plant":
    "Reliable wear resistance for critical components like coal mills, fans, and ash handling systems.",
  "Coal Preparation":
    "Maximizing the lifespan of high-wear equipment including bin liners, spiral chutes, and plough blades.",
};

const ApplicationCard = ({ application, icon: Icon }) => {
  if (!application || !application.industry) {
    return null;
  }

  const urlSlug = application.industry.toLowerCase().replace(/\s+/g, "-");
  const description =
    industryDescriptions[application.industry] ||
    "Key applications for this industry.";

  return (
    <motion.div variants={cardVariants}>
      <NavLink
        to={`/applications/${urlSlug}`}
        // The `group` class is key to the advanced hover effects
        className="group block bg-white dark:bg-brand-dark-light rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
      >
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="patt"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 10h20M10 0v20"
                  stroke="#F58220"
                  strokeWidth="0.5"
                ></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#patt)"></rect>
          </svg>
        </div>

        <div className="relative p-6">
          {/* Top Section (Always Visible) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-brand-orange/10 dark:bg-brand-orange/20 p-3 rounded-lg">
                <Icon className="text-2xl text-brand-orange dark:text-brand-orange-light" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {application.industry}
              </h3>
            </div>
            <FaChevronRight className="text-gray-400 dark:text-gray-500 group-hover:text-brand-orange transition-transform duration-300 transform group-hover:rotate-90" />
          </div>

          {/* Expanded Content (Visible on Hover) */}
          <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {description}
              </p>
              <div className="flex flex-wrap gap-2">
                {application.details.slice(0, 3).map((detail, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    className="bg-gray-200 dark:bg-brand-dark text-gray-700 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {detail}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
};

export default ApplicationCard;
