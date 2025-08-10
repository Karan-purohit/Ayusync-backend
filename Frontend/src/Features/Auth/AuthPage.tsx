import { useState } from "react";

const AuthPage = () => {
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [isSignIn, setIsSignIn] = useState(true);
  const [userData, setUserData] = useState(initialUserData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const AuthState = isSignIn ? "Sign In" : "Sign Up";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePageChange = () => {
    setIsSignIn((prev) => !prev);
    setUserData(initialUserData);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isSignIn) {
      if (!userData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!userData.lastName.trim())
        newErrors.lastName = "Last name is required";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    if (isSignIn) {
      try {
        const user = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/signin`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userData.email,
              password: userData.password,
            }),
          }
        );
        const response = await user.json();
        if (response.error) {
          throw new Error(response.error);
        }
      } catch (err) {
        if (err instanceof Error) {
          setErrors({ password: err.message });
        }
      }
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
        className={`input w-full ${errors[id] ? "input-error" : ""}`}
        placeholder={placeholder || label}
        value={userData[id]}
        onChange={handleInputChange}
      />
      {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
    </>
  );

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
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

      {/* Right Panel */}
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
          <button className="btn btn-neutral my-4 w-full" onClick={handleAuth}>
            {AuthState}
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
