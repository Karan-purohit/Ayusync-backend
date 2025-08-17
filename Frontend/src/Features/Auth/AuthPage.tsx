import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { validateForm } from "./utils/AuthValidations";
import { authenticateUser } from "./utils/AuthenicateUser";
import { useAuth } from "../../context/AuthContext";

const AuthPage = () => {
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const AuthState = isSignIn ? "Sign In" : "Sign Up";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePageChange = () => {
    setIsSignIn((prev) => !prev);
    setUserData(initialUserData);
    setErrorMessage("");
  };

  const handleAuth = async () => {
    const newErrors = validateForm(userData, isSignIn);
    setErrorMessage(newErrors);
    if (newErrors.length > 0) return;
    setLoading(true);
    try {
      const response = await authenticateUser({
        userData,
        isSignIn,
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
      });
      setUser(response.user);
      navigate("/profile");
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    id: keyof typeof userData,
    label: string,
    type = "text",
    placeholder?: string
  ) => (
    <>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="input w-full"
        placeholder={placeholder || label}
        value={userData[id]}
        onChange={handleInputChange}
      />
    </>
  );

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-[var(--daibeties-blue)] text-white flex items-center justify-center p-8">
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            Take Control
            <br /> of Your Diabetes
          </h1>
          <p className="py-6">
            Log sugar levels, insulin, and meals daily, securely, and with ease.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-1/2 p-8">
        <h1 className="text-center text-4xl mb-6">{AuthState}</h1>
        <fieldset className="fieldset w-full max-w-sm">
          {!isSignIn && (
            <>
              {renderInput("firstName", "First Name")}
              {renderInput("lastName", "Last Name")}
            </>
          )}
          {renderInput("email", "Email", "email")}
          {renderInput("password", "Password", "password")}

          {errorMessage.length > 0 && (
            <div role="alert" className="alert alert-error alert-soft mt-5">
              <span>{errorMessage}</span>
            </div>
          )}

          <button className="btn btn-neutral my-4 w-full" onClick={handleAuth}>
            {AuthState}{" "}
            {loading && <span className="loading loading-spinner"></span>}
          </button>
          <div className="text-center">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="link link-hover text-blue-500"
              onClick={handlePageChange}
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default AuthPage;
