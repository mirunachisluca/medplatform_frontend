import React from "react";

import { DataTable } from "../Tables/DataTable";
import { patientsHeader } from "../tableHeaders";
import { axiosInstance } from "../../api/axios";
import AuthContext from "../../context/context";

function CaregiverPatients() {
  const { user } = React.useContext(AuthContext);
  const [patientData, setPatientData] = React.useState({
    isLoaded: false,
    data: null,
  });

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
