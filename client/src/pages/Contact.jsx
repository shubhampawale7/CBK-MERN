// client/src/pages/Contact.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaSpinner,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { toast } from "sonner";
import api from "../api";

// --- Leaflet Icon Fix (No change) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// --- Custom Animated SVG Icons ---
const SvgConsultation = () => (
  <motion.svg
    whileHover={{ scale: 1.1, rotate: 3 }}
    transition={{ type: "spring", stiffness: 300 }}
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M12 12v0M12 8v0M12 16v0"></path>
  </motion.svg>
);
const SvgFabrication = () => (
  <motion.svg
    whileHover={{ scale: 1.1, rotate: 3 }}
    transition={{ type: "spring", stiffness: 300 }}
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <circle cx="12" cy="15" r="3"></circle>
  </motion.svg>
);
const SvgSupport = () => (
  <motion.svg
    whileHover={{ scale: 1.1, rotate: 3 }}
    transition={{ type: "spring", stiffness: 300 }}
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
    <line x1="6" y1="1" x2="6" y2="4"></line>
    <line x1="10" y1="1" x2="10" y2="4"></line>
    <line x1="14" y1="1" x2="14" y2="4"></line>
  </motion.svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/api/contact", formData);
      toast.success(response.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const plantCoordinates = [18.6738, 73.8315];
  const officeCoordinates = [18.5126, 73.8449];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
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
        <title>Contact Us - CBK Engineers</title>
        <meta
          name="description"
          content="Partner with CBK Engineers for expert consultation, custom wear plate solutions, and dedicated technical support."
        />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-serif">
        {/* SECTION 1: HERO */}
        <section className="relative bg-brand-dark text-white pt-40 pb-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-brand-dark z-10"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-20"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
              Let's Build Something{" "}
              <span className="text-brand-orange-light">Durable</span>
            </h1>
            <p className="mt-4 font-mono text-xl max-w-3xl mx-auto text-gray-300">
              Whether you have a specific project in mind or need expert advice
              on wear resistance, our team is ready to assist you.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: COMMITMENT CARDS */}
        <section className="py-24 bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <ValueCard
                icon={<SvgConsultation />}
                title="Expert Consultation"
                description="Leverage our decades of metallurgical expertise to find the perfect solution for your specific application."
              />
              <ValueCard
                icon={<SvgFabrication />}
                title="Custom Fabrication"
                description="We go beyond standard sizes, offering custom cutting, bending, and fabrication to meet your exact engineering requirements."
              />
              <ValueCard
                icon={<SvgSupport />}
                title="Dedicated Support"
                description="Our commitment doesn't end at delivery. We provide ongoing technical support to ensure you get maximum life from our products."
              />
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: CONTACT FORM & DETAILS */}
        <section className="py-24 bg-white dark:bg-brand-dark">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We'll get back to you within one business day.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormInput
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormInput
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <FormTextarea
                  name="message"
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleChange}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-brand-orange text-white text-lg font-bold rounded-xl shadow-lg hover:bg-brand-orange-dark transition-all duration-300 disabled:bg-gray-400 disabled:shadow-none"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    "Submit Inquiry"
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Right Side: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
                Contact Channels
              </h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <InfoItem
                  icon={FaPhone}
                  title="Sales & Inquiries"
                  text="9028040306"
                  href="tel:9028040306"
                />
                <InfoItem
                  icon={FaWhatsapp}
                  title="Quick Connect"
                  text="8530302402"
                  href="https://wa.me/8530302402"
                />
                <InfoItem
                  icon={FaEnvelope}
                  title="Project Quotes"
                  text="cbk_engineers@yahoo.com"
                  href="mailto:cbk_engineers@yahoo.com"
                />
                <InfoItem
                  icon={FaMapMarkerAlt}
                  title="Office"
                  text="562, Sadashiv Peth, Chitrashala Building, Flat #218, Pune 411 030."
                />
                <InfoItem
                  icon={FaMapMarkerAlt}
                  title="Plant"
                  text="Jaimalhar Industrial Estate, Plot No. 13, Chikhali, Pune 411062."
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: MAP */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="h-[500px] w-full"
        >
          <MapContainer
            center={plantCoordinates}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            className="grayscale-[100%] hover:grayscale-0 transition-all duration-500"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={plantCoordinates}>
              <Popup>
                CBK ENGINEERS <br /> Plant Location
              </Popup>
            </Marker>
            <Marker position={officeCoordinates}>
              <Popup>
                CBK ENGINEERS <br /> Office Location
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </>
  );
};

// --- Sub-components for a cleaner, more professional structure ---

const ValueCard = ({ icon, title, description }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { type: "spring" } },
    }}
    className="relative bg-white dark:bg-brand-dark p-8 rounded-2xl shadow-lg text-center overflow-hidden border border-gray-200 dark:border-gray-800"
  >
    <div className="relative z-10">
      <div className="mx-auto mb-4 text-brand-orange">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </motion.div>
);

const InfoItem = ({ icon: Icon, title, text, href }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
    className="flex items-start space-x-6"
  >
    <div className="flex-shrink-0 bg-brand-light dark:bg-brand-dark-light p-4 rounded-full">
      <Icon className="text-2xl text-brand-orange" />
    </div>
    <div>
      <h3 className="font-bold text-lg text-gray-800 dark:text-white">
        {title}
      </h3>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange-light transition-colors duration-300"
        >
          {text}
        </a>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">{text}</p>
      )}
    </div>
  </motion.div>
);

// Form inputs with floating labels for a modern feel
const FormInput = ({ name, type, placeholder, ...props }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      id={name}
      {...props}
      className="block w-full px-4 py-3 rounded-lg border-2 bg-transparent peer
                 border-gray-300 dark:border-gray-600 
                 text-gray-800 dark:text-white
                 focus:outline-none focus:ring-0 focus:border-brand-orange"
      placeholder=" "
    />
    <label
      htmlFor={name}
      className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]
                 bg-white dark:bg-brand-dark px-2
                 text-gray-500 dark:text-gray-400
                 peer-focus:px-2 peer-focus:text-brand-orange peer-focus:dark:text-brand-orange
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2
                 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
                 left-2"
    >
      {placeholder}
    </label>
  </div>
);

const FormTextarea = ({ name, placeholder, ...props }) => (
  <div className="relative">
    <textarea
      name={name}
      id={name}
      {...props}
      rows="4"
      className="block w-full px-4 py-3 rounded-lg border-2 bg-transparent peer
                 border-gray-300 dark:border-gray-600 
                 text-gray-800 dark:text-white
                 focus:outline-none focus:ring-0 focus:border-brand-orange"
      placeholder=" "
    />
    <label
      htmlFor={name}
      className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]
                 bg-white dark:bg-brand-dark px-2
                 text-gray-500 dark:text-gray-400
                 peer-focus:px-2 peer-focus:text-brand-orange peer-focus:dark:text-brand-orange
                 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-7
                 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4
                 left-2"
    >
      {placeholder}
    </label>
  </div>
);

export default Contact;
