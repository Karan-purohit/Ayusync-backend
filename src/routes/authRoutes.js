import express from "express";
import bscrypt from "bcrypt";
import JsonWebTokenError from "jsonwebtoken";

const router = express.Router();
import User from "../models/user.js";
import {
  validateuserWhileSignup,
  validateUserWhileSignin,
} from "../validations/authValidations.js";

router.post("/signup", async (req, res) => {
  try {
    const validation = validateuserWhileSignup(req);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bscrypt.hash(password, 10);
    const savedUser = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await savedUser.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message || "User signup failed" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const validation = validateUserWhileSignin(req);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bscrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = JsonWebTokenError.sign(
      { userid: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token);
    res.status(200).send({ message: "User signed in successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message || "User signin failed" });
  }
});

router.post("/signout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ message: "User signed out successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message || "User signout failed" });
  }
});

export default router;
