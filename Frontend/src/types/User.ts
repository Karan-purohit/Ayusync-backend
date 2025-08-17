export type Gender = "male" | "female" | "other";

export type TypeOfDiabetes =
  | "type1"
  | "type2"
  | "lada"
  | "gestational"
  | "prediabetes"
  | "mody"
  | "neonatal"
  | "type3c"
  | "cfrd"
  | "other";

export type InsulinType =
  | "rapid-acting"
  | "short-acting"
  | "intermediate-acting"
  | "long-acting"
  | "ultra-long-acting"
  | "premixed"
  | "other";

export type DietType =
  | "vegetarian"
  | "non-vegetarian"
  | "vegan"
  | "keto"
  | "low-carb"
  | "other";

export type ActivityLevel = "low" | "moderate" | "high";

export interface User {
  _id?: string; // Mongo ObjectId as string
  firstName: string;
  lastName: string;
  email: string;
  password: string; // hashed
  age?: number; // 0 - 120
  gender?: Gender;
  typeOfDiabetes?: TypeOfDiabetes;
  takesInsulin?: boolean;
  insulinTypes?: InsulinType[]; // present only if takesInsulin === true
  medications?: string;
  dietType?: DietType;
  activityLevel?: ActivityLevel;
  lastLoggedAt?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  isProfileComplete?: boolean; // true if all required fields are filled
}
