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
    description: "Abrasion Resistantant And Mild Impact Resistantant",
    hardness: "55-58 Rc",
    temp: "$100^{circ}C$",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK STD",
    description: "Abrasion Resistant and Mild Impact Resistant",
    hardness: "58-60 Rc",
    temp: "$100^{circ}C$",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK 1",
    description: "Heavy Abrasion with Little Impact",
    hardness: "58-62 Rc",
    temp: "$100^{circ}C$",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK 1 Plus",
    description:
      "Primary Carbide & Secondary Carbides for Sevier Abrasion Resistance",
    hardness: "58-62 Rc",
    temp: "$100^{circ}C$",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK 5",
    description:
      "Primary Carbides & Secondary Carbides for Sevier Abrasion Resistance up to $400^{circ}C$",
    hardness: "58-62 Rc",
    temp: "$300^{circ}C$",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK 5S",
    description: "Abrasion Resistance for Fans in High Temperature",
    hardness: "58-62 Rc",
    temp: "$400^{circ}C$",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK Ni",
    description: "Complex Carbides of Chromium and Niobium",
    hardness: "55 Rc",
    temp: "$350^{circ}C$",
    alloyElements: ["Ni-", "W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK 14",
    description:
      "Complex Carbide of Chromium, Niobium, Vanadium, Tungsten, Molybdenum",
    hardness: "60-64 Rc",
    temp: "$600^{circ}C$",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK 23",
    description:
      "Complex Carbide of Chromium, Niobium, Vanadium, Tungsten, Molybdenum",
    hardness: "60-65 Rc",
    temp: "$750^{circ}C$",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK B CARB",
    description: "Boron Carbide Extreme Abrasion Resistance",
    hardness: "61-64 Rc",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK Ti",
    description: "Titanium Carbide for Impact Resistance",
    hardness: "56-58 Rc",
    alloyElements: ["Ti-", "W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK V CARB",
    description: "Extreme Sliding Abrasion Resistance",
    hardness: "62-64 Rc",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
  {
    name: "CBK W CARB",
    description: "Tungsten Carbide",
    hardness: "60-65 Rc",
    alloyElements: ["W", "Nb", "V", "Si", "Mo", "C", "Mn", "Cr", "B"],
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
