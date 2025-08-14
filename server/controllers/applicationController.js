// server/controllers/applicationController.js
import mongoose from "mongoose";
import Application from "../models/Application.js";

// Get all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({});
    res.status(200).json(applications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching applications", error: error.message });
  }
};

// Get application by ID or Name (slug)
export const getApplicationByIdOrName = async (req, res) => {
  try {
    const param = req.params.param;
    let application;

    // If param is a valid MongoDB ObjectId, try finding by ID
    if (mongoose.Types.ObjectId.isValid(param)) {
      application = await Application.findById(param);
    }

    // If not found by ID, try finding by name (case-insensitive, slug-friendly)
    if (!application) {
      const industryName = param.replace(/-/g, " ");
      application = await Application.findOne({
        industry: { $regex: new RegExp(industryName, "i") },
      });
    }

    // If still not found
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching application",
      error: error.message,
    });
  }
};

// Create a new application
export const createApplication = async (req, res) => {
  const { industry, applicationsList } = req.body;

  try {
    const newApplication = new Application({
      industry,
      applicationsList,
    });
    const createdApplication = await newApplication.save();
    res.status(201).json(createdApplication);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating application", error: error.message });
  }
};

// Update application by ID
export const updateApplication = async (req, res) => {
  const { industry, applicationsList } = req.body;
  const { id } = req.params;

  try {
    const application = await Application.findById(id);

    if (application) {
      application.industry = industry || application.industry;
      application.applicationsList =
        applicationsList || application.applicationsList;

      const updatedApplication = await application.save();
      res.json(updatedApplication);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating application", error: error.message });
  }
};

// Delete application by ID
export const deleteApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findById(id);

    if (application) {
      await application.deleteOne();
      res.json({ message: "Application removed" });
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting application", error: error.message });
  }
};
