// client/src/pages/About.jsx
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaFlask,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

// Import the new components
import TechnicalSpecifications from "../components/TechnicalSpecifications";
import CompanyTimeline from "../components/CompanyTimeline";
import MeetTheTeam from "../components/MeetTheTeam";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <>
      <Helmet>
        <title>About Us - CBK Engineers</title>
        <meta
          name="description"
          content="Learn about CBK Engineers, our history, our team, our advanced Powder Fusion Welding Process, and our commitment to quality."
        />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark text-brand-dark-light dark:text-gray-300 font-serif">
        {/* SECTION 1: HERO */}
        <section className="relative h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark">
            <img
              src="/images/factory-exterior.jpg"
              alt="CBK Engineers Facility"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent z-10"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-20"
          >
            <h1 className="text-5xl font-serif md:text-7xl font-extrabold text-white tracking-tighter">
              Engineering{" "}
              <span className="text-brand-orange-light">Excellence</span>
            </h1>
            <p className="mt-4 font-mono text-xl max-w-3xl mx-auto text-gray-200">
              A leading Wear Plates Manufacturer dedicated to quality and
              precision engineering.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: MANUFACTURING PROCESS */}
        <section className="py-24  bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl font-serif mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-4">
                <FaFlask className="text-brand-orange" />
                <span>Our Advanced Process</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                Our core expertise lies in the{" "}
                <strong className="text-brand-orange">
                  Powder Fusion Welding Process
                </strong>
                . This advanced method allows us to create wear plates with
                superior performance characteristics:
              </p>
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 space-y-4"
              >
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-brand-orange">
                      Minimum dilution
                    </strong>{" "}
                    with the base metal, ensuring maximum hardness.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-brand-orange">
                      Uniform distribution
                    </strong>{" "}
                    of carbides for consistent wear resistance.
                  </span>
                </motion.li>
                <motion.li
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-brand-orange">
                      Consistent hardness
                    </strong>{" "}
                    throughout the overlay thickness for longer life.
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/cbk-workshop.png"
                  alt="CBK Engineers Manufacturing Facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Imported Components Sections */}
        <TechnicalSpecifications />
        <CompanyTimeline />
        <MeetTheTeam />

        {/* SECTION 3: "GET IN TOUCH" CTA */}
        <section className="bg-white dark:bg-brand-dark py-24">
          <div className="max-w-7xl font-serif mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-brand-dark-light dark:bg-brand-dark rounded-2xl p-12 text-center grid lg:grid-cols-3 gap-8 items-center"
            >
              <div className="lg:col-span-2 text-left">
                <h2 className="text-4xl font-bold text-white">
                  Partner with the Experts
                </h2>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl">
                  Ready to enhance the lifespan and performance of your critical
                  equipment? Contact our team today for a personalized
                  consultation.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <ContactButton
                  icon={FaPhone}
                  href="tel:9028040306"
                  text="Call Us"
                />
                <ContactButton
                  icon={FaWhatsapp}
                  href="https://wa.me/8530302402"
                  text="WhatsApp"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

const ContactButton = ({ icon: Icon, href, text }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center justify-center gap-3 w-full p-4 bg-brand-orange text-white font-bold rounded-xl shadow-lg hover:bg-brand-orange-dark transition-colors"
  >
    <Icon size={20} />
    <span>{text}</span>
  </motion.a>
);

export default About;
