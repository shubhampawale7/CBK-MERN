// client/src/pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaSpinner,
  FaUserTie,
  FaCogs,
  FaHandshake,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { toast } from "sonner";
import api from "../api"; // Use the central API file

// Fix for default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const plantCoordinates = [18.6738, 73.8315];
  const officeCoordinates = [18.5126, 73.8449];

  return (
    <>
      <Helmet>
        <title>Contact Us - CBK Engineers</title>
        <meta
          name="description"
          content="Partner with CBK Engineers for expert consultation, custom wear plate solutions, and dedicated technical support. Let's build something durable together."
        />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-sans">
        {/* Page Header */}
        <div className="relative bg-gray-900 pt-32 pb-20 text-center">
          <div className="absolute inset-0">
            <img
              src="/images/contact-banner.jpg"
              alt="Engineering blueprints"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-7xl mx-auto px-4"
          >
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              Let's Build Something Durable
            </h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-300">
              Whether you have a specific project in mind or need expert advice
              on wear resistance, our team is ready to assist you.
            </p>
          </motion.div>
        </div>

        {/* "Partner with Us" Section */}
        <section className="py-20 bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
                Partner with the Experts
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Connecting with us means more than just buying a product; it's a
                partnership for performance and reliability.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                icon={FaUserTie}
                title="Expert Consultation"
                description="Leverage our decades of metallurgical expertise to find the perfect wear plate solution for your specific application."
              />
              <ValueCard
                icon={FaCogs}
                title="Custom Fabrication"
                description="We go beyond standard sizes, offering custom cutting, bending, and fabrication to meet your exact engineering requirements."
              />
              <ValueCard
                icon={FaHandshake}
                title="Dedicated Support"
                description="Our commitment doesn't end at delivery. We provide ongoing technical support to ensure you get maximum life from our products."
              />
            </div>
          </div>
        </section>

        {/* Main Content: Details + Form */}
        <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Contact Channels
            </h2>
            <div className="space-y-6">
              <InfoItem
                icon={FaPhone}
                title="General & Sales Inquiries"
                text="9028040306"
                href="tel:9028040306"
              />
              <InfoItem
                icon={FaWhatsapp}
                title="Quick Connect via WhatsApp"
                text="8530302402"
                href="https://wa.me/8530302402"
              />
              <InfoItem
                icon={FaEnvelope}
                title="Project Quotes & Inquiries"
                text="cbk_engineers@yahoo.com"
                href="mailto:cbk_engineers@yahoo.com"
              />
              <InfoItem
                icon={FaMapMarkerAlt}
                title="Office Address"
                text="562, Sadashiv Peth, Chitrashala Building, Flat #218, Pune 411 030."
              />
              <InfoItem
                icon={FaMapMarkerAlt}
                title="Plant Address"
                text="Jaimalhar Industrial Estate, Plot No. 13, Chikhali, Pune 411062."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-light dark:bg-brand-dark-light p-8 rounded-xl shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-orange-light"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-orange-light"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-orange-light"
              />
              <textarea
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-orange-light"
              ></textarea>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-brand-orange text-white font-bold rounded-md shadow-lg hover:bg-brand-orange-dark transition-colors disabled:bg-gray-400"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Submit Inquiry"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Full-width Map Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="h-[500px] w-full"
        >
          <MapContainer
            center={plantCoordinates}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            className="grayscale-[80%] hover:grayscale-0 transition-all duration-500"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={plantCoordinates}>
              <Popup>
                CBK ENGINEERS
                <br />
                Plant Location
              </Popup>
            </Marker>
            <Marker position={officeCoordinates}>
              <Popup>
                CBK ENGINEERS
                <br />
                Office Location
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </>
  );
};

// Helper components for cleaner JSX
const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-brand-dark p-8 rounded-lg shadow-lg text-center hover:-translate-y-2 transition-transform"
  >
    <Icon className="text-4xl text-brand-orange mx-auto mb-4" />
    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
    <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

const InfoItem = ({ icon: Icon, title, text, href }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 bg-brand-orange/10 p-3 rounded-full">
      <Icon className="text-xl text-brand-orange" />
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
          className="text-gray-600 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange-light transition-colors"
        >
          {text}
        </a>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">{text}</p>
      )}
    </div>
  </div>
);

export default Contact;
