// server/routes/applicationRoutes.js
import express from "express";
import {
  getApplications,
  getApplicationByName,
  getApplicationById, // UPDATED: Import the new function
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getApplications);

// This route can be used for SEO-friendly URLs if you need it later
router.get("/name/:name", getApplicationByName);

// UPDATED: This is the crucial change.
// The route now correctly looks for an :id and uses the new controller function.
router.get("/:id", getApplicationById);

router.post("/", protect, createApplication);
router.put("/:id", protect, updateApplication);
router.delete("/:id", protect, deleteApplication);

export default router;
