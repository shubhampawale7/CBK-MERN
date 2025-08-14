// server/routes/applicationRoutes.js
import express from "express";
import {
  getApplications,
  getApplicationByName,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getApplications);
router.get("/:name", getApplicationByName);

router.post("/", protect, createApplication);
router.put("/:id", protect, updateApplication);
router.delete("/:id", protect, deleteApplication);

export default router;
