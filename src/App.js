import React from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import AuthContext from "./context/context";
import {
  LOGIN_PAGE_PATH,
  HOME_PAGE_PATH,
  PATIENTS_PAGE_PATH,
  PROFILE_PAGE_PATH,
  PATIENT_DETAILS_PAGE_PATH,
  CAREGIVER_DETAILS_PAGE_PATH,
  MEDICATION_DETAILS_PAGE_PATH,
} from "./routes";
import { PrivateRoute } from "./components/PrivateRoute";
import { role } from "./roles";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Homepage } from "./components/Doctor/Homepage";
import { CaregiverPatients } from "./components/Caregiver/CaregiverPatients";
import { ProfilePage } from "./components/Patient/ProfilePage";
import { axiosInstance } from "./api/axios";
import { ApplicationHeader } from "./components/Header/ApplicationHeader";
import { PatientDetails } from "./components/Doctor/DetailsPages/PatientDetails";
import { CaregiverDetails } from "./components/Doctor/DetailsPages/CaregiverDetails";
import { MedicationDetails } from "./components/Doctor/DetailsPages/MedicationDetails";

function App() {
  const [user, setUser] = React.useState(null);

  const login = React.useCallback((token) => {
    const decodedToken = jwt_decode(token);
    const currentUser = {
      userId: parseInt(decodedToken.UserId),
      roleId: parseInt(decodedToken.RoleId),
      id: parseInt(decodedToken.Id),
      name: decodedToken.Username,
    };

    localStorage.setItem("token", token);
    axiosInstance.defaults.headers["Authorization"] = "Bearer " + token;

    setUser(currentUser);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, [login]);

  const logout = () => {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers["Authorization"];

    setUser(null);
  };

  return (
    <SnackbarProvider>
      <Router>
        <AuthContext.Provider
          value={{
            user: user,
            login: login,
            logout: logout,
          }}
        >
          <div className="App">
            <div className="container d-flex align-items-center flex-column">
              {user && <ApplicationHeader />}
              <Switch>
                <Route path={LOGIN_PAGE_PATH} exact={true}>
                  <LoginForm />
                </Route>
                {user && (
                  <>
                    <PrivateRoute
                      path={HOME_PAGE_PATH}
                      component={Homepage}
                      requiredRoles={[role.DOCTOR]}
                    />
                    <PrivateRoute
                      path={PATIENTS_PAGE_PATH}
                      component={CaregiverPatients}
                      requiredRoles={[role.CAREGIVER]}
                    />
                    <PrivateRoute
                      path={PROFILE_PAGE_PATH}
                      component={ProfilePage}
                      requiredRoles={[role.PATIENT]}
                    />
                    <PrivateRoute
                      path={PATIENT_DETAILS_PAGE_PATH}
                      component={PatientDetails}
                      requiredRoles={[role.DOCTOR, role.CAREGIVER]}
                    />
                    <PrivateRoute
                      path={CAREGIVER_DETAILS_PAGE_PATH}
                      component={CaregiverDetails}
                      requiredRoles={[role.DOCTOR]}
                    />
                    <PrivateRoute
                      path={MEDICATION_DETAILS_PAGE_PATH}
                      component={MedicationDetails}
                      requiredRoles={[role.DOCTOR]}
                    />
                  </>
                )}
              </Switch>
            </div>
          </div>
        </AuthContext.Provider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
