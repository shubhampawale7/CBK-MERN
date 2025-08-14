// server/seedUser.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const seedAdminUser = async () => {
  try {
    // Check if an admin user already exists
    const adminExists = await User.findOne({ email: "admin@cbk.com" });
    if (adminExists) {
      console.log("Admin user already exists.");
      mongoose.connection.close();
      return;
    }

    // Create a new admin user
    const adminUser = new User({
      email: "admin@cbk.com",
      password: "password123", // This password will be hashed automatically
    });
    await adminUser.save();
    console.log("Admin user seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdminUser();
