import React from "react";
import { Button, DialogTitle, TextField, Dialog } from "@material-ui/core";
import { useSnackbar } from "notistack";

import { axiosInstance } from "../../../api/axios";

function EditCaregiverForm({ open, onClose, onUpdate, caregiver }) {
  const [name, setName] = React.useState(caregiver.name);
  const [address, setAddress] = React.useState(caregiver.address);
  const [username, setUsername] = React.useState(caregiver.user.username);
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

  const updateCaregiverHandler = (event) => {
    event.preventDefault();

    const newCaregiver = {
      CaregiverId: caregiver.caregiverId,
      Name: name,
      Birthdate: caregiver.birthdate,
      Gender: caregiver.gender,
      Address: address,
      User: {
        UserId: caregiver.user.userId,
        Username: username,
        Password: caregiver.user.password,
        RoleId: caregiver.user.roleId,
      },
    };

    axiosInstance
      .post("/caregiver/update", newCaregiver)
      .then((response) => {
        if (response.status === 200) {
          onUpdate({
            name: newCaregiver.Name,
            address: newCaregiver.Address,
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
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="updateCaregiver">Update caregiver</DialogTitle>
        <form className="editCaregiver">
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
            onClick={updateCaregiverHandler}
          >
            Save
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export { EditCaregiverForm };
