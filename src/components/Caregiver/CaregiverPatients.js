import React from "react";

import { DataTable } from "../Tables/DataTable";
import { patientsHeader } from "../tableHeaders";
import { axiosInstance } from "../../api/axios";
import AuthContext from "../../context/context";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useSnackbar } from "notistack";

function CaregiverPatients() {
  const [connection, setConnection] = React.useState(null);
  const { user } = React.useContext(AuthContext);
  const [patientData, setPatientData] = React.useState({
    isLoaded: false,
    data: null,
  });
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://medplatformapi2.herokuapp.com/hubs/activity")
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  React.useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          connection.on("SendMessage", (response) => {
            console.log("============> MESSAGE: ", response);
            var message = response.patientName + " " + response.message;
            if (parseInt(response.caregiverId) === user.id) {
              enqueueSnackbar(message, {
                variant: "warning",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                autoHideDuration: 5000,
              });
            }
          });
        })
        .catch((e) => console.log("===========> Connection failed. ", e));
    }
  }, [connection]);

  React.useEffect(() => {
    setPatientData({ isLoaded: false });
    axiosInstance
      .get("/patient/forCaregiver/" + user.id)
      .then((response) => {
        if (response.status === 200) {
          setPatientData({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {patientData.isLoaded && !!patientData.data && (
        <DataTable columns={patientsHeader} data={patientData.data} />
      )}
    </>
  );
}

export { CaregiverPatients };
