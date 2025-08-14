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
    tagline: "Durability in the Dust: Wear Solutions for Cement Production.",
    description:
      "The cement industry presents extreme challenges with high abrasion from clinker and high temperatures in kilns and coolers. Our wear plates are engineered to maximize the lifespan of critical components, reducing costly downtime.",
    image: "/images/applications/cement.jpg",
    atAGlance: [
      { text: "High Abrasion Resistance" },
      { text: "Reduced Maintenance Costs" },
      { text: "Increased Uptime" },
    ],
    applicationsList: [
      "Clinker Chutes",
      "Cyclones",
      "Dust Exhaust Fans",
      "Ball Mill Inlets & Outlets",
      "Air Chamber Rings",
      "Shifters & Shifter Blades",
      "Transfer Points",
      "Silo Outlets",
    ],
    recommendedProducts: [
      {
        name: "CBK 5S",
        description: "Excellent for fans in high-temperature environments.",
        hardness: "58-62 Rc",
      },
      {
        name: "CBK 14",
        description: "Complex carbides for severe conditions up to 600°C.",
        hardness: "60-64 Rc",
      },
      {
        name: "CBK 23",
        description: "Handles extreme abrasion and temperatures up to 750°C.",
        hardness: "60-65 Rc",
      },
    ],
  },
  {
    industry: "Ore Processing",
    tagline: "Strength Against the Stone: Fortifying Ore Processing Equipment.",
    description:
      "From crushing to conveying, ore processing involves constant, severe impact and abrasion. Our wear plates provide robust protection for chutes, crushers, and feeders, ensuring continuous operation.",
    image: "/images/applications/ore-banner.jpg",
    atAGlance: [
      { text: "High Impact Toughness" },
      { text: "Extended Component Life" },
      { text: "Improved Throughput" },
    ],
    applicationsList: [
      "Transfer Chutes",
      "Skirt Liners",
      "Bin Liners (Surge, Hopper, Reject)",
      "Reclaimer Liners",
      "Vibratory Feeder Liners",
      "Flop Gate Liners",
      "Crusher Liners",
      "Screen Plates",
    ],
    recommendedProducts: [
      {
        name: "CBK Ti",
        description:
          "Titanium carbide composition for superior impact resistance.",
        hardness: "56-58 Rc",
      },
      {
        name: "CBK 1",
        description: "A workhorse for heavy abrasion with moderate impact.",
        hardness: "58-62 Rc",
      },
      {
        name: "CBK V CARB",
        description:
          "Ideal for extreme sliding abrasion in feeders and chutes.",
        hardness: "62-64 Rc",
      },
    ],
  },
  {
    industry: "Steel",
    tagline: "Forged for Fire: Wear Plates for Steel Manufacturing.",
    description:
      "Steel production involves intense heat and abrasive materials. Our plates protect critical equipment like sinter coolers, discharge chutes, and blast furnace components from premature wear.",
    image: "/images/applications/steel.jpg",
    atAGlance: [
      { text: "High Temperature Resistance" },
      { text: "Protection for Critical Machinery" },
      { text: "Operational Reliability" },
    ],
    applicationsList: [
      "Hot Screen",
      "Sinter Cooler",
      "Discharge Chute",
      "Dedusting Van",
      "Skip Hoist",
      "Blast Furnace Closers",
      "Distribution Chute",
      "Vibratory Feeders",
    ],
    recommendedProducts: [
      {
        name: "CBK 14",
        description: "Withstands severe abrasion at temperatures up to 600°C.",
        hardness: "60-64 Rc",
      },
      {
        name: "CBK 23",
        description: "Our premium grade for extreme heat and wear up to 750°C.",
        hardness: "60-65 Rc",
      },
      {
        name: "CBK W CARB",
        description:
          "Tungsten carbide for ultimate resistance in high-wear zones.",
        hardness: "60-65 Rc",
      },
    ],
  },
  {
    industry: "Coal Preparation",
    tagline: "Engineered for Endurance: Solutions for Coal Handling.",
    description:
      "Coal handling is a high-volume, high-abrasion process. We provide durable linings for chutes, bins, and crushers to keep operations running smoothly and efficiently.",
    image: "/images/applications/coal.jpg",
    atAGlance: [
      { text: "Sliding Abrasion Protection" },
      { text: "Reduced Material Buildup" },
      { text: "Maximized Equipment Life" },
    ],
    applicationsList: [
      "Transfer Chutes",
      "Bin Liners",
      "Deflector Liners",
      "Flop Gate Liners",
      "Plough Blades",
      "Crusher Liners",
      "Spiral Chutes",
      "Washer Pipework",
    ],
    recommendedProducts: [
      {
        name: "CBK STD",
        description:
          "An excellent standard choice for general abrasion resistance.",
        hardness: "58-60 Rc",
      },
      {
        name: "CBK 1 Plus",
        description:
          "Enhanced carbides for severe abrasion in high-flow areas.",
        hardness: "58-62 Rc",
      },
      {
        name: "CBK V CARB",
        description:
          "Designed specifically to combat extreme sliding abrasion.",
        hardness: "62-64 Rc",
      },
    ],
  },
  {
    industry: "Power Plant",
    tagline: "Powering Through Wear: Reliability for Power Generation.",
    description:
      "In power plants, equipment reliability is paramount. Our wear plates protect vital components like coal mills, fans, and ash handling systems from abrasive wear, ensuring consistent energy production.",
    image: "/images/applications/power.jpg",
    atAGlance: [
      { text: "Erosion & Abrasion Control" },
      { text: "Component Longevity" },
      { text: "Prevention of Outages" },
    ],
    applicationsList: [
      "I.D. Fan / P.A. Fan",
      "Coal Mill Wear Plates",
      "Coal Feeders",
      "Scraper Blades",
      "Ash Pump Impellers & Casings",
      "Coal Handling Plant Chutes",
      "Coal Mill Bends",
    ],
    recommendedProducts: [
      {
        name: "CBK 5S",
        description:
          "The premier choice for high-temperature fan blades and casings.",
        hardness: "58-62 Rc",
      },
      {
        name: "CBK B CARB",
        description:
          "Boron carbide composition for extreme abrasion in coal mills.",
        hardness: "61-64 Rc",
      },
      {
        name: "CBK 1",
        description:
          "A versatile solution for chutes and feeders in the coal handling plant.",
        hardness: "58-62 Rc",
      },
    ],
  },
];

const seedApplications = async () => {
  try {
    await Application.deleteMany();
    console.log("Applications destroyed!");
    await Application.insertMany(applications);
    console.log("Applications seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding applications:", error);
    process.exit(1);
  }
};

seedApplications();
