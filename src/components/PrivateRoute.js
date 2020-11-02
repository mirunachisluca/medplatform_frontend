import React from "react";
import { Route } from "react-router-dom";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

function PrivateRoute({ component: Component, path, requiredRoles }) {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const roleId = parseInt(jwt_decode(token).RoleId);
  const hasRequiredRole = requiredRoles.includes(roleId);

  return (
    <Route
      path={path}
      render={(props) => {
        if (hasRequiredRole) {
          return <Component {...props} />;
        } else if (!hasRequiredRole) {
          enqueueSnackbar("Oops! You are not authorized to access this page", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            autoHideDuration: 2000,
          });
          setTimeout(() => {
            history.goBack();
          }, 2000);
        }
      }}
    />
  );
}

export { PrivateRoute };
