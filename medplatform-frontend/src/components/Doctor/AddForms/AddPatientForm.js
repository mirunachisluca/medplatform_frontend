import React from "react";
import {
  Button,
  DialogTitle,
  TextField,
  MenuItem,
  Dialog,
  Select,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

import "./AddForms.css";
import { axiosInstance } from "../../../api/axios";
import AuthContext from "../../../context/context";
import { role } from "../../../roles";

function AddPatientForm({ onAddPatient, open, onClose, caregivers }) {
  const [name, setName] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [gender, setGender] = React.useState("male");
  const [address, setAddress] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [caregiverId, setCaregiverId] = React.useState(0);
  const { user } = React.useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose();
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCaregiverChange = (event) => {
    setCaregiverId(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const addPatientHandler = (event) => {
    event.preventDefault();

    const patient = {
      Name: name,
      Birthdate: birthdate,
      Gender: gender,
      Address: address,
      User: {
        Username: username,
        Password: "abcd123",
        RoleId: role.PATIENT,
      },
      DoctorId: user.id,
      CaregiverId: caregiverId,
    };

    axiosInstance
      .post("/patient/insert", patient)
      .then((response) => {
        if (response.status === 200) {
          onAddPatient();
          enqueueSnackbar("Patient added successfully", {
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
    onClose();
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add new patient</DialogTitle>
        <form className="newPatient">
          <TextField
            className="formInput"
            id="name"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <br />
          <br />

          <TextField
            className="formInput"
            id="date"
            label="Birthdate"
            type="date"
            defaultValue="2017-05-24"
            value={birthdate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleBirthdateChange}
          />
          <br />
          <br />

          <Select
            className="formInput"
            id="gender"
            value={gender}
            onChange={handleGenderChange}
            label="Gender"
          >
            <MenuItem value="male">male</MenuItem>
            <MenuItem value="female">female</MenuItem>
          </Select>
          <br />
          <br />

          <Select
            className="formInput"
            id="caregiver"
            value={caregiverId}
            onChange={handleCaregiverChange}
          >
            {caregivers.map((item) => (
              <MenuItem key={item.caregiverId} value={item.caregiverId}>
                {item.name}
              </MenuItem>
            ))}
          </Select>

          <br />
          <br />

          <TextField
            className="formInput"
            id="address"
            label="Address"
            value={address}
            onChange={handleAddressChange}
          />
          <br />
          <br />

          <TextField
            className="formInput"
            id="username"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />

          <br />
          <br />
          <br />

          <Button
            className="submitButtonForm"
            variant="contained"
            color="primary"
            onClick={addPatientHandler}
          >
            Save
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export { AddPatientForm };
