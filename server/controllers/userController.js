// server/controllers/userController.js
import User from "../models/User.js";

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      // You can add a token here later for a full auth system
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
