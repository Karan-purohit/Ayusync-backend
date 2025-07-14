import validator from "validator";

export const validateuserWhileSignup = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (firstName && (firstName.length < 3 || firstName.length > 50)) {
    return {
      isValid: false,
      error: "First name must be between 3 and 50 characters",
    };
  } else if (lastName && (lastName.length < 3 || lastName.length > 50)) {
    return {
      isValid: false,
      error: "Last name must be between 3 and 50 characters",
    };
  } else if (!validator.isEmail(emailId)) {
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
