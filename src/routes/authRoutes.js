import express from "express";
import bscrypt from "bcrypt";

const router = express.Router();
import User from "../models/user.js";
import { validateuserWhileSignup } from "../validations/authValidations.js";

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
    res
      .status(201)
      .send({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).send({ error: error.message || "User signup failed" });
  }
});

export default router;
