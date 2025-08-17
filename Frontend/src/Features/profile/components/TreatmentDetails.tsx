const insulinTypes = [
  { name: "Rapid-acting", value: "rapid-acting" },
  { name: "Short-acting", value: "short-acting" },
  { name: "Intermediate-acting", value: "intermediate-acting" },
  { name: "Long-acting", value: "long-acting" },
  { name: "Ultra-long-acting", value: "ultra-long-acting" },
  { name: "Premixed", value: "premixed" },
  { name: "Other", value: "other" },
];
interface TreatmentDetailsProps {
  formData: {
    takesInsulin: boolean;
    insulinTypes: string[];
    medications: string;
  };
  handleChange: (field: string, value: any) => void;
  showHeading?: boolean;
}
export const TreatmentDetails = ({
  formData,
  handleChange,
  showHeading = true,
}: TreatmentDetailsProps) => {
  return (
    <div>
      {showHeading && (
        <h2 className="text-3xl font-semibold">Treatment Basics</h2>
      )}
      <fieldset>
        <label
          className={`label flex justify-between ${showHeading ? "" : "mt-5"}`}
        >
          Takes Insulin?
          <label className="toggle text-base-content">
            <input
              type="checkbox"
              checked={formData.takesInsulin}
              onChange={(e) => handleChange("takesInsulin", e.target.checked)}
            />
            <svg
              aria-label="disabled"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <svg
              aria-label="enabled"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="4"
                fill="none"
                stroke="currentColor"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </g>
            </svg>
          </label>
        </label>
        {formData.takesInsulin && (
          <>
            <label className="label mt-5">Insulin Types</label>
            <div className="w-full flex flex-wrap join">
              {insulinTypes.map((type) => (
                <input
                  className="join-item btn flex-1 basis-1/3"
                  type="checkbox"
                  name={type.name}
                  value={type.value}
                  checked={formData.insulinTypes.includes(type.value)}
                  aria-label={type.name}
                  onChange={(e) => handleChange("insulinTypes", e.target.value)}
                />
              ))}
            </div>
          </>
        )}

        <label className="label mt-5">Medications (If any)</label>
        <textarea
          className="textarea w-full"
          value={formData.medications}
          placeholder="Medications"
          onChange={(e) => handleChange("medications", e.target.value)}
        ></textarea>
        <div className="label">Optional</div>
      </fieldset>
    </div>
  );
};
