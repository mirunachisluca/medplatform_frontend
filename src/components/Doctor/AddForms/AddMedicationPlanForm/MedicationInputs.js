import { InputLabel, NativeSelect, TextField } from "@material-ui/core";
import React from "react";

function MedicationInputs({
  idx,
  medication,
  handleMedicationChange,
  medicationData,
}) {
  const medicationId = `medication-${idx}`;
  const intakeId = `intake-${idx}`;

  return (
    <div key={`medication-${idx}`}>
      <InputLabel htmlFor={medicationId}>Medication {idx + 1}</InputLabel>
      <NativeSelect
        inputProps={{ "data-objectattr": "MedicationId", "data-idx": idx }}
        id={medicationId}
        onChange={handleMedicationChange}
        value={medication[idx].MedicationId}
        name={medicationId}
        className="selectInput"
      >
        {medicationData.map((item) => (
          <option
            key={item.medicationId}
            value={item.medicationId}
            className="medicationOption"
          >
            {item.name}
          </option>
        ))}
      </NativeSelect>
      <br />

      <TextField
        type="text"
        onChange={handleMedicationChange}
        value={medication[idx].IntakeInterval}
        name={intakeId}
        label="Intake Interval"
        className="formInput"
        inputProps={{ "data-objectattr": "IntakeInterval", "data-idx": idx }}
      />
      <br />
      <br />
    </div>
  );
}

export { MedicationInputs };
