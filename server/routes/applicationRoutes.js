// server/routes/applicationRoutes.js
import express from "express";
import {
  getApplications,
  getApplicationByIdOrName,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all applications
router.get("/", getApplications);

// Handles BOTH ObjectId and slug in a single route
router.get("/:param", getApplicationByIdOrName);

// Create a new application (protected route)
router.post("/", protect, createApplication);

// Update application by ID (protected route)
router.put("/:id", protect, updateApplication);

// Delete application by ID (protected route)
router.delete("/:id", protect, deleteApplication);

export default router;
