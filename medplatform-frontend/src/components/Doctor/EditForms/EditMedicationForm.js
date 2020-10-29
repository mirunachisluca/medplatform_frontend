import React from "react";
import { Button, DialogTitle, TextField, Dialog } from "@material-ui/core";
import { useSnackbar } from "notistack";

import { axiosInstance } from "../../../api/axios";

function EditMedicationForm({ open, onClose, onUpdate, medication }) {
  const [name, setName] = React.useState(medication.name);
  const [sideEffects, setSideEffects] = React.useState(medication.sideEffects);
  const [dosage, setDosage] = React.useState(medication.dosage);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose();
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSideEffectsChange = (event) => {
    setSideEffects(event.target.value);
  };

  const handleDosageChange = (event) => {
    setDosage(event.target.value);
  };

  const updateMedicationHandler = (event) => {
    event.preventDefault();

    const newMedication = {
      MedicationId: medication.medicationId,
      Name: name,
      SideEffects: sideEffects,
      Dosage: dosage,
    };

    axiosInstance
      .post("/medication/update", newMedication)
      .then((response) => {
        if (response.status === 200) {
          onUpdate({
            name: newMedication.Name,
            sideEffects: newMedication.SideEffects,
            dosage: newMedication.Dosage,
          });
          enqueueSnackbar("Update was successful", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            autoHideDuration: 2000,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          enqueueSnackbar("You must complete all fields", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            autoHideDuration: 2000,
          });
        } else {
          enqueueSnackbar("Something went wrong, please try again later", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            autoHideDuration: 2000,
          });
        }
      });
    onClose();
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open} id="updateMedication">
        <DialogTitle>Update medication</DialogTitle>
        <form className="editMedication">
          <TextField
            className="formInput"
            id="name"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <br />
          <br />

          <TextField
            className="formInput"
            id="sideEffects"
            label="Side effects"
            value={sideEffects}
            multiline
            onChange={handleSideEffectsChange}
          />
          <br />
          <br />

          <TextField
            className="formInput"
            id="dosage"
            label="Dosage"
            value={dosage}
            onChange={handleDosageChange}
          />

          <br />
          <br />
          <br />

          <Button
            className="submitButtonForm"
            variant="contained"
            color="primary"
            onClick={updateMedicationHandler}
          >
            Save
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export { EditMedicationForm };
