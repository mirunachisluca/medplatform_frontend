import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./CardsStyle.css";

function DetailsCard({ name, birthdate, gender, address }) {
  return (
    <>
      <Card id="userCard">
        <CardContent>
          <Typography variant="h5" color="textSecondary" align="center">
            Details
          </Typography>
          <Typography variant="h6" color="textSecondary" align="left">
            Name
          </Typography>
          <Typography variant="subtitle1" align="center">
            {name}
          </Typography>
          <Typography variant="h6" color="textSecondary" align="left">
            Birthdate
          </Typography>
          <Typography variant="subtitle1" align="center">
            {birthdate}
          </Typography>
          <Typography variant="h6" color="textSecondary" align="left">
            Gender
          </Typography>
          <Typography variant="subtitle1" align="center">
            {gender}
          </Typography>
          <Typography variant="h6" color="textSecondary" align="left">
            Address
          </Typography>
          <Typography variant="subtitle1" align="center">
            {address}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
export { DetailsCard };
