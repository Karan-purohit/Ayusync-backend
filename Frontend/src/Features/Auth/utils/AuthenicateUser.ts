import type { User } from "../../../types/User";

interface userInterface {
  userData: User;
  isSignIn: boolean;
  apiBaseUrl: string;
}

export const authenticateUser = async ({
  userData,
  isSignIn,
  apiBaseUrl,
}: userInterface) => {
  const endpoint = isSignIn ? "/signin" : "/signup";
  const userPayload = isSignIn
    ? { email: userData.email, password: userData.password }
    : userData;
  const res = await fetch(`${apiBaseUrl}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userPayload),
  });

  const response = await res.json();
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};
