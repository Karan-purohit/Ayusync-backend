import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { validateLogCreation } from "../validations/validations.js";
import Log from "../models/log.js";

const router = express.Router();

router.post("/addLog", userAuth, async (req, res) => {
  try {
    const isValid = validateLogCreation(req);
    if (!isValid.isValid) {
      throw new Error(isValid.error);
    }
    const {
      date,
      mealType,
      beforeMealSugar,
      meal,
      afterMealSugar,
      insulinType,
      insulinUnits,
      notes,
    } = req.body;

    const log = new Log({
      userId: req.user._id,
      date,
      mealType,
      beforeMealSugar,
      meal,
      afterMealSugar,
      insulinType,
      insulinUnits,
      notes,
    });
    await log.save();
    res.status(201).json({ message: "Log added successfully", log });
  } catch (error) {
    res.status(400).json({ error: error.message || "Failed to add log" });
  }
});

router.patch("/editLog/:id", userAuth, async (req, res) => {
  try {
    const logId = req.params.id;
    const isValid = validateLogCreation(req);
    if (!isValid.isValid) {
      throw new Error(isValid.error);
    }
    const {
      date,
      mealType,
      beforeMealSugar,
      meal,
      afterMealSugar,
      insulinType,
      insulinUnits,
      notes,
    } = req.body;

    const log = await Log.findOneAndUpdate(
      { _id: logId, userId: req.user._id },
      {
        date,
        mealType,
        beforeMealSugar,
        meal,
        afterMealSugar,
        insulinType,
        insulinUnits,
        notes,
      },
      { new: true }
    );
    if (!log) {
      throw new Error("Log not found or you do not have permission to edit it");
    }
    res.status(200).json({ message: "Log updated successfully", log });
  } catch (error) {
    res.status(400).json({ error: error.message || "Failed to edit log" });
  }
});

router.delete("/deleteLog/:id", userAuth, async (req, res) => {
  try {
    const logId = req.params.id;
    const log = await Log.findOneAndDelete({
      _id: logId,
      userId: req.user._id,
    });
    if (!log) {
      throw new Error(
        "Log not found or you do not have permission to delete it"
      );
    }
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Failed to delete log" });
  }
});

export default router;
