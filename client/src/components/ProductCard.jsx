// client/src/components/ProductCard.jsx
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import commonProductImage from "../assets/commonproducts.jpg";

const ProductCard = ({ product }) => {
  const urlSlug = product.name.toLowerCase().replace(/\s+/g, "-");

  // Hooks for the 3D tilt effect (no changes here)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [-15, 15]);
  const rotateY = useTransform(mouseX, [-200, 200], [15, -15]);
  const springConfig = { stiffness: 300, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Link
      to={`/products/${urlSlug}`}
      className="block h-full [perspective:1000px]"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full w-full rounded-2xl shadow-lg transition-all duration-500
                   bg-white dark:bg-brand-dark-light
                   border border-gray-200 dark:border-gray-800/50
                   hover:border-brand-orange/50 hover:shadow-2xl hover:shadow-brand-orange/10"
      >
        <div
          style={{ transform: "translateZ(20px)" }}
          className="p-6 flex flex-col h-full"
        >
          <div className="flex justify-between items-start mb-4">
            <h3
              style={{ transform: "translateZ(40px)" }}
              className="text-2xl font-serif font-bold transition-colors duration-300
                       text-brand-dark dark:text-white
                       group-hover:text-brand-orange dark:group-hover:text-brand-orange-light"
            >
              {product.name}
            </h3>
            <span
              style={{ transform: "translateZ(50px)" }}
              className="bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex-shrink-0"
            >
              {product.hardness}
            </span>
          </div>

          <div
            style={{ transform: "translateZ(30px)" }}
            className="relative h-40 rounded-lg overflow-hidden my-auto"
          >
            <img
              src={commonProductImage}
              alt={`${product.name} Application`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <div className="flex-grow mt-4">
            <p
              style={{ transform: "translateZ(20px)" }}
              className="text-sm font-mono min-h-[60px]
                       text-gray-600 dark:text-gray-400"
            >
              {product.description}
            </p>
          </div>

          <div
            className="mt-4 pt-4 border-t transition-all duration-300
                     border-gray-200 dark:border-gray-700/50
                     opacity-0 group-hover:opacity-100
                     transform translate-y-4 group-hover:translate-y-0"
          >
            <div
              style={{ transform: "translateZ(40px)" }}
              className="flex items-center justify-between font-semibold
                        text-brand-orange dark:text-brand-orange-light"
            >
              <span>View Full Details</span>
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
