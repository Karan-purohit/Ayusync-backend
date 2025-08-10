import mongoose from "mongoose";
import { insulinTypesEnum } from "./user.js";

export const mealTypeEnum = ["breakfast", "lunch", "dinner", "snack", "other"];

const logSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    mealType: {
      type: String,
      enum: mealTypeEnum,
      required: true,
    },
    beforeMealSugar: Number,
    meal: String,
    afterMealSugar: Number,
    insulinType: {
      type: String,
      enum: insulinTypesEnum,
      default: undefined,
      lowercase: true,
    },
    insulinUnits: Number,
    notes: String,
  },
  { timestamps: true }
);
const Log = mongoose.model("Log", logSchema);

export default Log;
