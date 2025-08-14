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

// --- IMPORTANT: CORS Configuration Update ---
// This will allow your Vercel frontend to communicate with your Render backend.
const corsOptions = {
  origin: process.env.VERCEL_FRONTEND_URL, // You will set this URL in your Render environment variables
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
// -----------------------------------------

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
