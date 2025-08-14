// server/routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProductBySlug,
  getProductById, // Make sure this is imported
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// --- Public Routes ---
router.get("/", getProducts);
// This route is for public product detail pages.
router.get("/slug/:slug", getProductBySlug);

// --- Protected (Admin) Routes ---
// This route is specifically for the admin panel to fetch a product for editing.
router.get("/:id", protect, getProductById);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
