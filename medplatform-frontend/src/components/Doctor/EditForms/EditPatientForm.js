import React from "react";
import { Button, DialogTitle, TextField, Dialog } from "@material-ui/core";
import { useSnackbar } from "notistack";

import { axiosInstance } from "../../../api/axios";
import "./EditForm.css";

function EditPatientForm({ open, onClose, onUpdate, patient }) {
  const [name, setName] = React.useState(patient.name);
  const [address, setAddress] = React.useState(patient.address);
  const [username, setUsername] = React.useState(patient.user.username);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose();
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const updatePatientHandler = (event) => {
    event.preventDefault();

    const newPatient = {
      PatientId: patient.patientId,
      Name: name,
      Birthdate: patient.birthdate,
      Gender: patient.gender,
      Address: address,
      User: {
        UserId: patient.user.userId,
        Username: username,
        Password: patient.user.password,
        RoleId: patient.user.roleId,
      },
      DoctorId: patient.doctorId,
      CaregiverId: patient.caregiverId,
    };

    axiosInstance
      .post("/patient/update", newPatient)
      .then((response) => {
        if (response.status === 200) {
          onUpdate({
            name: newPatient.Name,
            address: newPatient.Address,
          });
          enqueueSnackbar("Update was successful", {
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
      <Dialog onClose={handleClose} open={open} id="updatePatient">
        <DialogTitle>Update patient</DialogTitle>
        <form className="editPatient">
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
            onClick={updatePatientHandler}
          >
            Save
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export { EditPatientForm };
