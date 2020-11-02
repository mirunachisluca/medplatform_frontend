import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";

import { axiosInstance } from "../../api/axios";
import {
  HOME_PAGE_PATH,
  LOGIN_PAGE_PATH,
  PATIENTS_PAGE_PATH,
  PROFILE_PAGE_PATH,
} from "../../routes";
import { role } from "../../roles";
import "./LoginForm.css";
import AuthContext from "../../context/context";
import { Header } from "../Header/LoginHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0),
      width: theme.spacing(45),
      height: theme.spacing(30),
    },
  },
  margin: {
    margin: theme.spacing(2),
  },
  textField: {
    width: "35ch",
  },
}));

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useContext(AuthContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (user) {
      switch (user.roleId) {
        case role.DOCTOR:
          history.push(HOME_PAGE_PATH);
          break;
        case role.CAREGIVER:
          history.push(PATIENTS_PAGE_PATH);
          break;
        case role.PATIENT:
          history.push(PROFILE_PAGE_PATH);
          break;
        default:
          history.push(LOGIN_PAGE_PATH);
      }
    }
  }, [user, history]);

  const loginHandler = (event) => {
    event.preventDefault();

    axiosInstance
      .post("/user/authenticate", {
        username: username,
        password: password,
      })
      .then((response) => {
        login(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            enqueueSnackbar("Wrong username or password", {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              autoHideDuration: 2000,
            });
          }
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
  };

  const usernameInputHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
  };

  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Paper elevation={5}>
          <form>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-username">
                Username
              </InputLabel>
              <Input
                id="standard-adornment-username"
                type="text"
                value={username}
                onChange={usernameInputHandler}
              />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type="password"
                value={password}
                onChange={passwordInputHandler}
              />
            </FormControl>

            <Button
              id="submitButton"
              variant="contained"
              color="primary"
              onClick={loginHandler}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}
export { LoginForm };
