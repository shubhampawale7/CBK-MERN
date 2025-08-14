// server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // UPDATED: This is the real verification logic that should be used.
      // 1. Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 2. Find the user in the database using the ID from the token
      //    and attach the user object to the request (without the password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Proceed to the next step (the controller function)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
