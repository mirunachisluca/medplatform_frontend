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

import { axiosInstance } from "../../../api/axios";
import { role } from "../../../roles";

function AddCaregiverForm({ onAddCaregiver, open, onClose }) {
  const [name, setName] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [gender, setGender] = React.useState("male");
  const [address, setAddress] = React.useState("");
  const [username, setUsername] = React.useState("");
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const addCaregiverHandler = (event) => {
    event.preventDefault();

    const caregiver = {
      Name: name,
      Birthdate: birthdate,
      Gender: gender,
      Address: address,
      User: {
        Username: username,
        Password: "abcd123",
        RoleId: role.CAREGIVER,
      },
    };

    axiosInstance
      .post("/caregiver/insert", caregiver)
      .then((response) => {
        if (response.status === 200) {
          onAddCaregiver();
          enqueueSnackbar("Caregiver added successfully", {
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
        <DialogTitle>Add new caregiver</DialogTitle>
        <form className="newCaregiver">
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
            onClick={addCaregiverHandler}
          >
            Save
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export { AddCaregiverForm };
