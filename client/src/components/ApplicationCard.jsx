// client/src/components/ApplicationCard.jsx
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const ApplicationCard = ({ application, icon: Icon }) => {
  if (!application || !application.industry) {
    return null;
  }

  // Use the application's specific image, with a fallback
  const imageUrl =
    application.image || "/images/industries/default-industry.jpg";

  return (
    <motion.div variants={cardVariants}>
      <NavLink
        to={`/applications/${application._id}`}
        className="group block relative aspect-video md:aspect-[4/3] w-full rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Background Image */}
        <img
          src={imageUrl}
          alt={application.industry}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-all duration-500 group-hover:from-black/90"></div>

        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          {/* Top Section with Icon */}
          <div className="flex justify-end">
            <div className="p-3 bg-white/10 dark:bg-black/20 rounded-xl border border-white/20 backdrop-blur-sm">
              <Icon className="text-2xl text-white" />
            </div>
          </div>

          {/* Main Content */}
          <div>
            <h3 className="text-3xl font-serif font-bold">
              {application.industry}
            </h3>

            {/* Description that fades in on hover */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 font-mono text-sm text-gray-300 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 ease-in-out"
            >
              {application.description}
            </motion.p>

            {/* "View Solutions" link that appears on hover */}
            <div className="flex items-center gap-2 mt-4 font-semibold text-brand-orange-light opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              <span>View Solutions</span>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
};

export default ApplicationCard;
