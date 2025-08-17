import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { HealthBasics } from "./components/HealthBasics";
import { TreatmentDetails } from "./components/TreatmentDetails";
import { LifestyleDetails } from "./components/LifestyleDetails";
import { useNavigate } from "react-router-dom";

const CompleteUserProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: 0,
    gender: "",
    typeOfDiabetes: "",
    takesInsulin: false,
    insulinTypes: [] as string[],
    medications: "",
    dietType: "",
    activityLevel: "",
  });
  const {
    age,
    gender,
    typeOfDiabetes,
    takesInsulin,
    insulinTypes,
    medications,
    dietType,
    activityLevel,
  } = formData;
  const steps = ["Health Basics", "Treatment Details", "Lifestyle"];

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      switch (field) {
        case "insulinTypes": {
          const insulinTypes = prev.insulinTypes.includes(value)
            ? prev.insulinTypes.filter((type) => type !== value)
            : [...prev.insulinTypes, value];
          return { ...prev, insulinTypes };
        }

        case "age": {
          const ageValue = Number(value);
          if (Number.isNaN(ageValue) || ageValue < 0) {
            return { ...prev, age: 0 };
          }
          return { ...prev, age: Math.min(ageValue, 120) };
        }

        default:
          return { ...prev, [field]: value };
      }
    });
  };

  // Step validation logic
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(age && gender && typeOfDiabetes);
      case 1:
        return takesInsulin ? insulinTypes.length > 0 : true;
      case 2:
        return !!(dietType && activityLevel);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      setShowError(true);
      return;
    }

    setShowError(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const response = await res.json();

      if (response.error) {
        throw new Error(response.error);
      }
      setUser(response);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-10">
      <div className="flex justify-center text-center">
        <div>
          <h1 className="mb-5 text-5xl font-bold">Hey, {user?.firstName}</h1>
          <p className="mb-5">
            Let’s set up your profile so I can give you the most accurate health
            insights.
          </p>

          <ul className="steps mb-5">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`step ${index <= currentStep ? "step-primary" : ""}`}
              >
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-left">
        {currentStep === 0 && (
          <HealthBasics
            formData={{ age, gender, typeOfDiabetes }}
            handleChange={handleChange}
          />
        )}
        {currentStep === 1 && (
          <TreatmentDetails
            formData={{ takesInsulin, insulinTypes, medications }}
            handleChange={handleChange}
          />
        )}
        {currentStep === 2 && (
          <LifestyleDetails
            formData={{ dietType, activityLevel }}
            handleChange={handleChange}
          />
        )}
        {showError && (
          <div role="alert" className="alert alert-error alert-soft mt-5">
            <span>
              {errorMessage.length > 0
                ? errorMessage
                : "Please fill in all the required fields before continuing."}
            </span>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <button
            className="btn"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleSubmit}>
              Complete Profile{" "}
              {loading && <span className="loading loading-spinner"></span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteUserProfile;
