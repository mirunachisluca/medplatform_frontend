import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context/context";
import { HOME_PAGE_PATH, PATIENTS_PAGE_PATH } from "../../routes";
import { role } from "../../roles";

function ApplicationHeader() {
  const { user, logout } = React.useContext(AuthContext);
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  const menuClickHandler = () => {
    if (user.roleId === role.DOCTOR) history.push(HOME_PAGE_PATH);
    else if (user.roleId === role.CAREGIVER) history.push(PATIENTS_PAGE_PATH);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {(user.roleId === role.DOCTOR || user.roleId === role.CAREGIVER) && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <ArrowBackIosIcon onClick={menuClickHandler} />
          </IconButton>
        )}
        <Typography variant="subtitle1" className={classes.title}>
          Welcome back, {user.name}!
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            logout();
            history.push("");
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export { ApplicationHeader };
