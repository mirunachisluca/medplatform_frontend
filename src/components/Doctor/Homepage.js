import React from "react";
import { Paper, Tab, Tabs, Button } from "@material-ui/core";

import { axiosInstance } from "../../api/axios";
import { DataTable } from "../Tables/DataTable";
import { TabPanel } from "../Navigation/TabPanel";
import {
  patientsHeader,
  caregiversHeader,
  medicationsHeader,
} from "../tableHeaders";
import AuthContext from "../../context/context";
import "./Homepage.css";
import { AddPatientForm } from "./AddForms/AddPatientForm";
import { AddCaregiverForm } from "./AddForms/AddCaregiverForm";
import { AddMedicationForm } from "./AddForms/AddMedicationForm";
import "./Homepage.css";

function Homepage() {
  const { user } = React.useContext(AuthContext);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [refreshedPatients, setRefreshedPatients] = React.useState(0);
  const [refreshedCaregivers, setRefreshedCaregivers] = React.useState(0);
  const [refreshedMedications, setRefreshedMedications] = React.useState(0);

  const [patientData, setPatientData] = React.useState({
    isLoaded: false,
    data: null,
  });

  const [caregiverData, setCaregiverData] = React.useState({
    isLoaded: false,
    data: null,
  });

  const [medicationData, setMedicationData] = React.useState({
    isLoaded: false,
    data: null,
  });

  React.useEffect(() => {
    setPatientData({ isLoaded: false });
    axiosInstance
      .get("/patient/forDoctor/" + user.id)
      .then((response) => {
        if (response.status === 200) {
          setPatientData({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshedPatients]);

  React.useEffect(() => {
    setCaregiverData({ isLoaded: false });
    axiosInstance
      .get("/caregiver/caregivers")
      .then((response) => {
        if (response.status === 200) {
          setCaregiverData({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshedCaregivers]);

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
  }, [refreshedMedications]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleAddResource = (refreshed, setRefresed) => {
    setRefresed(refreshed + 1);
  };

  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="Patients" />
          <Tab label="Caregivers" />
          <Tab label="Medication" />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        {patientData.isLoaded && !!patientData.data && (
          <>
            <Button
              id="addButton"
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Add Patient
            </Button>
            {caregiverData.isLoaded && !!caregiverData.data && (
              <AddPatientForm
                onAddPatient={() => {
                  handleAddResource(refreshedPatients, setRefreshedPatients);
                }}
                open={open}
                onClose={handleClose}
                caregivers={caregiverData.data}
              />
            )}
            <DataTable columns={patientsHeader} data={patientData.data} />
          </>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {caregiverData.isLoaded && !!caregiverData.data && (
          <>
            <Button
              id="addButton"
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Add Caregiver
            </Button>

            <AddCaregiverForm
              onAddCaregiver={() => {
                handleAddResource(refreshedCaregivers, setRefreshedCaregivers);
              }}
              open={open}
              onClose={handleClose}
            />

            <DataTable columns={caregiversHeader} data={caregiverData.data} />
          </>
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {medicationData.isLoaded && !!medicationData.data && (
          <>
            <Button
              id="addButton"
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Add Medication
            </Button>

            <AddMedicationForm
              onAddMedication={() => {
                handleAddResource(
                  refreshedMedications,
                  setRefreshedMedications
                );
              }}
              open={open}
              onClose={handleClose}
            />
            <DataTable columns={medicationsHeader} data={medicationData.data} />
          </>
        )}
      </TabPanel>
    </>
  );
}

export { Homepage };
