// client/src/pages/AdminLogin.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { FaSpinner, FaLock, FaEnvelope } from "react-icons/fa";
import api from "../api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/users/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Login successful! Redirecting...");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password."
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-serif">
      {/* Left Side: Branding & Visuals */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-brand-dark text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center"
        >
          <Link to="/">
            <img
              src="/logo.png"
              alt="CBK Engineers Logo"
              className="h-12 w-auto mx-auto brightness-0 invert"
            />
          </Link>
          <h1 className="text-4xl font-bold mt-6">Admin Panel</h1>
          <p className="mt-2 text-lg text-gray-300">
            Precision. Performance. Control.
          </p>
        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center min-h-screen bg-brand-light dark:bg-brand-dark p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 lg:hidden"
          >
            <Link to="/">
              <img
                src="/logo.png"
                alt="CBK Engineers Logo"
                className="h-10 w-auto mx-auto dark:brightness-0 dark:invert"
              />
            </Link>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-gray-800 dark:text-white text-center"
          >
            Welcome Back
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-500 dark:text-gray-400 text-center mt-2 mb-8"
          >
            Please enter your credentials to log in.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <FormInput
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={FaEnvelope}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FormInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={FaLock}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-orange text-white font-bold text-lg rounded-xl shadow-lg hover:bg-brand-orange-dark transition-all duration-300 disabled:bg-gray-400"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <span>Secure Login</span>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const FormInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
      <Icon />
    </div>
    <input
      {...props}
      required
      className="w-full p-4 pl-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-brand-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange-light focus:border-transparent transition-all"
    />
  </div>
);

export default AdminLogin;
