import mongoose from "mongoose";

export const genderEnum = ["male", "female", "other"];
export const typeOfDiabetesEnum = [
  "type1",
  "type2",
  "lada",
  "gestational",
  "prediabetes",
  "mody",
  "neonatal",
  "type3c",
  "cfrd",
  "other",
];

export const insulinTypesEnum = [
  "rapid-acting",
  "short-acting",
  "intermediate-acting",
  "long-acting",
  "ultra-long-acting",
  "premixed",
  "other",
];

export const dietTypeEnum = [
  "vegetarian",
  "non-vegetarian",
  "vegan",
  "keto",
  "low-carb",
  "other",
];
export const activityLevelEnum = ["low", "moderate", "high"];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      enum: genderEnum,
      lowercase: true,
    },
    typeOfDiabetes: {
      type: String,
      enum: typeOfDiabetesEnum,
      lowercase: true,
    },
    takesInsulin: {
      type: Boolean,
    },
    insulinTypes: {
      type: [String],
      enum: insulinTypesEnum,
      default: undefined,
      lowercase: true,
    },
    medications: {
      type: String,
    },
    dietType: {
      type: String,
      enum: dietTypeEnum,
      lowercase: true,
    },
    activityLevel: {
      type: String,
      enum: activityLevelEnum,
      lowercase: true,
    },
    lastLoggedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
