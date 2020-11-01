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
import { AddMedicationPlanForm } from "../AddForms/AddMedicationPlanForm/AddMedicationPlanForm";

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
  const [medicationOpen, setMedicationOpen] = React.useState(false);
  const [patient, setPatient] = React.useState(null);
  const [medicationPlans, setMedicationPlans] = React.useState({
    isLoaded: false,
    data: null,
  });

  const [newPlan, setNewPlan] = React.useState(0);

  const data = props.location.state;
  const { user } = React.useContext(AuthContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    setMedicationPlans({ isLoaded: false });
    axiosInstance
      .get("medicationPlan/getForPatient/" + data.patientId)
      .then((response) => {
        if (response.status === 200) {
          setMedicationPlans({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newPlan]);

  const deleteButtonHandler = () => {
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
  };

  const editButtonHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addMedicationPlanHandler = () => {
    setMedicationOpen(true);
  };

  const handleMedicationClose = () => {
    setMedicationOpen(false);
  };

  const handleNewPlan = () => {
    setNewPlan(newPlan + 1);
  };

  return (
    <>
      {user.roleId === role.DOCTOR && (
        <div id="buttonsDiv">
          <Button
            id="addMedicationButton"
            variant="outlined"
            color="primary"
            onClick={addMedicationPlanHandler}
          >
            Add medication plan
          </Button>

          <AddMedicationPlanForm
            id={data.patientId}
            open={medicationOpen}
            onClose={handleMedicationClose}
            onAdd={handleNewPlan}
          />

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
      <div id="plansDiv">
        <Typography
          variant="h5"
          color="textSecondary"
          align="center"
          id="plansTypography"
        >
          Medication Plans
        </Typography>
        {medicationPlans.isLoaded && !!medicationPlans.data && (
          <CollapsibleTable rows={medicationPlans.data} />
        )}
      </div>
    </>
  );
}

export { PatientDetails };
