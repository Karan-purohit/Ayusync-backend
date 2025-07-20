import express from "express";
import bscrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
import User from "../models/user.js";
import {
  validateuserWhileSignup,
  validateUserWhileSignin,
} from "../validations/validations.js";

router.post("/signup", async (req, res) => {
  try {
    const validation = validateuserWhileSignup(req);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bscrypt.hash(password, 10);
    const savedUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    console.log("Saving user:", savedUser);
    await savedUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message || "User signup failed" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const validation = validateUserWhileSignin(req);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bscrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    res.status(200).json({ message: "User signed in successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message || "User signin failed" });
  }
});

router.post("/signout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message || "User signout failed" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const validation = validateUserWhileSignin(req);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const passwordHash = await bscrypt.hash(password, 10);
    user.password = passwordHash;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Forgot password failed" });
  }
});

export default router;
