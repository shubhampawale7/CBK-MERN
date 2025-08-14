// client/src/api.js
import axios from "axios";

// Create a new instance of axios with a custom configuration
const api = axios.create({
  // Get the base URL from the environment variable we set on Vercel
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
