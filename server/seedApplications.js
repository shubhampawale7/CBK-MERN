// server/seedApplications.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Application from "./models/Application.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const applications = [
  {
    industry: "Cement Plant",
    applicationsList: [
      "Transfer Elevator - Transfer Points",
      "Louvered Dividing Wall",
      "Ball Mill Inlet & Out Let",
      "Air Chamber Ring",
      "Shifter",
      "Dust Exhaust Fans",
      "Clinker Chute",
      "Cyclone",
    ],
  },
  {
    industry: "Ore Processing",
    applicationsList: [
      "Transfer Chutes",
      "Skirt Liners",
      "Bin Liners",
      "Deflector Liners Loading & Unloading Chutes",
      "Reclaimer Liners",
      "Vibratory Feeder Liners",
      "Train Loading & Unloading Chute Liners",
      "Flop Gate Liners",
      "Plough Blades",
      "Crusher Liners",
      "Washer Pipe Work, Spools, Reducers & Bands",
      "Screen Plates",
    ],
  },
  {
    industry: "Steel",
    applicationsList: [
      "Ore Loading Grab",
      "Scooplift Bucket",
      "Mixing Bed Bucket Wheel",
      "Proportioning Bunker",
      "Sinter Conveyor",
      "Feeder Roller",
      "Hot Screen",
      "Sinter Cooler",
      "Final Sinter Screens",
      "Blast Furnace Closers",
      "Convertor Chutes + Pipelines",
    ],
  },
  {
    industry: "Coal Preparation",
    applicationsList: [
      "Transfer Chutes",
      "Loading & Unloading Chutes",
      "Bin Liners",
      "Deflector Liners",
      "Flop Gate Liners",
      "Washer Pipework",
      "Crusher Liners",
      "Train Loading & Unloading Chute Liners",
      "Vibratory Feeder Liners",
      "Screen Plates",
      "Spiral Plates",
      "Spiral Chutes",
      "Reducers & Bends",
    ],
  },
  {
    industry: "Power Plant",
    applicationsList: [
      "I.D. Fan / P.A. Fan",
      "Coal Mill Wear Plates (detectors)",
      "Coal Feeders",
      "Coal Mill Venturies",
      "Scraper Blades",
      "Coal Mill Cones",
      "Orifices, Rollers",
      "Ash Pump Impellers & Casings",
      "Coal Mill Bends",
      "Multiple Port Outlets",
    ],
  },
];

const seedApplications = async () => {
  try {
    await Application.deleteMany();
    await Application.insertMany(applications);
    console.log("Applications seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding applications:", error);
    process.exit(1);
  }
};

seedApplications();
