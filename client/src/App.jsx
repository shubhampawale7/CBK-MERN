// client/src/App.jsx
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";

// Import all your components and pages
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminHeader from "./components/AdminHeader";
import ScrollToTop from "./components/ScrollToTop";
import AnimatedPage from "./components/AnimatedPage"; // Import the new animation wrapper

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductForm from "./pages/AdminProductForm";
import AdminApplicationForm from "./pages/AdminApplicationForm";
import ProductComparison from "./pages/ProductComparison";
import MaterialSelector from "./pages/MaterialSelector";

const PrivateRoute = ({ children }) => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? children : <Navigate to="/admin/login" replace />;
};

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AdminLayout = () => (
  <div className="flex flex-col min-h-screen bg-brand-light dark:bg-brand-dark">
    <AdminHeader />
    <main className="flex-grow">
      <Outlet />
    </main>
  </div>
);

function App() {
  useTheme();
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" richColors />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes using the PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <Home />
                </AnimatedPage>
              }
            />
            <Route
              path="/about"
              element={
                <AnimatedPage>
                  <About />
                </AnimatedPage>
              }
            />
            <Route
              path="/products"
              element={
                <AnimatedPage>
                  <Products />
                </AnimatedPage>
              }
            />
            <Route
              path="/products/:id"
              element={
                <AnimatedPage>
                  <ProductDetails />
                </AnimatedPage>
              }
            />
            <Route
              path="/applications"
              element={
                <AnimatedPage>
                  <Applications />
                </AnimatedPage>
              }
            />
            <Route
              path="/applications/:name"
              element={
                <AnimatedPage>
                  <ApplicationDetails />
                </AnimatedPage>
              }
            />
            <Route
              path="/contact"
              element={
                <AnimatedPage>
                  <Contact />
                </AnimatedPage>
              }
            />
            <Route
              path="/compare-products"
              element={
                <AnimatedPage>
                  <ProductComparison />
                </AnimatedPage>
              }
            />
            <Route
              path="/material-selector"
              element={
                <AnimatedPage>
                  <MaterialSelector />
                </AnimatedPage>
              }
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin/login"
            element={
              <AnimatedPage>
                <AdminLogin />
              </AnimatedPage>
            }
          />
          <Route
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route
              path="/admin/dashboard"
              element={
                <AnimatedPage>
                  <AdminDashboard />
                </AnimatedPage>
              }
            />
            <Route
              path="/admin/products/create"
              element={
                <AnimatedPage>
                  <AdminProductForm />
                </AnimatedPage>
              }
            />
            <Route
              path="/admin/products/:id/edit"
              element={
                <AnimatedPage>
                  <AdminProductForm />
                </AnimatedPage>
              }
            />
            <Route
              path="/admin/applications/create"
              element={
                <AnimatedPage>
                  <AdminApplicationForm />
                </AnimatedPage>
              }
            />
            <Route
              path="/admin/applications/:id/edit"
              element={
                <AnimatedPage>
                  <AdminApplicationForm />
                </AnimatedPage>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

// NOTE: You need to wrap your App component with <Router> in main.jsx
export default App;
