// server/models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  industry: {
    type: String,
    required: true,
  },
  applicationsList: {
    type: [String],
    required: true,
  },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
