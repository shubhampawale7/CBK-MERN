// server/controllers/productController.js (Updated)
import mongoose from "mongoose";
import Product from "../models/Product.js";

// Get all products
// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  // This check now works because mongoose is imported.
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ message: "Product not found (invalid ID format)" });
  }

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

// Get a single product by name
export const getProductByName = async (req, res) => {
  try {
    const productName = req.params.name.replace(/-/g, " ");
    const product = await Product.findOne({
      name: { $regex: new RegExp(productName, "i") },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product details",
      error: error.message,
    });
  }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Admin)
 */
export const createProduct = async (req, res) => {
  const { name, description, hardness, temp, alloyElements, microstructure } =
    req.body;

  try {
    const product = new Product({
      name,
      description,
      hardness,
      temp,
      alloyElements,
      microstructure,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private (Admin)
 */
export const updateProduct = async (req, res) => {
  const { name, description, hardness, temp, alloyElements, microstructure } =
    req.body;
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.hardness = hardness || product.hardness;
      product.temp = temp || product.temp;
      product.alloyElements = alloyElements || product.alloyElements;
      product.microstructure = microstructure || product.microstructure;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private (Admin)
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
export const getProductBySlug = async (req, res) => {
  try {
    // 1. Get the slug from the URL params (e.g., "cbk-eco")
    const productSlug = req.params.slug;

    // 2. Convert the slug into a format that can be searched (e.g., "cbk eco")
    const searchName = productSlug.replace(/-/g, " ");

    // 3. Find the product in the database using a case-insensitive search on the 'name' field.
    const product = await Product.findOne({
      name: { $regex: new RegExp(`^${searchName}$`, "i") },
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};
