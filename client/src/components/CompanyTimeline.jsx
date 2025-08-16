// client/src/components/CompanyTimeline.jsx
import { motion } from "framer-motion";
import { FaFlag, FaCogs, FaRocket, FaGlobe } from "react-icons/fa";

// Expanded content for a richer narrative
const timelineEvents = [
  {
    year: "2005",
    title: "Foundation of CBK Engineers",
    description:
      "Our journey began in Pune with a clear mission: to engineer and manufacture superior wear plate solutions for India's core industries.",
    icon: FaFlag,
  },
  {
    year: "2012",
    title: "Advanced Technology Adoption",
    description:
      "We made a pivotal investment in the Powder Fusion Welding Process, revolutionizing our production and setting a new benchmark for quality.",
    icon: FaCogs,
  },
  {
    year: "2018",
    title: "Expansion of Product Line",
    description:
      "Responding to industry needs, we introduced high-performance complex carbide plates like the CBK 14 and CBK 23 for extreme conditions.",
    icon: FaRocket,
  },
  {
    year: "2024",
    title: "Serving a National Clientele",
    description:
      "Today, we are a trusted partner for major industrial plants across the nation, delivering reliability and performance from cement to steel.",
    icon: FaGlobe,
  },
];

const CompanyTimeline = () => {
  return (
    <section className="py-20 font-serif bg-brand-light dark:bg-brand-dark-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
            A Legacy of Innovation
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From our foundation to becoming a national supplier, our journey has
            been driven by a relentless pursuit of quality and engineering
            excellence.
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal Line */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 dark:bg-gray-700"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ originX: 0 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center"
              >
                {/* Dot on the timeline */}
                <div className="w-6 h-6 bg-brand-orange rounded-full z-10 ring-8 ring-brand-light dark:ring-brand-dark-light" />

                {/* Content Card */}
                <div className="mt-6 w-full">
                  <div className="group bg-white dark:bg-brand-dark p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center h-full">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center group-hover:bg-brand-orange transition-colors duration-300">
                        <event.icon className="text-3xl text-brand-orange group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <p className="font-bold text-brand-orange text-2xl">
                      {event.year}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;
