import validator from "validator";
import {
  activityLevelEnum,
  dietTypeEnum,
  genderEnum,
  insulinTypesEnum,
  typeOfDiabetesEnum,
} from "../models/user.js";

export const validateuserWhileSignup = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return { isValid: false, error: "All fields are required while signup" };
  } else if (firstName.length < 2 || firstName.length > 50) {
    return {
      isValid: false,
      error: "First name must be between 2 and 50 characters",
    };
  } else if (lastName.length < 2 || lastName.length > 50) {
    return {
      isValid: false,
      error: "Last name must be between 2 and 50 characters",
    };
  } else if (!validator.isEmail(email)) {
    return { isValid: false, error: "Invalid email format" };
  } else if (!validator.isStrongPassword(password, { minLength: 8 })) {
    return {
      isValid: false,
      error:
        "Password must be at least 8 characters long and include a mix of letters, numbers, and symbols",
    };
  }

  return { isValid: true };
};

export const validateUserWhileSignin = (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return { isValid: false, error: "Email and password are required" };
  } else if (!validator.isEmail(email)) {
    return { isValid: false, error: "Invalid email format" };
  }

  return { isValid: true };
};

export const validateProfileUpdate = (req) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    typeOfDiabetes,
    takesInsulin,
    insulinTypes,
    dietType,
    activityLevel,
  } = req.body;

  let validationError = { isValid: false, error: "" };

  // Block email/password updates
  if (email || password) {
    validationError.error =
      "Email and password cannot be updated through profile update";
  }

  // Check for required fields
  else if (
    [age, gender, typeOfDiabetes, dietType, activityLevel].some(
      (field) => field == null
    ) ||
    takesInsulin === undefined
  ) {
    validationError.error = "Please add all required fields";
  }

  // Name validations (only if provided)
  else if (firstName?.length < 2 || firstName?.length > 50) {
    validationError.error = "First name must be between 2 and 50 characters";
  } else if (lastName?.length < 2 || lastName?.length > 50) {
    validationError.error = "Last name must be between 2 and 50 characters";
  }

  // Age validation
  else if (!Number.isInteger(age) || age < 0 || age > 120) {
    validationError.error = "Age must be a valid number between 0 and 120";
  }

  // Gender and diabetes type validation
  else if (!genderEnum.includes(gender.toLowerCase())) {
    validationError.error = "Gender must be 'male', 'female', or 'other'";
  } else if (!typeOfDiabetesEnum.includes(typeOfDiabetes.toLowerCase())) {
    validationError.error = "Invalid type of diabetes";
  }

  // takesInsulin + insulinTypes logic
  else if (typeof takesInsulin !== "boolean") {
    validationError.error = "takesInsulin must be a boolean value";
  } else if (takesInsulin === false && insulinTypes !== undefined) {
    validationError.error =
      "Insulin types should not be provided if takesInsulin is false";
  } else if (
    takesInsulin === true &&
    (!Array.isArray(insulinTypes) || insulinTypes.length === 0)
  ) {
    validationError.error =
      "Insulin types are required if takesInsulin is true";
  } else if (
    takesInsulin === true &&
    !insulinTypes.every((type) => insulinTypesEnum.includes(type))
  ) {
    validationError.error = "Insulin types must be a valid array of values";
  }

  // dietType and activityLevel validation
  else if (!dietTypeEnum.includes(dietType)) {
    validationError.error = "Diet type must be a valid value";
  } else if (!activityLevelEnum.includes(activityLevel)) {
    validationError.error = "Activity level must be a valid value";
  }

  // ✅ All good
  else {
    validationError = { isValid: true, message: "" };
  }

  return validationError;
};
