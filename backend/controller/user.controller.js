const User = require("../model/user.model");
const generateToken = require("../middleware/generateToken");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");


//  Register
const register = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      username,
      email,
      password,
      address,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Signin successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        address: user.address,
        token: token,
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Signout
const signout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signout successful" });
};

//  Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
};

//  Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username email role address createdAt");
    res.status(200).json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Update Profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId, username, address } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        address,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "username email role address createdAt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

 const verifyToken = async (req, res) => {
  try {
    res.json({
      valid: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP (6 digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP directly (NO HASHING)
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Send Email
    await sendEmail(
      user.email,
      "Password Reset OTP",
      `Your OTP is: ${otp}. It expires in 10 minutes.`
    );

    res.status(200).json({
      message: "OTP sent to email",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP and new password are required",
      });
    }

    email = email.toLowerCase().trim();
    otp = String(otp).trim();

    const user = await User.findOne({
      email,
      resetOTP: otp,
      resetOTPExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // ✅ DO NOT HASH HERE
    user.password = newPassword;

    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};




module.exports = {
  register,
  signin,
  signout,
  deleteUser,
  getAllUsers,
  updateUserProfile,
  getUserById,
  verifyToken,
  forgotPassword,
  resetPassword


};
