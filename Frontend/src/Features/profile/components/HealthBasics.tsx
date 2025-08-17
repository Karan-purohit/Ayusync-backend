const typesOfDiabetes = [
  { name: "Type 1", value: "type1" },
  { name: "Type 2", value: "type2" },
  { name: "LADA", value: "lada" },
  { name: "Gestational Diabetes", value: "gestational" },
  { name: "Prediabetes", value: "prediabetes" },
  { name: "MODY", value: "mody" },
  { name: "Neonatal Diabetes", value: "neonatal" },
  { name: "Type 3c", value: "type3c" },
  { name: "CFRD", value: "cfrd" },
  { name: "Other", value: "other" },
];

const genderOptions = [
  { name: "Male", value: "male" },
  { name: "Female", value: "female" },
  { name: "Other", value: "other" },
];

interface HealthBasicsProps {
  formData: {
    age: number;
    gender: string;
    typeOfDiabetes: string;
  };
  handleChange: (field: string, value: any) => void;
  showHeading?: boolean;
}

export const HealthBasics = ({
  formData,
  handleChange,
  showHeading = true,
}: HealthBasicsProps) => {
  return (
    <div>
      {showHeading && <h2 className="text-3xl font-semibold">Health Basics</h2>}
      <fieldset>
        <label className={`label ${showHeading ? "" : "mt-5"}`} htmlFor="age">
          Age
        </label>
        <input
          type="number"
          className="input w-full"
          id="age"
          placeholder="Age"
          value={formData.age > 0 ? formData.age : ""}
          min="0"
          max="120"
          onChange={(e) => handleChange("age", e.target.value)}
        />
        <label className="label mt-5">Gender</label>
        <div className="w-full flex join">
          {genderOptions.map((gender) => (
            <input
              className="join-item btn flex-1 basis-1/3"
              type="radio"
              name="gender"
              value={gender.value}
              checked={formData.gender === gender.value}
              aria-label={gender.name}
              onChange={(e) => handleChange("gender", e.target.value)}
            />
          ))}
        </div>
        <label className="label mt-5">Type of Diabetes</label>
        <div className="w-full flex flex-wrap join">
          {typesOfDiabetes.map((type) => (
            <input
              className="join-item btn flex-1 basis-1/3"
              type="radio"
              name="typeOfDiabetes"
              value={type.value}
              checked={formData.typeOfDiabetes === type.value}
              aria-label={type.name}
              onChange={(e) => handleChange("typeOfDiabetes", e.target.value)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};
