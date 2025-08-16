// client/src/components/Testimonials.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

// --- Testimonial Data (Unchanged) ---
const testimonialsData = [
  {
    quote:
      "The CBK 14 wear plates have drastically reduced our maintenance downtime. The durability is unmatched in the industry.",
    name: "Rajesh Kumar",
    company: "Chief Engineer, Apex Cement",
  },
  {
    quote:
      "Their performance and lifespan have exceeded all our expectations. The team's technical support is also top-notch.",
    name: "Priya Singh",
    company: "Operations Manager, HIND Minerals",
  },
  {
    quote:
      "The quality is consistent, and the plates withstand extreme conditions perfectly. A truly reliable partner.",
    name: "Anil Mehta",
    company: "Maintenance Head, Shakti Power Ltd.",
  },
];

// --- Animation Variants for the slide effect ---
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const Testimonials = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);

  const paginate = (newDirection) => {
    const newIndex =
      (page + newDirection + testimonialsData.length) % testimonialsData.length;
    setPage([newIndex, newDirection]);
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        paginate(1);
      }
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, [isHovering, page]);

  const currentTestimonial = testimonialsData[page];

  return (
    <section
      className="py-24 bg-brand-light dark:bg-brand-dark overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-serif font-bold text-brand-orange dark:text-brand-orange-light mb-12"
        >
          Trusted by Industry Leaders
        </motion.h2>

        <div className="relative h-64 md:h-56 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full max-w-2xl"
            >
              <div className="bg-white dark:bg-brand-dark-light rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">
                <FaQuoteLeft className="text-brand-orange text-3xl mb-4" />
                <p className="text-xl italic text-gray-700 dark:text-gray-200">
                  "{currentTestimonial.quote}"
                </p>
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="font-bold text-lg text-gray-900 dark:text-white">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-12">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setPage([index, index > page ? 1 : -1])}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${
                  page === index
                    ? "bg-brand-orange scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }
              `}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
