import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { DataTable } from "../../Tables/DataTable";
import { DetailsCard } from "../../Cards/DetailsCard";
import { patientsHeader } from "../../tableHeaders";
import { axiosInstance } from "../../../api/axios";
import { HOME_PAGE_PATH } from "../../../routes";
import { EditCaregiverForm } from "../EditForms/EditCaregiverForm";

function CaregiverDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [caregiver, setCaregiver] = React.useState(null);
  const data = props.location.state;
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  function deleteButtonHandler() {
    axiosInstance
      .post("/caregiver/delete/" + data.caregiverId)
      .then((response) => {
        if (response.status === 200) {
          history.push(HOME_PAGE_PATH);
          enqueueSnackbar("Caregiver deleted successfully", {
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
        enqueueSnackbar("Something went wrong", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 2000,
        });
      });
  }

  function editButtonHandler() {
    setOpen(true);
  }

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
        <EditCaregiverForm
          open={open}
          onClose={handleClose}
          onUpdate={(newCaregiver) => {
            setCaregiver(newCaregiver);
          }}
          caregiver={data}
        />
      </div>
      <DetailsCard
        name={caregiver ? caregiver.name : data.name}
        birthdate={data.birthdateString}
        gender={data.gender}
        address={caregiver ? caregiver.name : data.address}
      />

      <Typography
        variant="h5"
        color="textSecondary"
        align="center"
        id="patientsTypography"
      >
        Patients
      </Typography>
      <DataTable columns={patientsHeader} data={data.patientsList} />
    </>
  );
}
export { CaregiverDetails };
