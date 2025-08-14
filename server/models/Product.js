// server/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true }, // For the URL slug e.g., "cbk-eco"
  description: { type: String, required: true },
  hardness: { type: String, required: true },
  temp: { type: String, required: false },

  // NEW: Added fields for filtering and the redesigned pages
  category: { type: [String], required: true }, // e.g., ["abrasion", "impact"]
  applicationImage: { type: String, required: false }, // e.g., "/images/applications/conveyor.jpg"
  features: { type: [String], default: [] }, // For the key features list
  applications: { type: [String], default: [] }, // For the common applications list

  // These fields from your original model are kept
  alloyElements: { type: [String], default: [] },
  microstructure: {
    etchant: { type: String },
    magnification: { type: String },
    observation: { type: String },
    primaryCarbide: { type: String },
    secondaryCarbide: { type: String },
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
