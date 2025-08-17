import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { HealthBasics } from "../../profile/components/HealthBasics";
import { TreatmentDetails } from "../../profile/components/TreatmentDetails";
import { LifestyleDetails } from "../../profile/components/LifestyleDetails";

const UpdateProfile = () => {
  const { user } = useAuth();
  console.log("UpdateProfile user:", user);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || 0,
    gender: user?.gender || "",
    typeOfDiabetes: user?.typeOfDiabetes || "",
    takesInsulin: user?.takesInsulin || false,
    insulinTypes: user?.insulinTypes || ([] as string[]),
    medications: user?.medications || "",
    dietType: user?.dietType || "",
    activityLevel: user?.activityLevel || "",
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
  return (
    <div className="w-full max-w-2xl mx-auto my-10">
      <div className="text-left">
        <h1 className="text-4xl font-bold text-center">Update Profile</h1>
        <>
          <label className="label" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            className="input w-full"
            id="firstName"
            placeholder="First Name"
            value={formData.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />

          <label className="label mt-5" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            className="input w-full"
            id="Last Name"
            placeholder="lastName"
            value={formData.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </>
        <HealthBasics
          formData={{ age, gender, typeOfDiabetes }}
          handleChange={handleChange}
          showHeading={false}
        />
        <TreatmentDetails
          formData={{ takesInsulin, insulinTypes, medications }}
          handleChange={handleChange}
          showHeading={false}
        />
        <LifestyleDetails
          formData={{ dietType, activityLevel }}
          handleChange={handleChange}
          showHeading={false}
        />

        <button className="btn btn-success mt-5 mb-20 w-full">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
