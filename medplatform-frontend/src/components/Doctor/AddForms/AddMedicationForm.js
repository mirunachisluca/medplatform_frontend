import React from "react";
import { Button, DialogTitle, TextField, Dialog } from "@material-ui/core";
import { useSnackbar } from "notistack";

import { axiosInstance } from "../../../api/axios";

function AddMedicationForm({ onAddMedication, open, onClose }) {
  const [name, setName] = React.useState("");
  const [sideEffects, setSideEffects] = React.useState("");
  const [dosage, setDosage] = React.useState("");
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

  const addMedicationHandler = (event) => {
    event.preventDefault();

    const medication = {
      Name: name,
      SideEffects: sideEffects,
      Dosage: dosage,
    };

    axiosInstance
      .post("/medication/insert", medication)
      .then((response) => {
        if (response.status === 200) {
          onAddMedication();
          enqueueSnackbar("Medication added successfully", {
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
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add new medication</DialogTitle>
        <form className="newMedication">
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
            id="standard-textarea"
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
            onClick={addMedicationHandler}
          >
            Save
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export { AddMedicationForm };
