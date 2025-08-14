// client/src/components/ProductCard.jsx
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// CORRECTED: The filename is now "commonproduct.jpg" (singular) to match your asset folder.
import commonProductImage from "../assets/commonproducts.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ProductCard = ({ product }) => {
  const urlSlug = product.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group bg-white dark:bg-brand-dark-light rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={commonProductImage}
          alt={`CBK Engineers Wear Plate`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        {/* Hardness Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            {product.hardness}
          </span>
        </div>
      </div>

      {/* Content Section - Now separate from the image */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {product.name}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm min-h-[60px]">
            {product.description}
          </p>
        </div>

        {/* View Details Link (Always Visible) */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <NavLink to={`/products/${urlSlug}`}>
            <div className="flex items-center justify-between text-brand-orange font-semibold">
              <span>View Details</span>
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
