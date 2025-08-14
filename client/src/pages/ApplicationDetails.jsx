// client/src/pages/ApplicationDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaChevronLeft,
  FaIndustry,
  FaShieldAlt,
  FaTools,
} from "react-icons/fa";
import ProductCard from "../components/ProductCard";

// The complete static database for all 5 industries, powered by your brochure.
const applicationDatabase = {
  "cement-plant": {
    industry: "Cement Plant",
    tagline: "Durability in the Dust: Wear Solutions for Cement Production.",
    description:
      "The cement industry presents extreme challenges with high abrasion from clinker and high temperatures in kilns and coolers. Our wear plates are engineered to maximize the lifespan of critical components, reducing costly downtime.",
    image: "/images/applications/cement.jpg",
    atAGlance: [
      { icon: FaShieldAlt, text: "High Abrasion Resistance" },
      { icon: FaTools, text: "Reduced Maintenance Costs" },
      { icon: FaIndustry, text: "Increased Uptime" },
    ],
    applicationsList: [
      "Clinker Chutes",
      "Cyclones",
      "Dust Exhaust Fans",
      "Ball Mill Inlets & Outlets",
      "Air Chamber Rings",
      "Shifters & Shifter Blades",
      "Transfer Points",
      "Silo Outlets",
    ],
    recommendedProducts: [
      {
        name: "CBK 5S",
        description: "Excellent for fans in high-temperature environments.",
        hardness: "58-62 Rc",
      },
      {
        name: "CBK 14",
        description: "Complex carbides for severe conditions up to 600°C.",
        hardness: "60-64 Rc",
      },
      {
        name: "CBK 23",
        description: "Handles extreme abrasion and temperatures up to 750°C.",
        hardness: "60-65 Rc",
      },
    ],
  },
  "ore-processing": {
    industry: "Ore Processing",
    tagline: "Strength Against the Stone: Fortifying Ore Processing Equipment.",
    description:
      "From crushing to conveying, ore processing involves constant, severe impact and abrasion. Our wear plates provide robust protection for chutes, crushers, and feeders, ensuring continuous operation.",
    image: "/images/applications/ore-banner.jpg",
    atAGlance: [
      { icon: FaShieldAlt, text: "High Impact Toughness" },
      { icon: FaTools, text: "Extended Component Life" },
      { icon: FaIndustry, text: "Improved Throughput" },
    ],
    applicationsList: [
      "Transfer Chutes",
      "Skirt Liners",
      "Bin Liners (Surge, Hopper, Reject)",
      "Reclaimer Liners",
      "Vibratory Feeder Liners",
      "Flop Gate Liners",
      "Crusher Liners",
      "Screen Plates",
    ],
    recommendedProducts: [
      {
        name: "CBK Ti",
        description:
          "Titanium carbide composition for superior impact resistance.",
        hardness: "56-58 Rc",
      },
      {
        name: "CBK 1",
        description: "A workhorse for heavy abrasion with moderate impact.",
        hardness: "58-62 Rc",
      },
      {
        name: "CBK V CARB",
        description:
          "Ideal for extreme sliding abrasion in feeders and chutes.",
        hardness: "62-64 Rc",
      },
    ],
  },
  steel: {
    industry: "Steel",
    tagline: "Forged for Fire: Wear Plates for Steel Manufacturing.",
    description:
      "Steel production involves intense heat and abrasive materials. Our plates protect critical equipment like sinter coolers, discharge chutes, and blast furnace components from premature wear.",
    image: "/images/applications/steel.jpg",
    atAGlance: [
      { icon: FaShieldAlt, text: "High Temperature Resistance" },
      { icon: FaTools, text: "Protection for Critical Machinery" },
      { icon: FaIndustry, text: "Operational Reliability" },
    ],
    applicationsList: [
      "Hot Screen",
      "Sinter Cooler",
      "Discharge Chute",
      "Dedusting Van",
      "Skip Hoist",
      "Blast Furnace Closers",
      "Distribution Chute",
      "Vibratory Feeders",
    ],
    recommendedProducts: [
      {
        name: "CBK 14",
        description: "Withstands severe abrasion at temperatures up to 600°C.",
        hardness: "60-64 Rc",
      },
      {
        name: "CBK 23",
        description: "Our premium grade for extreme heat and wear up to 750°C.",
        hardness: "60-65 Rc",
      },
      {
        name: "CBK W CARB",
        description:
          "Tungsten carbide for ultimate resistance in high-wear zones.",
        hardness: "60-65 Rc",
      },
    ],
  },
  "coal-preparation": {
    industry: "Coal Preparation",
    tagline: "Engineered for Endurance: Solutions for Coal Handling.",
    description:
      "Coal handling is a high-volume, high-abrasion process. We provide durable linings for chutes, bins, and crushers to keep operations running smoothly and efficiently.",
    image: "/images/applications/coal.jpg",
    atAGlance: [
      { icon: FaShieldAlt, text: "Sliding Abrasion Protection" },
      { icon: FaTools, text: "Reduced Material Buildup" },
      { icon: FaIndustry, text: "Maximized Equipment Life" },
    ],
    applicationsList: [
      "Transfer Chutes",
      "Bin Liners",
      "Deflector Liners",
      "Flop Gate Liners",
      "Plough Blades",
      "Crusher Liners",
      "Spiral Chutes",
      "Washer Pipework",
    ],
    recommendedProducts: [
      {
        name: "CBK STD",
        description:
          "An excellent standard choice for general abrasion resistance.",
        hardness: "58-60 Rc",
      },
      {
        name: "CBK 1 Plus",
        description:
          "Enhanced carbides for severe abrasion in high-flow areas.",
        hardness: "58-62 Rc",
      },
      {
        name: "CBK V CARB",
        description:
          "Designed specifically to combat extreme sliding abrasion.",
        hardness: "62-64 Rc",
      },
    ],
  },
  "power-plant": {
    industry: "Power Plant",
    tagline: "Powering Through Wear: Reliability for Power Generation.",
    description:
      "In power plants, equipment reliability is paramount. Our wear plates protect vital components like coal mills, fans, and ash handling systems from abrasive wear, ensuring consistent energy production.",
    image: "/images/applications/power.jpg",
    atAGlance: [
      { icon: FaShieldAlt, text: "Erosion & Abrasion Control" },
      { icon: FaTools, text: "Component Longevity" },
      { icon: FaIndustry, text: "Prevention of Outages" },
    ],
    applicationsList: [
      "I.D. Fan / P.A. Fan",
      "Coal Mill Wear Plates",
      "Coal Feeders",
      "Scraper Blades",
      "Ash Pump Impellers & Casings",
      "Coal Handling Plant Chutes",
      "Coal Mill Bends",
    ],
    recommendedProducts: [
      {
        name: "CBK 5S",
        description:
          "The premier choice for high-temperature fan blades and casings.",
        hardness: "58-62 Rc",
      },
      {
        name: "CBK B CARB",
        description:
          "Boron carbide composition for extreme abrasion in coal mills.",
        hardness: "61-64 Rc",
      },
      {
        name: "CBK 1",
        description:
          "A versatile solution for chutes and feeders in the coal handling plant.",
        hardness: "58-62 Rc",
      },
    ],
  },
};

