// client/src/api.js
import axios from "axios";

let baseURL;

// If running locally, use your local backend
if (import.meta.env.MODE === "development") {
  baseURL = "http://localhost:5000";
} else {
  // In production, use the backend URL from env vars
  baseURL = import.meta.env.VITE_API_URL;
}

const api = axios.create({
  baseURL,
  withCredentials: true, // Enable cookies/auth if needed
});

export default api;
