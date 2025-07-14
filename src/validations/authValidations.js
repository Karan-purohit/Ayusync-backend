import validator from "validator";

export const validateuserWhileSignup = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    return { isValid: false, error: "All fields are required" };
  } else if (firstName.length < 3 || firstName.length > 50) {
    return {
      isValid: false,
      error: "First name must be between 3 and 50 characters",
    };
  } else if (lastName.length < 3 || lastName.length > 50) {
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

export const validateUserWhileSignin = (req) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    return { isValid: false, error: "Email and password are required" };
  } else if (!validator.isEmail(emailId)) {
    return { isValid: false, error: "Invalid email format" };
  }

  return { isValid: true };
};
