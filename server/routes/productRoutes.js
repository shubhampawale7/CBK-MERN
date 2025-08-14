// server/routes/productRoutes.js (Updated)

import express from "express";
import {
  getProducts,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (Read)
router.get("/:name", getProductByName);
router.get("/", getProducts);

// Protected routes (Create, Update, Delete)
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