const ApplicationDetails = () => {
  const { name } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    setApplication(applicationDatabase[name]);
  }, [name]);

  if (!application) {
    return (
      <div className="text-center py-20 bg-white dark:bg-brand-dark min-h-screen">
        <p className="text-gray-600 dark:text-gray-400">
          Application not found.
        </p>
        <Link
          to="/applications"
          className="mt-4 inline-block text-brand-orange hover:underline"
        >
          &larr; Back to Applications
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{application.industry} - CBK Engineers</title>
        <meta name="description" content={application.description} />
      </Helmet>
      <div className="bg-white dark:bg-brand-dark font-sans">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-gray-800 flex items-center justify-center text-center px-4 overflow-hidden">
          <motion.div
            style={{ backgroundImage: `url(${application.image})` }}
            className="absolute inset-0 bg-cover bg-center"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
          ></motion.div>
          <div className="absolute inset-0 bg-black/60"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Link
              to="/applications"
              className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-4"
            >
              <FaChevronLeft className="mr-2" />
              Back to Applications
            </Link>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              {application.industry}
            </h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto text-gray-200">
              {application.tagline}
            </p>
          </motion.div>
        </div>

        {/* Introduction & At a Glance */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                The Challenge
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                {application.description}
              </p>
            </div>
            <div className="lg:col-span-2 bg-brand-light dark:bg-brand-dark-light p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                At a Glance:
              </h3>
              <ul className="space-y-4">
                {application.atAGlance.map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <item.icon className="text-brand-orange text-2xl flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Common Use Cases Grid */}
        <section className="py-20 bg-brand-light dark:bg-brand-dark-light">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
              Common Use Cases
            </h2>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {application.applicationsList.map((app, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-brand-dark p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {app}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Products Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-brand-orange dark:text-brand-orange-light">
              Recommended Products
            </h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              These grades are specifically engineered for the demanding
              conditions of the {application.industry}.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {application.recommendedProducts.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-brand-dark">
          <div className="max-w-7xl mx-auto text-center py-16 px-4">
            <h2 className="text-3xl font-bold text-white">
              Optimize Your {application.industry} Operations
            </h2>
            <p className="mt-2 text-lg text-gray-300">
              Reduce downtime and maintenance costs. Contact us for a
              specialized quote.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 bg-brand-orange text-white font-bold rounded-full shadow-lg"
              >
                Request a Quote
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApplicationDetails;
