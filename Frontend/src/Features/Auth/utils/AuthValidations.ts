import type { User } from "../../../types/User";

export const validateForm = (userData: User, isSignIn: boolean): string => {
  if (!isSignIn) {
    if (!userData.firstName.trim()) return "First name is required";
    if (!userData.lastName.trim()) return "Last name is required";
  }

  if (!userData.email.trim()) {
    return "Email is required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    return "Invalid email address";
  }

  if (!userData.password.trim()) {
    return "Password is required";
  }

  if (userData.password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};
