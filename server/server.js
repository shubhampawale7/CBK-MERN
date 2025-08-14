// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// --- ✅ CORS Configuration for Vercel + Local Dev ---
const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "http://localhost:3000", // CRA dev
  process.env.VERCEL_FRONTEND_URL, // Your deployed Vercel frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow requests without origin (e.g., mobile apps, curl)
      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // ✅ Allow cookies / withCredentials requests
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// --- API Routes ---
app.use("/api/products", productRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);

// --- Test route for backend health ---
app.get("/", (req, res) => {
  res.send("✅ Backend is running and CORS is configured correctly.");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
