// client/src/components/Testimonials.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

// The same data, but without the image property.
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

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % testimonialsData.length
        );
      }
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [isHovering]);

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section
      className="py-20 bg-brand-light dark:bg-brand-dark"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <FaQuoteLeft className="text-brand-orange text-5xl mx-auto mb-6" />

        <div className="relative h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full flex flex-col items-center"
            >
              <p className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-200">
                "{currentTestimonial.quote}"
              </p>
              <div className="mt-6">
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  {currentTestimonial.name}
                </p>
                <p className="text-sm text-gray-500">
                  {currentTestimonial.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-brand-orange scale-125"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
