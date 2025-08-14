// server/controllers/userController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken"; // Import the JWT library

// Helper function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // The token will be valid for 30 days
  });
};

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // If the user is found and password is correct, generate and send a token.
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id), // UPDATED: Send the token to the frontend
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};
