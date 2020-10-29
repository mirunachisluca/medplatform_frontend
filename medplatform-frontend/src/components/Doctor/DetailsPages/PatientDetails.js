import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import React from "react";

import AuthContext from "../../../context/context";
import { CollapsibleTable } from "../../Tables/CollapsibleTable";
import { role } from "../../../roles";
import { axiosInstance } from "../../../api/axios";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { DetailsCard } from "../../Cards/DetailsCard";
import { HOME_PAGE_PATH } from "../../../routes";
import { EditPatientForm } from "../EditForms/EditPatientForm";
import "./Details.css";

function MedicalRecordCard({ record }) {
  return (
    <>
      <Card id="medicalRecordCard">
        <CardContent>
          <Typography variant="h5" color="textSecondary" align="center">
            Medical Record
          </Typography>

          <List>
            {record.map((item) => (
              <ListItem>{item.description}</ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
}

function PatientDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [patient, setPatient] = React.useState(null);
  const data = props.location.state;
  const { user } = React.useContext(AuthContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  function deleteButtonHandler() {
    axiosInstance
      .post("/patient/delete/" + data.patientId)
      .then((response) => {
        if (response.status === 200) {
          history.push(HOME_PAGE_PATH);
          enqueueSnackbar("Patient deleted successfully", {
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
      {user.roleId === role.DOCTOR && (
        <div id="buttonsDiv">
          <Button id="addMedicationButton" variant="outlined" color="primary">
            Add medication plan
          </Button>
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
          <EditPatientForm
            open={open}
            onClose={handleClose}
            patient={data}
            onUpdate={(updatedPatient) => {
              setPatient(updatedPatient);
            }}
          />
        </div>
      )}
      <div id="cardsDiv">
        <DetailsCard
          name={patient ? patient.name : data.name}
          birthdate={data.birthdateString}
          gender={data.gender}
          address={patient ? patient.address : data.address}
        />

        <MedicalRecordCard record={data.medicalRecordList} />
      </div>
      <div>
        {/* <Typography variant="h5" color="textSecondary" align="left">
          Medication Plans
        </Typography> */}
        <CollapsibleTable rows={data.medicationPlans} />
      </div>
    </>
  );
}

export { PatientDetails };
