// server/models/Application.js
import mongoose from "mongoose";

// This defines the structure for the "Recommended Products" section
const recommendedProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  hardness: { type: String, required: true },
});

// This defines the structure for the "At a Glance" section
const atAGlanceSchema = new mongoose.Schema({
  text: { type: String, required: true },
  // The icon will be mapped on the frontend, so we only need the text.
});

const applicationSchema = new mongoose.Schema({
  industry: { type: String, required: true },

  // NEW: Added fields for the redesigned page
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // e.g., "/images/applications/cement-banner.jpg"
  atAGlance: [atAGlanceSchema],
  recommendedProducts: [recommendedProductSchema],

  // This field remains from your original model
  applicationsList: {
    type: [String],
    required: true,
  },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
