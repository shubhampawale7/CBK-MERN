// server/seedProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const products = [
  {
    name: "CBK ECO",
    id: "cbk-eco",
    description: "Abrasion Resistant and Mild Impact Resistant",
    hardness: "55-58 Rc",
    temp: "100°C",
    category: ["abrasion", "impact"],
    applicationImage: "/images/applications/generic-chute.jpg",
    features: [
      "Cost-Effective Solution",
      "Good Formability",
      "Excellent for General Abrasion",
    ],
    applications: ["Hoppers", "Chutes", "Liners", "Feeders"],
  },
  {
    name: "CBK STD",
    id: "cbk-std",
    description:
      "Abrasion Resistant and Mild Impact Resistant with higher hardness",
    hardness: "58-60 Rc",
    temp: "100°C",
    category: ["abrasion", "impact"],
    applicationImage: "/images/applications/conveyor.jpg",
    features: ["Industry Standard", "Higher Hardness", "Versatile Application"],
    applications: ["Conveyor Transfer Points", "Screens", "Mixer Blades"],
  },
  {
    name: "CBK 1",
    id: "cbk-1",
    description: "Heavy Abrasion with Little Impact",
    hardness: "58-62 Rc",
    temp: "100°C",
    category: ["abrasion"],
    applicationImage: "/images/applications/crusher-liner.avif",
    features: [
      "High Abrasion Resistance",
      "Durable Carbide Structure",
      "Cost-Effective for High Wear",
    ],
    applications: ["Crusher Liners", "Dozer Blades", "Bucket Liners", "Screws"],
  },
  {
    name: "CBK 1 Plus",
    id: "cbk-1-plus",
    description:
      "Primary Carbide & Secondary Carbides for Severe Abrasion Resistance",
    hardness: "58-62 Rc",
    temp: "100°C",
    category: ["abrasion"],
    applicationImage: "/images/applications/high-abrasion.jpg",
    features: [
      "Complex Carbide Formula",
      "Enhanced Lifespan",
      "Handles Severe Abrasion",
    ],
    applications: ["High-wear Chutes", "Sinter Plant Components", "Fan Blades"],
  },
  {
    name: "CBK 5",
    id: "cbk-5",
    description:
      "Primary Carbides & Secondary Carbides for Severe Abrasion Resistance",
    hardness: "58-62 Rc",
    temp: "300°C",
    category: ["abrasion", "temperature"],
    applicationImage: "/images/applications/high-temp.jpg",
    features: [
      "Mid-Range Temperature Resistance",
      "Severe Abrasion Protection",
      "Durable Overlay",
    ],
    applications: ["Hot Gas Ducts", "Clinker Chutes", "Furnace Hoppers"],
  },
  {
    name: "CBK 5S",
    id: "cbk-5s",
    description: "Abrasion Resistance for Fans in High Temperature up to 400°C",
    hardness: "58-62 Rc",
    temp: "400°C",
    category: ["abrasion", "temperature"],
    applicationImage: "/images/applications/industrial-fan.jpg",
    features: [
      "Optimized for Fans",
      "High-Temp Durability",
      "Reduces Maintenance on Rotors",
    ],
    applications: ["ID Fans", "PA Fans", "Dust Exhaust Fans", "Fan Casings"],
  },
  {
    name: "CBK Ni",
    id: "cbk-ni",
    description:
      "Complex Carbides of Chromium and Niobium with Nickel for added toughness",
    hardness: "55 Rc",
    temp: "350°C",
    category: ["abrasion", "temperature", "impact"],
    applicationImage: "/images/applications/complex-carbide.jpg",
    features: [
      "Nickel-Alloyed for Toughness",
      "Resists Chipping & Cracking",
      "Mid-Temp Applications",
    ],
    applications: ["High-Impact Crushers", "Grizzly Bars", "Screen Plates"],
  },
  {
    name: "CBK 14",
    id: "cbk-14",
    description:
      "Complex Carbide of Chromium, Niobium, Vanadium, Tungsten, Molybdenum",
    hardness: "60-64 Rc",
    temp: "600°C",
    category: ["abrasion", "impact", "temperature"],
    applicationImage: "/images/applications/extreme-wear.jpg",
    features: [
      "Multi-Alloy Compex Carbides",
      "Extreme Wear Resistance",
      "High Temperature Stability",
    ],
    applications: ["Sinter Coolers", "Blast Furnace Components", "Coke Chutes"],
  },
  {
    name: "CBK 23",
    id: "cbk-23",
    description:
      "Complex Carbide of Chromium, Niobium, Vanadium, Tungsten, Molybdenum",
    hardness: "60-65 Rc",
    temp: "750°C",
    category: ["abrasion", "impact", "temperature"],
    applicationImage: "/images/applications/furnace-liner.jpg",
    features: [
      "Premium Grade Alloy",
      "Ultimate High-Temp Protection",
      "Maximum Hardness",
    ],
    applications: [
      "Furnace Liners",
      "High-temp Processing",
      "Hot Slag Handling",
    ],
  },
  {
    name: "CBK B CARB",
    id: "cbk-b-carb",
    description: "Boron Carbide for Extreme Abrasion Resistance",
    hardness: "61-64 Rc",
    category: ["abrasion"],
    applicationImage: "/images/applications/boron-carbide.jpg",
    features: [
      "Boron Carbide Infused",
      "Exceptional Hardness",
      "Fine Particle Abrasion Resistance",
    ],
    applications: [
      "Sand Blasting Nozzles",
      "Ceramic Tile Presses",
      "Ash Pipelines",
    ],
  },
  {
    name: "CBK Ti",
    id: "cbk-ti",
    description: "Titanium Carbide for High Impact Resistance",
    hardness: "56-58 Rc",
    category: ["impact"],
    applicationImage: "/images/applications/impact-plate.jpg",
    features: [
      "Titanium Carbide Formula",
      "Superior Impact Toughness",
      "Prevents Fracturing",
    ],
    applications: [
      "Rock Box Liners",
      "Impact Zones",
      "Grizzly Feeders",
      "Crusher Jaws",
    ],
  },
  {
    name: "CBK V CARB",
    id: "cbk-v-carb",
    description: "Vanadium Carbide for Extreme Sliding Abrasion Resistance",
    hardness: "62-64 Rc",
    category: ["abrasion"],
    applicationImage: "/images/applications/sliding-abrasion.jpg",
    features: [
      "Vanadium Carbide Rich",
      "Low-Friction Surface",
      "Resists Sliding Wear",
    ],
    applications: ["Plough Blades", "Scrapers", "Augers", "Conveyor Screws"],
  },
  {
    name: "CBK W CARB",
    id: "cbk-w-carb",
    description: "Tungsten Carbide for Ultimate Wear Resistance",
    hardness: "60-65 Rc",
    category: ["abrasion", "impact"],
    applicationImage: "/images/applications/tungsten-carbide.jpg",
    features: [
      "Tungsten Carbide Overlay",
      "Maximum Wear Lifespan",
      "Handles Extreme Conditions",
    ],
    applications: [
      "Cutting Edges",
      "Ground Engaging Tools",
      "High-Wear Crushers",
    ],
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Old products destroyed!");
    await Product.insertMany(products);
    console.log("New products seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
