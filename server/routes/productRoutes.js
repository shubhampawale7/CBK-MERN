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
router.get("/slug/:slug", getProductBySlug);

// Product detail pages are now public
router.get("/:id", getProductById);

// --- Protected (Admin) Routes ---
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
