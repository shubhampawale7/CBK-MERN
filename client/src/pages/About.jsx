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
  return (
    <>
      <Helmet>
        <title>About Us - CBK Engineers</title>
        <meta
          name="description"
          content="Learn about CBK Engineers, our history, our team, our advanced Powder Fusion Welding Process, and our commitment to quality in wear plate manufacturing."
        />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark text-brand-dark-light dark:text-brand-light font-sans">
        {/* Page Header with Banner Image */}
        <div className="relative bg-gray-800 pt-32 pb-20">
          <div className="absolute inset-0">
            <img
              src="/images/factory-exterior.jpg"
              alt="CBK Engineers Facility"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-7xl mx-auto px-4 text-center"
          >
            <h1 className="text-5xl font-bold text-white">
              About CBK ENGINEERS
            </h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-200">
              A leading Wear Plates Manufacturer dedicated to quality and
              precision engineering.
            </p>
          </motion.div>
        </div>

        {/* Manufacturing Process Section (Existing) */}
        <div className="py-20 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white flex items-center space-x-3">
                <FaFlask className="text-brand-orange text-4xl" />
                <span>Our Advanced Manufacturing Process</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Our core expertise lies in the **Powder Fusion Welding
                Process**. This advanced method allows us to create wear plates
                with superior performance characteristics:
              </p>
              <ul className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <FaCheckCircle className="text-brand-orange-light mr-3 mt-1 flex-shrink-0" />
                  Minimum dilution with the base metal.
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-brand-orange-light mr-3 mt-1 flex-shrink-0" />
                  Uniform distribution of carbides.
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-brand-orange-light mr-3 mt-1 flex-shrink-0" />
                  Uniform hardness throughout the thickness.
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="w-full h-80 bg-gray-200 dark:bg-brand-dark-light rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/cbk-workshop.png"
                  alt="CBK Engineers Manufacturing Facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* NEW: Technical Specifications Section */}
        <TechnicalSpecifications />

        {/* NEW: Company Timeline Section */}
        <CompanyTimeline />

        {/* NEW: Meet The Team Section */}
        <MeetTheTeam />

        {/* Get In Touch Section (Existing) */}
        <section className="bg-brand-light dark:bg-brand-dark-light py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold text-center text-gray-800 dark:text-white flex items-center justify-center space-x-3"
            >
              <FaMapMarkerAlt className="text-brand-orange text-4xl" />
              <span>Get In Touch</span>
            </motion.h2>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              <InfoCard
                title="Office Address"
                text="562, Sadashiv Peth, Chitrashala Building, Flat # 218, Pune 411 030. Maharashtra, INDIA."
              />
              <InfoCard
                title="Plant Address"
                text="Jaimalhar Industrial Estate, Plot No. 13, Gat No. 1548, Sonawane Vasti Road, Chikhali, Pune 411062. Maharashtra, INDIA."
              />
              <div className="bg-white dark:bg-brand-dark p-6 rounded-lg shadow-md space-y-4">
                <h3 className="text-xl font-bold text-brand-orange dark:text-brand-orange-light">
                  Contact Details
                </h3>
                <ContactLink
                  icon={FaPhone}
                  href="tel:9028040306"
                  text="9028040306"
                />
                <ContactLink
                  icon={FaWhatsapp}
                  href="https://wa.me/8530302402"
                  text="8530302402"
                />
                <ContactLink
                  icon={FaEnvelope}
                  href="mailto:chinmay562@yahoo.com"
                  text="chinmay562@yahoo.com"
                />
                <ContactLink
                  icon={FaEnvelope}
                  href="mailto:cbk_engineers@yahoo.com"
                  text="cbk_engineers@yahoo.com"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Helper components for cleaner JSX (These remain the same)
const InfoCard = ({ title, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-brand-dark p-6 rounded-lg shadow-md"
  >
    {" "}
    <h3 className="text-xl font-bold text-brand-orange dark:text-brand-orange-light">
      {title}
    </h3>{" "}
    <p className="mt-2 text-gray-600 dark:text-gray-300">{text}</p>{" "}
  </motion.div>
);
const ContactLink = ({ icon: Icon, href, text }) => (
  <div className="flex items-center space-x-3">
    {" "}
    <Icon className="text-gray-500 dark:text-gray-400" />{" "}
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange-light"
    >
      {text}
    </a>{" "}
  </div>
);

export default About;
