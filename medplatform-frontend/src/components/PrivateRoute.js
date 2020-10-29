import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

import { LOGIN_PAGE_PATH } from "../routes";

function PrivateRoute({ component: Component, path, requiredRoles }) {
  const { enqueueSnackbar } = useSnackbar();
  // const history = useHistory();
  // console.log("=====>", history);
  const token = localStorage.getItem("token");
  const roleId = parseInt(jwt_decode(token).RoleId);
  const hasRequiredRole = requiredRoles.includes(roleId);
  const isLoggedIn = roleId;

  return (
    <Route
      path={path}
      render={(props) => {
        if (isLoggedIn && hasRequiredRole) {
          return <Component {...props} />;
        } else if (isLoggedIn && !hasRequiredRole) {
          // history.goBack();
          enqueueSnackbar("Oops! You are not authorized to access this page", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            autoHideDuration: 2000,
          });
        } else if (!isLoggedIn) {
          return <Redirect to={LOGIN_PAGE_PATH} />;
        }
      }}
    />
  );
}

export { PrivateRoute };
