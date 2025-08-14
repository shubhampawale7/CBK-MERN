// server/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hardness: {
    type: String,
    required: true,
  },
  temp: {
    type: String,
    required: false,
  },
  alloyElements: {
    type: [String],
    default: [],
  },
  microstructure: {
    type: String,
    required: false,
  },
  // We can add more fields later as needed
});

const Product = mongoose.model("Product", productSchema);

export default Product;
