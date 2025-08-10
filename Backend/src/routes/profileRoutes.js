import express from "express";

const router = express.Router();
import User from "../models/user.js";
import { userAuth } from "../middlewares/userAuth.js";
import { validateProfileUpdate } from "../validations/validations.js";

router.get("/profile", userAuth, async (req, res) => {
  try {
    const { password, ...user } = req.user.toObject();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message || "Failed to fetch profile" });
  }
});

router.patch("/profile", userAuth, async (req, res) => {
  try {
    const isValid = validateProfileUpdate(req);
    if (!isValid.isValid) {
      throw new Error(isValid.error);
    }
    const {
      firstName,
      lastName,
      age,
      gender,
      typeOfDiabetes,
      takesInsulin,
      insulinTypes,
      medications,
      dietType,
      activityLevel,
    } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName,
        lastName,
        age,
        gender,
        typeOfDiabetes,
        takesInsulin,
        insulinTypes:
          takesInsulin || req.user.takesInsulin
            ? insulinTypes || req.user.insulinTypes
            : [],
        medications,
        dietType,
        activityLevel,
      },
      { new: true }
    );
    if (!user) {
      throw new Error("User not found");
    }
    const { password, ...updatedUser } = user.toObject();
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Failed to update profile" });
  }
});
export default router;
