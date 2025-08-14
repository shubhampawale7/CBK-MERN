// client/src/pages/AdminLogin.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FaSpinner, FaLock } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Your original form submission logic is unchanged.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // UPDATED: Using brand colors for the background.
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-light dark:bg-brand-dark font-sans p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        // UPDATED: Styling for the login card.
        className="bg-white dark:bg-brand-dark-light p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
      >
        <div className="text-center mb-8">
          {/* NEW: Added a branded header to the login form. */}
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold text-brand-orange">
              CBK ENGINEERS
            </span>
          </Link>
          <h2 className="mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Admin Panel Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* UPDATED: Input field styling to match the site theme. */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-brand-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange-light focus:border-transparent transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-md border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-brand-dark text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange-light focus:border-transparent transition-all"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            // UPDATED: Button styling to match the site theme.
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-brand-orange text-white font-bold rounded-md shadow-lg hover:bg-brand-orange-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaLock />}
            <span>{loading ? "Logging in..." : "Secure Login"}</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
