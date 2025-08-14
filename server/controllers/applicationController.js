// server/controllers/applicationController.js
import mongoose from "mongoose";
import Application from "../models/Application.js";

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

export const getApplicationByName = async (req, res) => {
  try {
    const industryName = req.params.name.replace(/-/g, " ");
    const application = await Application.findOne({
      industry: { $regex: new RegExp(industryName, "i") },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching application details",
      error: error.message,
    });
  }
};

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
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (application) {
      res.json(application);
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching application", error: error.message });
  }
};
