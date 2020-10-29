import { Dialog, DialogTitle, TextField } from "@material-ui/core";
import React from "react";

function AddMedicationPlanForm({ open, onClose }) {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handleClose = () => {
    onClose();
  };

  const startDateHandler = (event) => {
    setStartDate(event.target.value);
  };

  const endDateHandler = (event) => {
    setEndDate(event.taregt.value);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add medication plan</DialogTitle>
        <form className="newPatient">
          <TextField
            className="formInput"
            id="name"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
        </form>
      </Dialog>
    </>
  );
}
export { AddMedicationPlanForm };
