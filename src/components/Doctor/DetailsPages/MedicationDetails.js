import React from "react";
import { Button } from "@material-ui/core";
import { MedicationCard } from "../../Cards/MedicationCard";
import { EditMedicationForm } from "../EditForms/EditMedicationForm";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { HOME_PAGE_PATH } from "../../../routes";
import { axiosInstance } from "../../../api/axios";

function MedicationDetails(props) {
  const data = props.location.state;
  const [open, setOpen] = React.useState(false);
  const [medication, setMedication] = React.useState(null);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const deleteButtonHandler = () => {
    axiosInstance
      .post("/medication/delete/" + data.medicationId)
      .then((response) => {
        if (response.status === 200) {
          history.push(HOME_PAGE_PATH);
          enqueueSnackbar("Medication deleted successfully", {
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
  };

  const editButtonHandler = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <div id="buttonsDiv">
        <Button
          id="deleteButton"
          variant="outlined"
          color="primary"
          onClick={deleteButtonHandler}
        >
          Delete
        </Button>
        <Button
          id="editButton"
          variant="outlined"
          color="primary"
          onClick={editButtonHandler}
        >
          Edit
        </Button>
        <EditMedicationForm
          open={open}
          onClose={handleClose}
          onUpdate={(newMedication) => {
            setMedication(newMedication);
          }}
          medication={data}
        />
      </div>
      <MedicationCard
        name={medication ? medication.name : data.name}
        sideEffects={medication ? medication.sideEffects : data.sideEffects}
        dosage={medication ? medication.dosage : data.dosage}
      />
    </>
  );
}
export { MedicationDetails };
