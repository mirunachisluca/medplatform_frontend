import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./CardsStyle.css";

function MedicationCard({ name, sideEffects, dosage }) {
  return (
    <>
      <Card id="medicationCard">
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
            Side effects
          </Typography>
          <Typography variant="subtitle1" align="center">
            {sideEffects}
          </Typography>
          <Typography variant="h6" color="textSecondary" align="left">
            Dosage
          </Typography>
          <Typography variant="subtitle1" align="center">
            {dosage}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
export { MedicationCard };
