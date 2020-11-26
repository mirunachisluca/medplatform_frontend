import { Button, Dialog, DialogTitle, TextField } from "@material-ui/core";
import React from "react";
import { useSnackbar } from "notistack";
import { MedicationInputs } from "./MedicationInputs";
import { axiosInstance } from "../../../../api/axios";

function AddMedicationPlanForm({ id, open, onClose, onAdd }) {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const blankMedication = { MedicationId: "", IntakeInterval: "" };
  const [medication, setMedication] = React.useState([{ ...blankMedication }]);

  const [medicationData, setMedicationData] = React.useState({
    isLoaded: false,
    data: null,
  });

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    setMedicationData({ isLoaded: false });
    axiosInstance
      .get("/medication/drugs")
      .then((response) => {
        if (response.status === 200) {
          setMedicationData({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClose = () => {
    onClose();
  };

  const startDateHandler = (event) => {
    setStartDate(event.target.value);
  };

  const endDateHandler = (event) => {
    setEndDate(event.target.value);
  };

  const addMedication = () => {
    setMedication([...medication, { ...blankMedication }]);
  };

  const handleMedicationChange = (event) => {
    const updatedMedication = [...medication];
    updatedMedication[event.target.dataset.idx][
      event.target.dataset.objectattr
    ] = event.target.value;
    setMedication(updatedMedication);
  };

  const addMedicationPlanHandler = (e) => {
    e.preventDefault();
    medication.forEach(
      (element) => (element.MedicationId = parseInt(element.MedicationId))
    );
    const medicationPlan = {
      StartDate: startDate,
      EndDate: endDate,
      MedicationList: [...medication],
      PatientId: id,
    };
    axiosInstance
      .post("/medicationPlan/insert", medicationPlan)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar("Medication plan added successfully!", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            autoHideDuration: 2000,
          });
          onAdd();
          onClose();
        }
      })
      .catch((error) => {
        enqueueSnackbar("Something went wrong, please try again later", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 2000,
        });
      });
  };

  return (
    medicationData.isLoaded &&
    !!medicationData.data && (
      <>
        <Dialog onClose={handleClose} open={open} id="addMedicationPlanDialog">
          <DialogTitle>Add medication plan</DialogTitle>
          <form className="newMedicationPlan">
            <TextField
              className="startDateInput"
              id="startDate"
              label="Start Date"
              type="date"
              value={startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={startDateHandler}
            />
            <br />
            <br />

            <TextField
              className="endDateInput"
              id="endDate"
              label="End Date"
              type="date"
              value={endDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={endDateHandler}
            />
            <br />
            <br />

            {medication.map((val, idx) => (
              <MedicationInputs
                key={`medication-${idx}`}
                idx={idx}
                medication={medication}
                handleMedicationChange={handleMedicationChange}
                medicationData={medicationData.data}
              />
            ))}

            <div className="medicationButtonsDiv">
              <Button
                variant="outlined"
                color="primary"
                className="newButton"
                onClick={addMedication}
              >
                New
              </Button>

              <Button
                className="saveButton"
                type="submit"
                variant="contained"
                color="primary"
                onClick={addMedicationPlanHandler}
              >
                Save
              </Button>
            </div>
          </form>
        </Dialog>
      </>
    )
  );
}
export { AddMedicationPlanForm };
