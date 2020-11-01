import React from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";

import { axiosInstance } from "../../api/axios";
import AuthContext from "../../context/context";
import { CollapsibleTable } from "../Tables/CollapsibleTable";
import { TabPanel } from "../Navigation/TabPanel";
import { DetailsCard } from "../Cards/DetailsCard";

function ProfilePage() {
  const { user } = React.useContext(AuthContext);
  const [value, setValue] = React.useState(0);
  const [patientData, setPatientData] = React.useState({
    isLoaded: false,
    data: null,
  });

  React.useEffect(() => {
    setPatientData({ isLoaded: false });
    axiosInstance
      .get("/patient/get/" + user.id)
      .then((response) => {
        if (response.status === 200) {
          setPatientData({ isLoaded: true, data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Tab label="Profile" />
          <Tab label="Medication Plans" />
        </Tabs>
      </Paper>

      {patientData.isLoaded && !!patientData.data && (
        <TabPanel value={value} index={0}>
          <DetailsCard
            name={patientData.data.name}
            birthdate={patientData.data.birthdateString}
            gender={patientData.data.gender}
            address={patientData.data.address}
          />
        </TabPanel>
      )}

      <TabPanel value={value} index={1}>
        {patientData.isLoaded && !!patientData.data && (
          <CollapsibleTable rows={patientData.data.medicationPlans} />
        )}
      </TabPanel>
    </>
  );
}

export { ProfilePage };
