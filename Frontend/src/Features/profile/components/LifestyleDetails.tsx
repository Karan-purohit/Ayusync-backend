// Diet options
const dietTypes = [
  { name: "Vegetarian", value: "vegetarian" },
  { name: "Non-Vegetarian", value: "non-vegetarian" },
  { name: "Vegan", value: "vegan" },
  { name: "Keto", value: "keto" },
  { name: "Low-Carb", value: "low-carb" },
  { name: "Other", value: "other" },
];

// Activity levels
const activityLevels = [
  { name: "Low", value: "low" },
  { name: "Moderate", value: "moderate" },
  { name: "High", value: "high" },
];

interface LifestyleDetailsProps {
  formData: {
    dietType: string;
    activityLevel: string;
  };
  handleChange: (field: string, value: any) => void;
  showHeading?: boolean;
}

export const LifestyleDetails = ({
  formData,
  handleChange,
  showHeading = true,
}: LifestyleDetailsProps) => {
  console.log("LifestyleDetails formData:", formData);

  return (
    <div>
      {showHeading && <h2 className="text-3xl font-semibold">Lifestyle</h2>}
      <fieldset className="fieldset">
        <label className={`label ${showHeading ? "" : "mt-5"}`}>
          Diet Types
        </label>
        <div className="w-full flex flex-wrap join">
          {dietTypes.map((type) => (
            <input
              className="join-item btn flex-1 basis-1/3"
              type="radio"
              name="dietType"
              value={type.value}
              checked={formData.dietType === type.value}
              aria-label={type.name}
              onChange={(e) => handleChange("dietType", e.target.value)}
            />
          ))}
        </div>
        <label className="label mt-5">Activity Levels</label>
        <div className="w-full flex flex-wrap join">
          {activityLevels.map((type) => (
            <input
              className="join-item btn flex-1 basis-1/3"
              type="radio"
              name="activityLevel"
              value={type.value}
              checked={formData.activityLevel === type.value}
              aria-label={type.name}
              onChange={(e) => handleChange("activityLevel", e.target.value)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};
